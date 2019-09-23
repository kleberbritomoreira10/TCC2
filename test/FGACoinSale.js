var FGACoinSale = artifacts.require('./FGACoinSale.sol');

contract('FGACoinSale', function(accounts) {
  var tokenSaleInstance;
  var tokenPrice = 1000000000000000000; // em wei (menor subdivisão/unidade do ether)

  it('Inicializando o contrato com os valores corretos', function(){
      return FGACoinSale.deployed().then(function(instance){
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
