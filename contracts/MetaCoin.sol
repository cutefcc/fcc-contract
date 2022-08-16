// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MetaCoin is ERC20 {
    string public constant NAME = "ChecheERC20Token";
    string public constant SYMBOL = "CHECHE"; // cheche token
    uint256 public constant INITIAL_SUPPLY = 10000; // 10,000 cheche tokens

    constructor() ERC20(NAME, SYMBOL) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }
}
