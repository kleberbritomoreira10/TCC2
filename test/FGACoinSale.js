//Cria um objeto referente ao contrato FGACoinSale
var FGACoinSale = artifacts.require('./FGACoinSale.sol');
//Cria um objeto referente ao contrato FGACoin
var FGACoin = artifacts.require('./FGACoin.sol');

contract('FGACoinSale', function(accounts) {
  var tokenSaleInstance;
  var tokenInstance;
  var admin = accounts[0];
  var buyer = accounts[1];
  var tokenPrice = 1000000000000000000; // em wei (menor subdivisão/unidade do ether)
  var tokensAvailable = 750000;         // Definindo a quantidade máxima total de criptomoedas que podem ser vendidas
  var numberOfTokens;

  it('Inicializando o contrato FGACoinSale com os valores corretos', function(){
      return FGACoinSale.deployed().then(function(instance){
        //Mantem a rastreabilidade da Instância
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

  it('Facilitando a compra de tokens', function(){
    return FGACoin.deployed().then(function(instance){
      // Pega a instância do token FGACoin
      tokenInstance = instance;
      return FGACoinSale.deployed();
    }).then(function(instance){
      // Pega a instância do token FGACoinSale
      tokenSaleInstance = instance;
      // Fornece 75% dos tokens total para a venda
      return tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, {from: admin})
    }).then(function(receipt){
      numberOfTokens = 10;
      return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: numberOfTokens * tokenPrice })
    }).then(function(receipt){
      assert.equal(receipt.logs.length, 1, 'Dispara um evento');
      assert.equal(receipt.logs[0].event, 'Sell', 'deveria ser o evento "Sell" ');
      assert.equal(receipt.logs[0].args._buyer, buyer, 'registra a conta que comprou os tokens');
      assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'registra o número de tokens comprados');
      return tokenSaleInstance.tokensSold();
    }).then(function(amount){
      assert.equal(amount.toNumber(), numberOfTokens, 'incrementa o número de tokens vendidos');
      return tokenInstance.balanceOf(buyer);
    }).then(function(balance){
      assert.equal(balance.toNumber(), numberOfTokens);
      return tokenInstance.balanceOf(tokenSaleInstance.address);
    }).then(function(balance){
      assert.equal(balance.toNumber(), tokensAvailable - numberOfTokens);
      // Tenta comprar tokens diferentes do valor Ether
      return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: 1 });
    }).then(assert.fail).catch(function(error){
      assert(error.message.indexOf('revert') >= 0, 'msg.value deve igualar número de tokens em wei');
      return tokenSaleInstance.buyTokens(800000, { from: buyer, value: numberOfTokens * tokenPrice })
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, 'não pode comprar mais tokens do que o disponível');
    });

  });


})
