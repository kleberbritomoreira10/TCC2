pragma solidity ^0.4.18;

import "./FGACoin.sol";

contract FGACoinSale {
  address admin;
  FGACoin public tokenContract;
  uint256 public tokenPrice;
  uint256 public tokensSold;

  event Sell(address _buyer, uint256 _amount);

  function FGACoinSale(FGACoin _tokenContract, uint256 _tokenPrice) public {
    // Atribui um administrador
    admin = msg.sender;
    // Token contract
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
    //Requer que a transferência seja um sucesso
    require(tokenContract.transfer(msg.sender, _numberOfTokens));
    //Mantem a rastreabilidade de TokensSol
    tokensSold += _numberOfTokens;
    //Dispara evento Sell
    Sell(msg.sender, _numberOfTokens);
  }

}
