/**
NullToken v1.0
CrowdSale Deployment Test
Author : Stanly Johnson (stanlyjohnson@outlook.com)
https://github.com/stanly-johnson/null-token
**/

var CrowdSale = artifacts.require("./CrowdSale.sol");

contract ('CrowdSale', function(accounts){
  var tokenCrowdSaleInstance;
  //setting price in wei
  var tokenPrice = 10000000000000;
  var tokenBuyer = accounts[5];
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
    return CrowdSale.deployed().then(function(instance){
      tokenCrowdSaleInstance = instance;
      numberOfTokens = 10;
      return tokenCrowdSaleInstance.buyTokens(numberOfTokens, {from : tokenBuyer, value : numberOfTokens * tokenPrice})
    }).then(function(receipt){
      return tokenCrowdSaleInstance.tokensSold();
    }).then(function(amount){
      assert.equal(amount.toNumber(), numberOfTokens, 'increments the number of tokens sold');
    })
  });

});//end of contract
