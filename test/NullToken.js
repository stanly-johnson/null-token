var NullToken = artifacts.require("./NullToken.sol");

contract('NullToken', function(accounts) {
  //check if the total supply of the token is as intended
  //change the total supply value here
  const $totalCount = 1000;
  it('Test for total supply', function() {
    return NullToken.deployed().then(function(instance) {
      nullTokenInstance = instance;
      return nullTokenInstance.totalSupply();
    }).then(function(totalSupply) {
      assert.equal(totalSupply.toNumber(), $totalCount, 'set the total supply to $totalCount');
    })
  });
})
