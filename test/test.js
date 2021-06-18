const ValidationTest = artifacts.require("ValidationTest");
const ethers = require("ethers")
const web3EthAbi = require("web3-eth-abi")

const web3 = require("web3-eth-personal")
const url = "http://localhost:8545"
const provider = new ethers.providers.JsonRpcProvider(url)
const privKey = "0x01ebdc3f0abb32b6d7b7cb4720699961eb899d05c7081a22b0b05f1cbad7f965"
const signer = new ethers.Wallet(privKey, provider)

contract('test', (accounts) => {
  it('validate a signature', async () => {
    const ValidationTestDeployed = await ValidationTest.deployed();
    const ownerAddress = "0x3a0c5f83d9418199d7a85e02712ddada239be244"
    const earningsToDate = "500"
    const nonce = "100"



    /** CHANGE STUFF HERE **/
    const encoded =  ethers.utils.defaultAbiCoder.encode(
      ["address", "uint256", "uint256"],
      [ownerAddress, earningsToDate, nonce]
    )
    const hash_old = ethers.utils.keccak256(encoded)

    const hash = await ValidationTestDeployed.hashForSignature(ownerAddress, earningsToDate, nonce)
    console.log(hash,"\n",hash_old )

    let messageHashBytes = ethers.utils.arrayify(hash)
    // const signature = await signer.signingKey.signDigest(hash)
    const signature = await signer.signMessage(messageHashBytes)
    // console.log(web3)
    // const signature = web3.sign(hash, accounts[0], console.log)


    console.log(signer.address)
    console.log(await ValidationTestDeployed.getManager())


    await ValidationTestDeployed.validateSig(ownerAddress, earningsToDate,nonce, signature);
    // await ValidationTestDeployed.validateSig2(ownerAddress, earningsToDate,nonce, signature);

  });
});
