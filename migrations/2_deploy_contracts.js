const ValidationTest = artifacts.require("ValidationTest");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(ValidationTest, accounts[0]);
};
