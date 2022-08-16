const InfoContract = artifacts.require("InfoContract");
const MetaCoin = artifacts.require("MetaCoin");

module.exports = function (deployer) {
  deployer.deploy(InfoContract);
  deployer.deploy(MetaCoin);
};
