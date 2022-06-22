const token1 = artifacts.require("token1");
const tokenSale = artifacts.require("tokenSale");


module.exports = function (deployer) {
  deployer.deploy(token1);
  deployer.deploy(tokenSale);
};
