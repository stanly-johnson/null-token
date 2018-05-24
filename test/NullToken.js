/**
NullToken v1.0
SmartContract Token Deployment Test
Author : Stanly Johnson (stanlyjohnson@outlook.com)
https://github.com/stanly-johnson/null-token
**/

var NullToken = artifacts.require("./NullToken.sol");

contract('NullToken', function(accounts) {

  //specify the smart contract test values here
  const $totalCount = 1000000;
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
      return nullTokenInstance.transfer.call($recipentAddress, $transferTokenTestNumber, { from : $ownerAddress});
    }).then(function(success){
      assert.equal(success, true, 'return true for correct txn');
      return nullTokenInstance.transfer($recipentAddress, $transferTokenTestNumber, { from : $ownerAddress});
    }).then(function(receipt){
      assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
      assert.equal(receipt.logs[0].args._from, $ownerAddress, 'logs the account the tokens are transferred from');
      assert.equal(receipt.logs[0].args._to, $recipentAddress, 'logs the account the tokens are transferred to');
      assert.equal(receipt.logs[0].args._value, $transferTokenTestNumber, 'logs the transfer amount');
      return nullTokenInstance.balanceOf($recipentAddress);
    }).then(function(recipentBalance){
      assert.equal(recipentBalance.toNumber(), $transferTokenTestNumber, 'add the value to recipent account');
      return nullTokenInstance.balanceOf($ownerAddress);
    }).then(function(ownerBalance){
      assert.equal(ownerBalance.toNumber(), $totalCount-$transferTokenTestNumber, 'deduct the value from the sender account');
    })
  });

  //check for approval conditions
  it('Test for approval delegated transfer', function(){
    return NullToken.deployed().then(function(instance){
      nullTokenInstance = instance;
      return nullTokenInstance.approve.call($ownerAddress, 100);
    }).then(function(success){
      assert.equal(success, true, 'returns true');
      //check for limit test
      return nullTokenInstance.approve($recipentAddress, $totalCount+100);
    }).then(assert.fail).catch(function(error){
      assert(error.message.indexOf('revert') >= 0, 'error message must have revert');
      return nullTokenInstance.approve($recipentAddress, 100, {from : $ownerAddress});
    }).then(function(receipt){
      return nullTokenInstance.allowance($ownerAddress, $recipentAddress);
    }).then(function(allowance){
      assert.equal(allowance, 100, 'store the allowance value');
    });
  });

  //test for approval transactions
  it('Functional test for delegated transfer', function(){
    return NullToken.deployed().then(function(instance){
      nullTokenInstance = instance;
      fromAccount = accounts[6];
      toAccount = accounts[1];
      spenderAccount = accounts[3];
      //transfering 100 tokens to fromAccount
      return nullTokenInstance.transfer(fromAccount, 100, {from : $ownerAddress});
    }).then(function(receipt){
      assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
      assert.equal(receipt.logs[0].args._from, $ownerAddress, 'logs the account the tokens are transferred from');
      assert.equal(receipt.logs[0].args._to, fromAccount, 'logs the account the tokens are transferred to');
      assert.equal(receipt.logs[0].args._value, 100, 'logs the transfer amount');
      return nullTokenInstance.approve(spenderAccount, 20, {from : fromAccount});
    }).then(function(receipt){
        //testing for fromAccount limit
        return nullTokenInstance.transferFrom(fromAccount, toAccount, 999, {from : spenderAccount});
    }).then(assert.fail).catch(function(error){
      assert(error.message.indexOf('revert') >= 0, 'must revert - cannot transfer more than balance');
      //testing for approval limit
      return nullTokenInstance.transferFrom(fromAccount, toAccount, 99, {from : spenderAccount});
    }).then(assert.fail).catch(function(error){
      assert(error.message.indexOf('revert') >= 0, 'must revert - cannot transfer more than approved limit');
      return nullTokenInstance.transferFrom.call(fromAccount, toAccount, 10, {from : spenderAccount});
    }).then(function(success){
      assert.equal(success, true, 'transfer must happen');
      return nullTokenInstance.transferFrom(fromAccount, toAccount, 20, {from : spenderAccount});
    }).then(function(receipt){
      assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
      assert.equal(receipt.logs[0].args._from, fromAccount, 'logs the account the tokens are transferred from');
      assert.equal(receipt.logs[0].args._to, toAccount, 'logs the account the tokens are transferred to');
      assert.equal(receipt.logs[0].args._value.toNumber(), 20, 'logs the transfer amount');
      return nullTokenInstance.balanceOf(toAccount);
    }).then(function(balance){
      assert.equal(balance.toNumber(), 20, 'add amount to toAccount');
      return nullTokenInstance.balanceOf(fromAccount);
    }).then(function(balance){
      assert.equal(balance.toNumber(), 80, 'deduct amount from fromAccount');
      return nullTokenInstance.allowance(fromAccount, spenderAccount);
    }).then(function(allowance){
      assert.equal(allowance, 0, 'test spent amount was deducted from the allowance');
    });
  });

})//end of contract
