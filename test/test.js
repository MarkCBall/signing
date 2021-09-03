const ValidationTest = artifacts.require("ValidationTest");
const ethers = require("ethers")

const url = "http://localhost:8545"
const provider = new ethers.providers.JsonRpcProvider(url)
const privKey = "0x943ec4900ce279913b30094fd24192bbc7420ad13d66c439ea07f5ae39b36e2f"
const signer = new ethers.Wallet(privKey, provider)
const domain = {
  name:"Velox",
}
const types = {Strategy:[
    {name:"a", type:"uint"}
  ]}
  const a = 1
const strategy = {a}



contract('test', (accounts) => {
  it('validate a signature', async () => {
    const signature = await signer._signTypedData(
      domain,
      types,
      strategy
    )
    console.log("sig",signature)
    const actualSigner = ethers.utils.verifyTypedData(domain,types,strategy, signature)
    console.log("signer", actualSigner)
    const ValidationTestDeployed = await ValidationTest.deployed();
    const res = await ValidationTestDeployed.validateSig.call(signature,a);
    console.log("res",res)
  });
});
