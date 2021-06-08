// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Testtoken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Ico is Ownable {

    Testtoken private _testtoken;
    
    mapping(address => uint256) private _beneficiaries;   

    uint256 private _icoStartTime;
    uint256 private _icoEndTime; 
    uint256 private _rate;
    
    constructor(
        address testtokenAddress_,
        uint256 icoStartTime_, 
        uint256 icoEndTime_,
        uint256 rate_) Ownable()  {
             _icoStartTime = icoStartTime_;
             _icoEndTime = icoEndTime_;
             _rate = rate_;
            _testtoken = Testtoken(testtokenAddress_);
    }

    modifier icoIsEngage {
        require(
            block.timestamp >= _icoStartTime,
            "Ico : the Ico is not started yet."
            );
        require(
            block.timestamp <= _icoEndTime,
            "Ico : the Ico is over now"
            );
        _;
    }

    modifier icoIsOver {
        require(_icoStartTime <= block.timestamp, "The Ico is not over yet");
        _;
    }
    
    function buyTokens() public payable icoIsEngage {
        require(msg.sender != owner(),"Ico : The owner of Ico can't buy tokens!");
        require(msg.sender != _testtoken.owner(), "Ico : the owner of the token can't buy tokens!");
        uint256 amount = msg.value * _rate; 

        _testtoken.transferFrom(_testtoken.owner(), msg.sender, amount); 
        
   } 

}