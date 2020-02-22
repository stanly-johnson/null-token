var NullToken = artifacts.require("./NullToken.sol");
var CrowdSale = artifacts.require("./CrowdSale.sol");

module.exports = function(deployer) {
  deployer.deploy(NullToken, 10000).then(function(){
    tokenPrice = 100;
    return deployer.deploy(CrowdSale, NullToken.address, tokenPrice);
  });
};
