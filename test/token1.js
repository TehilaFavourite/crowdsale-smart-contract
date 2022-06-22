const Token1 = artifacts.require("token1.sol");
const Web3 = require("web3");

contract("Deploying", function (accounts) {
  [owner, spender, receiver] = accounts;
  let tokenInstance;

  beforeEach(async () => {
    tokenInstance = await Token1.new();
  });

  describe("Deploying", async () => {
    it("gets correct name", async () => {
      const _name = await tokenInstance.name();
      console.log("the token contract name is: ", _name);
    });
    it("gets correct symbol", async () => {
      const _sym = await tokenInstance.symbol();
      console.log("the token symbol is:", _sym);
    });
    it("gets the correct standard", async () => {
      const _stan = await tokenInstance.standard();
      console.log("the token standard is:", _stan);
    });
    it("gets the correct total supply", async () => {
      const _totalSupply = await tokenInstance.totalSupply();
      console.log("total token supplied is:", _totalSupply.toString());
    });
    it("gets the owner address", async () => {
      const _owner = await tokenInstance.owner();
      console.log("the owner address is:", _owner);
    });
    it("gets the token decimal", async () => {
      const _decimal = await tokenInstance.decimals();
      console.log("the token decimal is:", _decimal.toString());
    });
    it("gets balance of owner", async () => {
      const _balanceOf = await tokenInstance.balanceOf(owner);
      console.log("the balance of owner is:", _balanceOf.toString());
    });
  });

  beforeEach(async () => {
    tokenInstance = await Token1.new();
  });

  describe("Deploying", async () => {
    it("transfers to the recipient", async () => {
      const amount = Web3.utils.toWei("10", "ether");
      await tokenInstance.transfer(receiver, amount, { from: owner });

      const _balanceOf = await tokenInstance.balanceOf(owner);
      const _balanceOfReceiver = await tokenInstance.balanceOf(receiver);
      console.log("the balance of owner is:", _balanceOf.toString());
      console.log("the balance of receiver is:", _balanceOfReceiver.toString());
    });
    it("approves tokens for delegated transfer", async () => {
      const amount = web3.utils.toWei("500", "ether");
      await tokenInstance.approve(spender, amount, {
        from: owner,
      });
      const _allowance = await tokenInstance.allowance(owner, spender);
      console.log("the allowance amount is:", _allowance.toString());
    });
    it("approves tokens for delegated transfer", async () => {
      const amount = web3.utils.toWei("500", "ether");
      const amt = web3.utils.toWei("50", "ether");
      await tokenInstance.approve(spender, amount, {
        from: owner,
      });
      const _allowance = await tokenInstance.allowance(owner, spender);
      console.log("the allowance amount is:", _allowance.toString());
      await tokenInstance.transferFrom(owner, receiver, amt, {
        from: spender,
      });
      const _balanceOfReceiver = await tokenInstance.balanceOf(receiver);
      console.log("the balance of receiver is:", _balanceOfReceiver.toString());
      const _newAllowance = await tokenInstance.allowance(owner, spender);
      console.log("the allowance amount is:", _newAllowance.toString());
    });
  });
});
