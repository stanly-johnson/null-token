var NullToken = artifacts.require("./NullToken.sol");

module.exports = function(deployer) {
  deployer.deploy(NullToken, 1000);
};
