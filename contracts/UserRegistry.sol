// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Userregistry {
    struct User {
        string username;
        string image;
        string publicKey;
        uint id;
    }

    mapping(address => User) private users;
    mapping(address => bool) private registeredAddresses;
    uint private nextId = 1;

    event UserRegistered(address indexed userAddress, string username, string image, string publicKey, uint id);

    function registerUser(string memory _username, string memory _image, string memory _publicKey) public {
        require(!registeredAddresses[msg.sender], "User already exists");
        users[msg.sender] = User(_username, _image, _publicKey, nextId);
        registeredAddresses[msg.sender] = true;
        emit UserRegistered(msg.sender, _username, _image, _publicKey, nextId);
        nextId++;
    }

    function getUserByAddress(address _address) public view returns (string memory, string memory, string memory, uint) {
        User memory user = users[_address];
        require(user.id != 0, "User does not exist");
        return (user.username, user.image, user.publicKey, user.id);
    }


    function getUserByAdd(address _address) public view returns (User memory) {
        User memory user = users[_address];
        if (bytes(user.username).length > 0) {
            return users[_address];
        } else {
            return User("", "", "", 0);
        }
    }

    function getUserData(address _address) public view returns (string memory, string memory, string memory, uint) {
        User memory user = users[_address];
        if (user.id != 0) {
            return (user.username, user.image, user.publicKey, user.id);
        } else {
            return ("", "", "", 0);
        }
    }

    function getUser() public view returns (string memory, string memory, string memory, uint) {
        User memory user = users[msg.sender];
        require(user.id != 0, "User does not exist");
        return (user.username, user.image, user.publicKey, user.id);
    }
}
