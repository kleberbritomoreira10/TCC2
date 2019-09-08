pragma solidity ^0.4.2;

contract FGACoin {
  //Constructor
  //Set the total number of tokens
  //Read the total number of tokens
  uint256 public totalSupply;

  function FGACoin () public{
    totalSupply = 1000000;
  }
}
