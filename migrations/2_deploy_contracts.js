const OnlineMarket = artifacts.require("./OnlineMarket.sol");
const StateLib = artifacts.require("./StateLib.sol");

module.exports = function(deployer) {
  deployer.deploy(StateLib);
  deployer.link(StateLib, OnlineMarket);
  deployer.deploy(OnlineMarket);
};
