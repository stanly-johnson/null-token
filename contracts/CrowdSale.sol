/**
NullToken SmartContract for CrowdSale
Confirms to EIP20 standard
https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
Author : Stanly Johnson (stanlyjohnson@outlook.com)
Repo : https://github.com/stanly-johnson/null-token
**/

pragma solidity ^0.4.2;
import "./NullToken.sol";

contract CrowdSale {

  address admin;
  NullToken public tokenContract;
  uint256 public tokenPrice;
  uint256 public tokensSold;

  //constructor
  function CrowdSale(NullToken _tokenContract, uint256 _tokenPrice) public {
    admin = msg.sender;
    tokenContract = _tokenContract;
    tokenPrice = _tokenPrice;
  }

  //buyTokens function
  function buyTokens (uint256 _numberOfToken) public payable {

    tokensSold += _numberOfToken;
  }



}
