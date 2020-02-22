/**
NullToken SmartContract
Confirms to EIP20 standard
https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
Author : Stanly Johnson (stanlyjohnson@outlook.com)
Repo : https://github.com/stanly-johnson/null-token
**/

pragma solidity ^0.5.0;

contract NullToken {

  uint256 public totalSupply;
  string constant public name = 'NullToken';
  string constant public symbol = 'NUL';

  //transfer event as per EIP20 standard
  event Transfer(address indexed _from, address indexed _to, uint256 _value);
  //approval event as per EIP20 standard
  event Approval(address indexed _owner, address indexed _spender, uint256 _value);

  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance;

  constructor (uint256 _seedAmount) public {
      totalSupply = _seedAmount;
      balanceOf[msg.sender] = totalSupply;
  }

  //transfer function as per the EIP20 standard
  function transfer(address _toAddress, uint256 _value) public returns (bool success){
    //check if the sender has tokens > sending value
      require(balanceOf[msg.sender] >= _value);
      balanceOf[msg.sender] -= _value;
      balanceOf[_toAddress] += _value;
      emit Transfer(msg.sender, _toAddress, _value);
      return true;
  }

  //approve function as per the EIP20 standard
  function approve(address _spenderAddress, uint256 _value) public returns (bool success){
    //check if the approver has tokens > sending value
    require(balanceOf[msg.sender] >= _value);
    allowance[msg.sender][_spenderAddress] = _value;
    emit Approval(msg.sender, _spenderAddress, _value);
    return true;
  }

  function transferFrom(address _fromAddress, address _toAddress, uint256 _value) public returns (bool success){
    require(balanceOf[_fromAddress] >= _value);
    require(allowance[_fromAddress][msg.sender] >= _value);
    balanceOf[_fromAddress] -= _value;
    balanceOf[_toAddress] += _value;
    allowance[_fromAddress][msg.sender] -= _value;
    emit Transfer(_fromAddress, _toAddress, _value);
    return true;

  }

}//end of contract
