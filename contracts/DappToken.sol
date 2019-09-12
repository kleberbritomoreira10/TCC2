pragma solidity ^0.4.18;

contract DappToken {
    //Name
    string public name = "DApp Token";
    //Symbol
    string public symbol = "DAPP";
    //Standard
    string public standard = "DApp Token v1.0";

    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    // Constructor
    // Set the total number of tokens
    // Read the total number of tokens
    function DappToken(uint256 _initialSupply) public {
      balanceOf[msg.sender] = _initialSupply;
      totalSupply = _initialSupply;
      //allocate the initial supply
    }

}
