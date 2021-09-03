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
    {name:"chainId", type:"uint"},
    {name:"exchange", type:"string"},
    {name:"identifier", type:"string"},
    {name:"userAddress", type:"address"},
    {name:"tokenInAddress", type:"address"},
    {name:"tokenOutAddress", type:"address"},
    // {name:"signedMessage", type:"uint"},//todo pull from strategy not like in script
    // {name:"tokenInAmount", type:"uint"},
  ]}
const strategy = {
  //to validate on chain
  "chainId": 43114,
  "exchange": "Pangolin",
  "identifier": "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4f",//set it into storage as complete
  "userAddress": "0xb8da5626d6725058b269fc96d3c4238c7f53d606",
  "tokenInAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
  "tokenOutAddress": "0x60781C2586D68229fde47564546784ab3fACA982",
  // "signedMessage": "0x71756b67b509b3a544dab3fc73f9d9e78788eb0ab35183dabd02f27f8ae9daf62adb886f7b9660fa23ad42cb2039c1b92d3c72a2a39e4e40ddace0d1d3c999131b",
  // "tokenInAmount": "0.100000000000000000000000",


  //maybe validate on chain?
  // "isUsdPriceRelatedToTokenIn": false,
  // "takeFeeFromInput": true,
  // "tokenOutMinAmount": null,//un-used
  // "maxGasPriceInGwei": 225,
  //not needed stuff below
  // "blockchain": "Avalanche",
  // "createdByPartnerId": null,
  // "created_at": "2021-08-04T15:25:56.83874+00:00",
  // "id": 4919,
  // "maxAttempts": 2,
  // "maxDate": null,
  // "tokenPairAddress": "0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367",//no to be more flexible
  // "maxTokenOutPerTokenIn": null,
  // "maxUsdPrice": "1.000000000000000000000000",
  // "message": "tokenPairAddress=0xd7538cABBf8605BdE1f4901B47B8D42c61DE0367&tokenInAddress=0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7&tokenInDecimals=18&tokenInAmount=0.100000000000000000&tokenOutAddress=0x60781C2586D68229fde47564546784ab3fACA982&tokenOutDecimals=18&minUsdPrice=null&maxUsdPrice=1&blockchain=Avalanche&chainId=43114&exchange=Pangolin&tokenOutAmount=null&maxGasPriceInGwei=225&userAddress=0xb8da5626d6725058b269fc96d3c4238c7f53d606&isUsdPriceRelatedToTokenIn=false&takeFeeFromInput=false&maxAttempts=2&slippagePercent=1",  //todo remove message from database?
  // "minTokenOutPerTokenIn": null,
  // "minUsdPrice": null,
  // "numAttempts": 1,
  // "slippagePercent": "1.000000000000000000000000",
  // "strategyStatus": "SUCCESSFUL",
  // "tokenInDecimals": 18,
  // "tokenOutAmount": null,
  // "tokenOutDecimals": 18,
  // "updated_at": "2021-08-04T15:36:49.445395+00:00",
  // "usdPrice": null,
  // "transactionHash": [
  //   "0x08e3c1e43b4571d63b795afbe1061233e9a27f95aa24abd49ebee3088667f6dd"
  // ]
}




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
    const res = await ValidationTestDeployed.validateSig.call(
      signature,
      strategy.chainId,
      strategy.exchange,
      strategy.identifier,
      strategy.userAddress,
      strategy.tokenInAddress,
      strategy.tokenOutAddress,
      strategy.isUsdPriceRelatedToTokenIn
      );
    console.log("res",res)
  });
});
