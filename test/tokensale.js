const tokenSale = artifacts.require("tokenSale.sol");
const Token1 = artifacts.require("token1.sol");

const Web3 = require("web3");

contract("Deploying", function (accounts) {
  [owner, spender, receiver, buyer] = accounts;
  let tokenSaleInstance, tokenInstance;
  let admin = owner;
  let tokenPrice = Web3.utils.toWei("2", "ether");
  let tokenAvailable = Web3.utils.toWei("300", "ether");

  beforeEach(async () => {
    tokenInstance = await Token1.new();
    tokenSaleInstance = await tokenSale.new(tokenInstance.address, tokenPrice);
  });

  describe("Deploying", async () => {
    it("gets correct admin", async () => {
      const _admin = await tokenSaleInstance.admin();
      console.log("the token contract admin is: ", _admin);
      console.log("this is the token1 address", tokenInstance.address);
    });
    it("gets the token price", async () => {
      console.log("the token price is", tokenPrice.toString());
    });
  });

  beforeEach(async () => {
    tokenInstance = await Token1.new();
    tokenSaleInstance = await tokenSale.new(tokenInstance.address, tokenPrice);
  });

  describe("Deploying", async () => {
    it("facilitates token buying", async () => {
      const _iBuyToken = Web3.utils.toWei("2", "ether");
      await tokenInstance.transfer(tokenSaleInstance.address, tokenAvailable, {
        from: admin,
      });
      const _balanceOf = await tokenInstance.balanceOf(admin);

      console.log("the balance of admin is:", _balanceOf.toString());

      await tokenSaleInstance.buyTokens({
        from: buyer,
        value: _iBuyToken,
      });

      const iBuy = await tokenSaleInstance.iBUyToken();
      const _tokenSold = await tokenSaleInstance.tokenSold();

      console.log("the num of token bought is:", iBuy.toString());
      console.log("the tokens sold are:", _tokenSold.toString());
      console.log("the balance of admin is:", _balanceOf.toString());
      console.log("the balance of admin is:", _balanceOf.toString());
    });

    it("allows admin to end sales", async () => {
      await tokenSaleInstance.endSale({ from: admin });
      console.log("the sales has ended");
      const _balanceOf = await tokenInstance.balanceOf(admin);
      console.log(
        "the balance of unsold token to admin is:",
        _balanceOf.toString()
      );
    });
    
    it("destroys the smart contract", async () => {
      await tokenSaleInstance.tokenPrice();
      console.log("token price was reset after self destruct was called");
    });
  });
});
