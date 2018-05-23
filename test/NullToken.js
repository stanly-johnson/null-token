var NullToken = artifacts.require("./NullToken.sol");

contract('NullToken', function(accounts) {

  //specify the smart contract test values here
  const $totalCount = 1000;
  const $ownerAddress = accounts[0];
  const $tokenName = 'NullToken';
  const $tokenSymbol = 'NUL';
  const $recipentAddress = accounts[2];
  const $transferTokenTestNumber = 10;

  //test for contract initialisation
  it('Test for Contract values', function(){
    return NullToken.deployed().then(function(instance){
        nullTokenInstance = instance;
        return nullTokenInstance.name();
    }).then(function(_tokenName){
      assert.equal(_tokenName, $tokenName, 'correct name has been assigned to token');
      return nullTokenInstance.symbol();
    }).then(function(_tokenSymbol){
      assert.equal(_tokenSymbol, $tokenSymbol, 'correct token symbol has been assigned');
    })
  });

  //check if the total supply of the token is as intended
  it('Test for total supply', function() {
    return NullToken.deployed().then(function(instance) {
      nullTokenInstance = instance;
      return nullTokenInstance.totalSupply();
    }).then(function(totalSupply) {
      assert.equal(totalSupply.toNumber(), $totalCount, 'set the total supply to $totalCount');
    })
  });

  //check if all the tokens have been transferred to the owners address
  it('Test for owner transfer', function(){
    return NullToken.deployed().then(function(instance){
      nullTokenInstance = instance;
      return nullTokenInstance.balanceOf($ownerAddress);
    }).then(function(owner_balance){
      assert.equal(owner_balance.toNumber(), $totalCount, 'set to owner balance to total supply');
    })
  });

  //check if token transfer happens correctly
  it('Test for token transfer', function(){
    return NullToken.deployed().then(function(instance){
      nullTokenInstance = instance;
      return nullTokenInstance.transfer.call($ownerAddress, $totalCount+100);
    }).then(assert.fail).catch(function(error){
      assert(error.message.indexOf('revert') >= 0, 'error message must have revert');
      return nullTokenInstance.transfer($recipentAddress, $transferTokenTestNumber, { from : $ownerAddress});
    }).then(function(receipt){
      return nullTokenInstance.balanceOf($recipentAddress);
    }).then(function(recipentBalance){
      assert.equal(recipentBalance.toNumber(), $transferTokenTestNumber, 'add the value to recipent account');
      return nullTokenInstance.balanceOf($ownerAddress);
    }).then(function(ownerBalance){
      assert.equal(ownerBalance.toNumber(), $totalCount-$transferTokenTestNumber, 'deduct the value from the sender account');
    })
  });

})//end of contract