// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract InfoContract {
    string name;
    uint256 age;

    event Instructor(string name, uint256 age);

    function setInfo(string memory _name, uint256 _age) public {
        name = _name;
        age = _age;
        emit Instructor(name, age);
    }

    function getInfo() public view returns (string memory, uint256) {
        return (name, age);
    }

    function setHi() public pure returns (string memory) {
        return "Hi";
    }
}
