// SPDX-License-Identifier: MIT
pragma solidity 0.7.4;

import "./ECDSA.sol";

contract ValidationTest {
    address accountManager;
	constructor(address _accountManager) public {
        accountManager = _accountManager;
	}

    function hashForSignature(address _owner, uint256 _earningsToDate, uint256 _nonce) public pure returns (bytes32) {
        return keccak256(abi.encode(_owner, _earningsToDate, _nonce));
    }

	function validateSig(address _to, uint _earningsToDate, uint256 _nonce, bytes memory _signature) public {
        address signer = ECDSA.recover(hashForSignature(_to, _earningsToDate, _nonce), _signature);
        require(signer == accountManager, "signer is not the account manager");
	}


}
