pragma solidity ^0.4.18;

import "./FGACoin.sol";

contract FGACoinSale {
  address admin;
  FGACoin public tokenContract;
  uint256 public tokenPrice;

  function FGACoinSale(FGACoin _tokenContract, uint256 _tokenPrice) public {
    // Assign an admin
    admin = msg.sender;
    // Token contract
    tokenContract = _tokenContract;
    // Token Price
    tokenPrice = _tokenPrice;
  }

}
