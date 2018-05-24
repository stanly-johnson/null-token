/**
NullToken v1.0
CrowdSale Deployment Test
Author : Stanly Johnson (stanlyjohnson@outlook.com)
https://github.com/stanly-johnson/null-token
**/

var CrowdSale = artifacts.require("./CrowdSale.sol");

contract ('CrowdSale', function(accounts){
  var tokenCrowdSaleInstance;

  it('Test for Contract initial values', function(){
    return CrowdSale.deployed().then(function(instance){
      tokenCrowdSaleInstance = instance;
      return tokenCrowdSaleInstance.address
    }).then(function(address){
      assert.notEqual(address, 0x0, 'has contract address');
      return tokenCrowdSaleInstance.tokenContract();
    }).then(function(address){
      assert.notEqual(address, 0x0, 'has token contract address');
    });
  });

});//end of contract
