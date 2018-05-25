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

  event Sell(address _buyer, uint256 _amount);

  //constructor
  function CrowdSale(NullToken _tokenContract, uint256 _tokenPrice) public {
    admin = msg.sender;
    tokenContract = _tokenContract;
    tokenPrice = _tokenPrice;
  }

  function safeMultiply(uint x, uint y) internal pure returns (uint z){
    require(y == 0 || (z = x * y)/y == x );
  }

  //buyTokens function
  function buyTokens (uint256 _numberOfToken) public payable {
    require(tokenContract.balanceOf(this) >= _numberOfToken)
    require(msg.value == safeMultiply(_numberOfToken, tokenPrice));
    emit Sell(msg.sender, _numberOfToken);
    tokensSold += _numberOfToken;
  }

}
