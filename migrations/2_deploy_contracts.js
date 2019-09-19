var FGACoin = artifacts.require("./FGACoin.sol");

module.exports = function(deployer) {
  deployer.deploy(FGACoin, 1000000);
};
