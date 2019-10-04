//Cria um objeto referente ao contrato FGACoin
var FGACoin = artifacts.require("./FGACoin.sol");
//Cria um objeto referente ao contrato FGACoinSale
var FGACoinSale = artifacts.require("./FGACoinSale.sol");

//Módulo que define a quantidade total de criptomoedas do sistema e qual o valor base para comprar
module.exports = function(deployer) {
  deployer.deploy(FGACoin, 1000000).then(function(){
    //Preço do token é 0.001 Ether
    var tokenPrice = 1000000000000000;
    //1000000000000000000
    return deployer.deploy(FGACoinSale, FGACoin.address, tokenPrice);
  });
};
