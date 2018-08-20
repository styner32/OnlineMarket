const OnlineMarket = artifacts.require("./OnlineMarket.sol");

module.exports = function(deployer) {
  deployer.deploy(OnlineMarket);
};
