/**
NullToken v1.0
CrowdSale Deployment Test
Author : Stanly Johnson (stanlyjohnson@outlook.com)
https://github.com/stanly-johnson/null-token
**/

var CrowdSale = artifacts.require("./CrowdSale.sol");

contract (CrowdSale, function(accounts){
  var tokenCrowdSaleInstance;

  it('Test for Contract initial values', function(){
    return NullToken.deployed.then(function(instance){
      tokenCrowdSaleInstance = instance;
    })
  });

})//end of contract
