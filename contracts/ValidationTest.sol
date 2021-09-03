// SPDX-License-Identifier: MIT
pragma solidity 0.6.9;

import "./ECDSA.sol";

contract ValidationTest {


    //no bueno - will cost about 5000+ gas or $5 to send as a string and unwrap like this
//    //https://github.com/provable-things/ethereum-api/blob/master/oraclizeAPI_0.4.sol#L879
//    function parseInt(string memory _a, uint _b) internal returns (uint) {
//        bytes memory bresult = bytes(_a);
//        uint mint = 0;
//        bool decimals = false;
//        for (uint i=0; i<bresult.length; i++){
//            if ((uint8(bresult[i]) >= 48)&&(uint8(bresult[i]) <= 57)){
//                if (decimals){
//                    if (_b == 0) break;
//                    else _b--;
//                }
//                mint *= 10;
//                mint += uint8(bresult[i]) - 48;
//            } else if (uint8(bresult[i]) == 46) decimals = true;
//        }
//        if (_b > 0) mint *= 10**_b;
//        return mint;
//    }

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
