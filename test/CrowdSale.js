/**
NullToken v1.0
CrowdSale Deployment Test
Author : Stanly Johnson (stanlyjohnson@outlook.com)
https://github.com/stanly-johnson/null-token
**/

var CrowdSale = artifacts.require("./CrowdSale.sol");
var NullToken = artifacts.require("./NullToken.sol");

contract ('CrowdSale', function(accounts){
  var tokenCrowdSaleInstance;
  var nullTokenInstance;
  //setting price in wei
  var tokenPrice = 10000000000000;
  var tokenBuyer = accounts[5];
  var owner = accounts[0];
  var tokensForSale = 500000;
  var numberOfTokens;

  it('Test for Contract initial values', function(){
    return CrowdSale.deployed().then(function(instance){
      tokenCrowdSaleInstance = instance;
      return tokenCrowdSaleInstance.address
    }).then(function(address){
      assert.notEqual(address, 0x0, 'has contract address');
      return tokenCrowdSaleInstance.tokenContract();
    }).then(function(address){
      assert.notEqual(address, 0x0, 'has token contract address');
      return tokenCrowdSaleInstance.tokenPrice();
    }).then(function(price){
      assert.equal(price, tokenPrice, 'correctly set the token price');
    });
  });

  it('Test for Buy Token Functionality', function(){
    return NullToken.deployed().then(function(instance){
      nullTokenInstance = instance;
      return CrowdSale.deployed();
    }).then(function(instance){
      tokenCrowdSaleInstance = instance;
      return tokenCrowdSaleInstance.transfer(tokenCrowdSaleInstance.address , tokensForSale, { from : owner })
    }).then(function(receipt){
      numberOfTokens = 10;
      return tokenCrowdSaleInstance.buyTokens(numberOfTokens, {from : tokenBuyer, value : numberOfTokens * 1});
    }).then(function(receipt){
      assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'Sell', 'should be the "Transfer" event');
      assert.equal(receipt.logs[0].args._buyer, tokenBuyer, 'logs the buyer of the tokens');
      assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the transferred number');
      return tokenCrowdSaleInstance.tokensSold();
    }).then(function(amount){
      assert.equal(amount.toNumber(), numberOfTokens, 'increments the number of tokens sold');
      //test for limit
      return nullTokenInstance.balanceOf(buyer);
    }).then(function(balance){
      assert.equal(balance.toNumber(), numberOfTokens, 'balance match with number of tokens');
      return tokenCrowdSaleInstance.buyTokens(numberOfTokens, {from : tokenBuyer, value : 10});
    }).then(assert.fail).catch(function(error){
      assert(error.message.indexOf('revert') >= 0, 'transaction must fail - value-token mismatch');
    });
  });

});//end of contract
