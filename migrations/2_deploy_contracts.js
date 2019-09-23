var FGACoin = artifacts.require("./FGACoin.sol");
var FGACoinSale = artifacts.require("./FGACoinSale.sol");

module.exports = function(deployer) {
  deployer.deploy(FGACoin, 1000000).then(function(){
    //Token price is 0.001 Ether
    var tokenPrice = 1000000000000000000;
    return deployer.deploy(FGACoinSale, FGACoin.address, tokenPrice);
  });
};
