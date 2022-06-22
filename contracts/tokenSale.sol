pragma solidity ^0.8.7;

import "./token1.sol";

contract tokenSale {

    address public admin;
    token1 public token1Contract;
    uint256 public tokenPrice;
    uint256 public tokenSold;
    uint256 public iBUyToken;
    // uint256 public balanceOf
    constructor (token1 _tokenContract, uint256 _tokenPrice) {
        admin = msg.sender;
        token1Contract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    modifier onlyAdmin {
        require(msg.sender == admin, "Only Admin Can call this function");
        _;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
        require(b == 0 || (c = a * b) / a == b, "wrong multiplication");
        return c;
    }

    function buyTokens() external payable {
        uint256 uBuyTokens = mul(msg.value, tokenPrice) / 1e18;
        require(msg.value > 0, "insufficient value");
        require(token1Contract.balanceOf(address(this)) >= uBuyTokens, "insufficient contract funds");
        require(token1Contract.transfer(msg.sender, uBuyTokens), "transfer is not successful");
        iBUyToken += uBuyTokens;
        tokenSold = msg.value;
    }

    function endSale() external onlyAdmin {
        require(token1Contract.transfer(admin, token1Contract.balanceOf(address(this))), "no token remaining");
    }

    function destroySmartContract(address payable _to) external onlyAdmin {
        selfdestruct(_to);
    }
}