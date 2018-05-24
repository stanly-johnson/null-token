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

  function CrowdSale(NullToken _tokenContract) public {
    admin = msg.sender;
    tokenContract = _tokenContract;
  }

}
