// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Testtoken2.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract ICO2 {
    using Address for address payable;

    Testtoken2 private _testtoken2;
    string private _name;
    uint256 private _timeInit;

    event Owned(address buyer, uint256 amount);
    event Withdraw(address owner, uint256 amount);
    event Refunded(address buyer, uint256 amount);

    constructor(address testtoken2Address_, string memory name_) {
        _testtoken2 = Testtoken2(testtoken2Address_);
        _name = name_;
        _timeInit = block.timestamp;
    }


    receive() external payable {
        _buyTokens();
    }

    function buyTokens() external payable {
        _buyTokens();
    }
    ///@notice optionn necessary to give access at the tokens
    
    function _buyTokens() private {
        require(_testtoken2.allowance(_testtoken2.owner(), address(this)) > 0, "IC02: no more token to buy");
        require(block.timestamp < (_timeInit + 15 days), "ICO2: sorry this Ico is now closed");
        uint256 tokenValue = msg.value * (10**9);
        
        if (tokenValue > _testtoken2.allowance(_testtoken2.owner(), address(this))) {
            uint256 rest = tokenValue - _testtoken2.allowance(_testtoken2.owner(), address(this));
            tokenValue = tokenValue - rest;
            payable(msg.sender).sendValue(rest / (10**9));

            emit Refunded(msg.sender, rest / (10**9));
        }
        _testtoken2.transferFrom(_testtoken2.owner(), msg.sender, tokenValue);
        emit Owned(msg.sender, tokenValue);
    }
    ///@notice get the name of the Token

    function name() public view returns (string memory) {
        return _testtoken2.name();
    }
    ///@notice owner can withdraw at the end of the timestamp

    function withdraw() external payable {
        require(msg.sender == _testtoken2.owner(), "ICO2: only owner can withdraw");
        require(block.timestamp >= (_timeInit + 15 days), "ICO2: sorry you need wait");
        uint256 balance = address(this).balance;
        payable(_testtoken2.owner()).sendValue(address(this).balance);
        emit Withdraw(_testtoken2.owner(), balance);
    }
}
