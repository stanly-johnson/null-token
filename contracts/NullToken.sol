pragma solidity ^0.4.2;

contract NullToken {

  uint256 public totalSupply;
  string constant public name = 'NullToken';
  string constant public symbol = 'NUL';

  event Transfer(address indexed _from, address indexed _to, uint256 _value);

  mapping(address => uint256) public balanceOf;

  function NullToken(uint256 _seedAmount) public {
      totalSupply = _seedAmount;
      balanceOf[msg.sender] = totalSupply;
  }

  function transfer(address _toAddress, uint256 _value) public returns (bool success){
    //check if the sender has tokens > sending value
      require(balanceOf[msg.sender] >= _value);
      balanceOf[msg.sender] -= _value;
      balanceOf[_toAddress] += _value;
  }

}//end of contract
