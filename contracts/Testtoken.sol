// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Testtoken is ERC20, Ownable {
    constructor(address owner_, uint256 initialSupply_) ERC20("Testtoken", "TET") {
        _mint(owner_, initialSupply_);
    }
}     
