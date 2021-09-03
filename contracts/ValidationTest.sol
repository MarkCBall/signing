// SPDX-License-Identifier: MIT
pragma solidity 0.6.9;

import "./ECDSA.sol";

contract ValidationTest {

	function validateSig(
        bytes memory signature,
        uint chainId,
        string memory exchange,
        string memory identifier,
        address userAddress,
        address tokenInAddress,
        address tokenOutAddress
    ) public returns (address){
        bytes32 eip712DomainHash = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name)"
                ),
                keccak256(bytes("Velox"))
            )
        );
        bytes32 hashStruct = keccak256(
            abi.encode(
                keccak256("Strategy(uint chainId,string exchange,string identifier,address userAddress,address tokenInAddress,address tokenOutAddress)"),
                chainId,
                keccak256(bytes(exchange)),
                keccak256(bytes(identifier)),
                userAddress,
                tokenInAddress,
                tokenOutAddress
            )
        );
        bytes32 hash = keccak256(abi.encodePacked("\x19\x01", eip712DomainHash, hashStruct));
        address signer = ECDSA.recover(hash, signature);
        return signer;

        return address(this);
	}

}
