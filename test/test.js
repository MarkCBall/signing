const ValidationTest = artifacts.require("ValidationTest");

const web3EthAbi = require("web3-eth-abi")

contract('test', (accounts) => {
  it('validate a signature', async () => {

    const receiver = "0xbdFecFbEAfAdE132a25a6F9296Fd0f995F131f46"
    const amount = "500"
    const nonce = "100"



    /** CHANGE STUFF HERE **/
    const sig = await web3.eth.sign( web3EthAbi.encodeParameters(
      ["address", "uint256","uint256"],
      [receiver, amount, nonce]
    ), accounts[0])




    const ValidationTestDeployed = await ValidationTest.deployed();
    await ValidationTestDeployed.validateSig.call(accounts[0], amount,nonce, sig);

  });
});
