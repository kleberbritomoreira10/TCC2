//Cria um objeto referente ao contrato FGACoin
var FGACoin = artifacts.require("./FGACoin.sol");

contract('FGACoin', function(accounts){
  var tokenInstance;

  it('Inicializando o contrato inteligente com os valores corretos', function(){
    return FGACoin.deployed().then(function(instance){
      tokenInstance = instance;
      return tokenInstance.name();
    }).then(function(name){
      assert.equal(name, 'FGA Coin', 'Tem o nome correto');
      return tokenInstance.symbol();
    }).then(function(symbol){
      assert.equal(symbol, 'FGACOIN', 'Tem o símbolo correto');
      return tokenInstance.standard();
    }).then(function(standard){
      assert.equal(standard, 'FGA Coin v1.0', 'Tem o padrão correto');
    });
  });

  it('Alocando o fornecimento inicial de criptomoedas designadas', function(){
    return FGACoin.deployed().then(function(instance){
      tokenInstance = instance;
      return tokenInstance.totalSupply();
    }).then(function(totalSupply){
      assert.equal(totalSupply.toNumber(), 1000000, 'Estabelecido o fornecimento total de 1,000,000');
      return tokenInstance.balanceOf(accounts[0]);
    }).then(function(adminBalance){
      assert.equal(adminBalance.toNumber(), 1000000, 'Alocando o fornecimento inicial para a conta do administrador');
    });
  });

  it('Transfere a propriedade do token', function(){
    return FGACoin.deployed().then(function(instance){
        tokenInstance = instance;
        //Testando transferir algo maior do que o saldo do remetente
      return tokenInstance.transfer.call(accounts[1], 99999999999999999999999);
    }).then(assert.fail).catch(function(error){
      assert(error.message.indexOf('revert') >= 0, 'mensagem de erro deve conter revert');
      return tokenInstance.transfer.call(accounts[1], 250000, {from: accounts[0] });
    }).then(function(success){
      assert.equal(success, true, 'retorna true');
      return tokenInstance.transfer(accounts[1], 250000, {from: accounts[0]});
    }).then(function(receipt){
      assert.equal(receipt.logs.length, 1, 'dispara um evento');
      assert.equal(receipt.logs[0].event, 'Transfer', 'deveria ser o evento "Transfer"');
      assert.equal(receipt.logs[0].args._from, accounts[0], 'registra a conta na qual os tokens são transferidos');
      assert.equal(receipt.logs[0].args._to, accounts[1], 'registra a conta para a qual os tokens são transferidos');
      assert.equal(receipt.logs[0].args._value, 250000, 'registra o valor da transferência');
      return tokenInstance.balanceOf(accounts[1]);
    }).then(function(balance){
      assert.equal(balance.toNumber(), 250000, 'adiciona o valor à conta de recebimento');
      return tokenInstance.balanceOf(accounts[0]);
    }).then(function(balance){
      assert.equal(balance.toNumber(), 750000, 'deduz o valor da conta de envio');
    });
  });

  it('aprova tokens para a transferência solicitada', function(){
    return FGACoin.deployed().then(function(instance){
      tokenInstance = instance;
      return tokenInstance.approve.call(accounts[1], 100);
    }).then(function(success){
      assert.equal(success, true, 'it returns true');
      return tokenInstance.approve(accounts[1], 100, {from: accounts[0]});
    }).then(function(receipt){
      assert.equal(receipt.logs.length, 1, 'Dispara um evento');
      assert.equal(receipt.logs[0].event, 'Approval', 'Deveria ser o evento "Approval" ');
      assert.equal(receipt.logs[0].args._owner, accounts[0], 'registra a conta em que os tokens são autorizados ');
      assert.equal(receipt.logs[0].args._spender, accounts[1], 'registra a conta na qual os tokens estão autorizados');
      assert.equal(receipt.logs[0].args._value, 100, 'registra o valor da transferência');
      return tokenInstance.allowance(accounts[0], accounts[1]);
    }).then(function(allowance){
      assert.equal(allowance.toNumber(), 100, 'armazenada o allowance para a transferência solicitada');
    });
  });

  it('Lida com as transferências de token solicitadas', function(){
    return FGACoin.deployed().then(function(instance){
      tokenInstance = instance;
      fromAccount = accounts[2];
      toAccount = accounts[3];
      spendingAccount = accounts[4];
      //Transfere alguns tokens para FromAccount
      return tokenInstance.transfer(fromAccount, 100, { from: accounts[0] });
    }).then(function(receipt){
      //Aprova spendingAccount para gastar 10 tokens de fromAccount
      return tokenInstance.approve(spendingAccount, 10, {from: fromAccount });
    }).then(function(receipt){
      //Tenta transferir algo maior do que o saldo do remetente
      return tokenInstance.transferFrom(fromAccount, toAccount, 9999, { from: spendingAccount });
    }).then(assert.fail).catch(function(error){
      assert(error.message.indexOf('revert') >= 0, 'Não pode transferir valor maior que o saldo');
      //Tenta transferir algo maior que o valor aprovado
      return tokenInstance.transferFrom(fromAccount, toAccount, 20, {from: spendingAccount});
    }).then(assert.fail).catch(function(error){
      assert(error.message.indexOf('revert') >= 0, 'não é possível transferir valor maior do que o valor aprovado');
      return tokenInstance.transferFrom.call(fromAccount, toAccount, 10, {from: spendingAccount });
    }).then(function(success){
      assert.equal(success, true);
      return tokenInstance.transferFrom(fromAccount, toAccount, 10, {from: spendingAccount});
    }).then(function(receipt){
      assert.equal(receipt.logs.length, 1, 'Dispara um evento');
      assert.equal(receipt.logs[0].event, 'Transfer', 'Deveria ser o evento "Transfer" ');
      assert.equal(receipt.logs[0].args._from, fromAccount, 'registra a conta na qual os tokens são transferidos');
      assert.equal(receipt.logs[0].args._to, toAccount, 'registra a conta para a qual os tokens são transferidos');
      assert.equal(receipt.logs[0].args._value, 10, 'registra o valor da transferência');
      return tokenInstance.balanceOf(fromAccount);
    }).then(function(balance){
      assert.equal(balance.toNumber(), 90, 'subtrai o valor da conta de envio');
      return tokenInstance.balanceOf(toAccount);
    }).then(function(balance){
      assert.equal(balance.toNumber(), 10, 'adiciona o valor da conta de recebimento');
      return tokenInstance.allowance(fromAccount, spendingAccount);
    }).then(function(allowance){
      assert.equal(allowance.toNumber(), 0, 'subtrai a quantidade do allowance');
    });
  });

})
