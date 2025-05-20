// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@layerzerolabs/lz-evm-oapp-v2/contracts/oft/OFT.sol";

contract SimpleOFT is OFT {
    address public lzEndpoint;
    event Bridged(address indexed user, uint256 amount, uint16 dstChainId);

    constructor(
        string memory _name,
        string memory _symbol,
        address _lzEndpoint
    ) OFT(_name, _symbol, _lzEndpoint) {
        lzEndpoint = _lzEndpoint;
    }

    function setLzEndpoint(address _lzEndpoint) external onlyOwner {
        require(_lzEndpoint != address(0), "Invalid endpoint");
        lzEndpoint = _lzEndpoint;
    }

    function mint(address _to, uint256 _amount) external onlyOwner {
        require(_to != address(0), "Invalid address");
        require(_amount > 0, "Invalid amount");
        _mint(_to, _amount);
    }

    function send(
        uint256 _amount,
        uint16 _dstChainId,
        bytes32 _receiver
    ) public payable {
        require(_amount > 0, "Invalid amount");
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");

        bytes memory payload = abi.encode(_receiver);
        bytes memory lzOptions = bytes("");

        _burn(msg.sender, _amount);
        _lzSend(
            _dstChainId,
            payload,
            payable(msg.sender),
            address(0),
            lzOptions,
            msg.value
        );

        emit Bridged(msg.sender, _amount, _dstChainId);
    }

    function _lzReceive(
        uint16 _srcChainId,
        bytes memory /* _srcAddress */,
        uint64 /* _nonce */,
        bytes memory _payload
    ) internal override {
        (bytes32 receiver) = abi.decode(_payload, (bytes32));
        address receiverAddr = address(uint160(uint256(receiver)));
        _mint(receiverAddr, _amountFromPayload(_payload));
    }

    function _amountFromPayload(bytes memory _payload) internal pure returns (uint256) {
        // Adjust based on actual payload structure if needed
        return uint256(bytes32(_payload[32:64]));
    }
}