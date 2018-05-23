var NullToken = artifacts.require("./NullToken.sol");

contract('NullToken', function(accounts) {

  //change the total supply value here
  const $totalCount = 1000;
  const $ownerAddress = accounts[0];

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

})//end of contract
