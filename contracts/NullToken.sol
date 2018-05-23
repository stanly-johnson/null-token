pragma solidity ^0.4.2;

contract NullToken {

  uint256 public totalSupply;

  mapping(address => uint256) public balanceOf;

  function NullToken(uint256 _seedAmount) public {
      totalSupply = _seedAmount;
      balanceOf[msg.sender] = totalSupply;
  }
}
