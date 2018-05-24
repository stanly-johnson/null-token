var NullToken = artifacts.require("./NullToken.sol");
var CrowdSale = artifacts.require("./CrowdSale.sol");

module.exports = function(deployer) {
  deployer.deploy(NullToken, 1000000).then(function(){
    return deployer.deploy(CrowdSale, NullToken.address);
  });
};
