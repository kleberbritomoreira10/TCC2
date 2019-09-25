var FGACoinSale = artifacts.require('./FGACoinSale.sol');
var FGACoin = artifacts.require('./FGACoin.sol');

contract('FGACoinSale', function(accounts) {
  var tokenSaleInstance;
  var tokenInstance;
  var admin = accounts[0];
  var buyer = accounts[1];
  var tokenPrice = 1000000000000000000; // em wei (menor subdivisão/unidade do ether)
  var tokensAvailable = 750000;
  var numberOfTokens;

  it('Inicializando o contrato com os valores corretos', function(){
      return FGACoinSale.deployed().then(function(instance){
        //Manter a rastreabilidade da Instância
        tokenSaleInstance = instance;
        return tokenSaleInstance.address
      }).then(function(address){
        assert.notEqual(address, 0x0, 'Tem endereço do contrato');
        return tokenSaleInstance.tokenContract();
      }).then(function(address){
        assert.notEqual(address, 0x0, 'Tem token no endereço do contrato');
        return tokenSaleInstance.tokenPrice();
      }).then(function(price){
        assert.equal(price, tokenPrice, 'Preço do token está correto');
      });
  });

  

})
