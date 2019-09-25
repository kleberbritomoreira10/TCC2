pragma solidity ^0.4.18;

import "./FGACoin.sol";

contract FGACoinSale {
  address admin;
  FGACoin public tokenContract;
  uint256 public tokenPrice;
  uint256 public tokensSold;

  event Sell(address _buyer, uint256 _amount);

  function FGACoinSale(FGACoin _tokenContract, uint256 _tokenPrice) public {
    // Assign an admin
    admin = msg.sender;
    // Token contract
    tokenContract = _tokenContract;
    // Token Price
    tokenPrice = _tokenPrice;
  }

  //Multiply
  function multiply(uint x, uint y) internal pure returns (uint z) {
    require(y == 0 || (z = x * y) / y == x);
  }

  // Buying the tokens for the correct amount
  function buyTokens(uint256 _numberOfTokens) public payable {
    //Require that value is equal to tokens
    require(msg.value == multiply(_numberOfTokens, tokenPrice));
    //Require that the contract has enough tokens
    require(tokenContract.balanceOf(this) >= _numberOfTokens);
    //Require that a transfer is successful
    require(tokenContract.transfer(msg.sender, _numberOfTokens));
    tokensSold += _numberOfTokens;
    //Trigger Sell Event
    Sell(msg.sender, _numberOfTokens);
    //Keep track of TokensSold
  }

}
