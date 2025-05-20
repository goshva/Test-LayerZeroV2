// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MockLzEndpoint {
    function send(uint16, bytes calldata, address payable, address, bytes calldata, uint) external payable {}
}