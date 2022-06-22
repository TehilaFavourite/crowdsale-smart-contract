// SPDX-License-Identifier: MIT


pragma solidity ^0.8.7;

contract token1 {
    address public owner;
    string  public name;
    string  public symbol;
    string  public standard;
    uint256 public totalSupply;
    uint256 public decimals;

    constructor () {
        name = "FavToken";
        symbol = "FAV";
        standard = "V1.0";
        totalSupply = 20000000 * (10 ** 18);
        decimals = 18;
        owner = msg.sender;
        balanceOf[owner] = totalSupply;
        
    }

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;



    
    function transfer(address _to, uint256 _value) public  returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "insufficient balance");

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from], "Insufficient balance");
        require(_value <= allowance[_from][msg.sender], "insufficient balance");

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }
}