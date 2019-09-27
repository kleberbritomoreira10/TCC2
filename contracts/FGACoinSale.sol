//Declaração da Versão do solidity
pragma solidity ^0.4.18;

//Importação para poder ter acesso ao contrato FGACoin
import "./FGACoin.sol";

//Criação do Contrato que representará a venda de criptomoedas
contract FGACoinSale {
  address admin;
  FGACoin public tokenContract;
  uint256 public tokenPrice;
  uint256 public tokensSold;

  //Dispara o evento para vender a criptomoeda
  event Sell(address _buyer, uint256 _amount);

  // Criação do Construtor
  // Ao rodar a migração, faz a leitura do address e do preço do token no arquivo 2_deploy_contracts.js e
  // inicializa o sistema, designando esse valor para o administrador em [msg.sender]
  function FGACoinSale(FGACoin _tokenContract, uint256 _tokenPrice) public {
    // Atribui um administrador
    admin = msg.sender;
    // Mantem a rastreabilidade do token Contract
    tokenContract = _tokenContract;
    // Preço do Token
    tokenPrice = _tokenPrice;
  }

  //Função de multiplicação
  function multiply(uint x, uint y) internal pure returns (uint z) {
    require(y == 0 || (z = x * y) / y == x);
  }

  // Compra os tokens pela quantidade correta
  function buyTokens(uint256 _numberOfTokens) public payable {
    //Requer que o valor seja igual aos tokens
    require(msg.value == multiply(_numberOfTokens, tokenPrice));
    //Requer que o contrato tenha tokens suficientes
    require(tokenContract.balanceOf(this) >= _numberOfTokens);
    //Requer que a transferência seja um sucesso, retornando true em caso afirmativo
    require(tokenContract.transfer(msg.sender, _numberOfTokens));
    //Mantem a rastreabilidade de TokensSol
    tokensSold += _numberOfTokens;
    //Dispara evento Sell
    Sell(msg.sender, _numberOfTokens);
  }

  // Finalizando Token FGACoinSale
  function endSale() public {
    //Requer o administrador
    require(msg.sender == admin);
    //Transfere os tokens remanescentes para o administrador
    require(tokenContract.transfer(admin, tokenContract.balanceOf(this)));
    //Destrói o Contrato
    selfdestruct(admin);
  }

}
