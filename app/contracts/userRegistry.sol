// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistry {
    // Structure to store user information
    struct User {
        string username;
        string image;
        string publicKey;
        string privateKey;
        uint256 id;
        address userAddress;
    }

    // Event to notify when a user is registered
    event UserRegistered(
        address indexed userAddress,
        string username,
        string image,
        string publicKey,
        string privateKey,
        uint256 id
    );

    // Mapping to store users by their address
    mapping(address => User) private users;
   
    // Array to store all users
    User[] private userList;

    // Function to register a new user
    function registerUser(
        string memory _username,
        string memory _image,
        string memory _publicKey,
        string memory _privateKey
    ) public {
        require(bytes(users[msg.sender].username).length == 0, "User already registered");
        uint256 newId = userList.length;
        User memory newUser = User({
            username: _username,
            image: _image,
            publicKey: _publicKey,
            privateKey: _privateKey,
            id: newId,
            userAddress: msg.sender
        });
        users[msg.sender] = newUser;
        userList.push(newUser);
        emit UserRegistered(msg.sender, _username, _image, _publicKey, _privateKey, newId);
    }

    // Function to get all users
    function getAllUsers() public view returns (User[] memory) {
        return userList;
    }

    // Function to get user by address
    function getUserByAdd(address _address) public view returns (User memory) {
        require(bytes(users[_address].username).length != 0, "User does not exist");
        return users[_address];
    }

    // Function to get the caller's user data
    function getUser() public view returns (
        string memory, string memory, string memory, string memory, uint256, address
    ) {
        User memory user = users[msg.sender];
        require(bytes(user.username).length != 0, "User not found");
        return (
            user.username,
            user.image,
            user.publicKey,
            user.privateKey,
            user.id,
            user.userAddress
        );
    }

    // Function to get user data by address
    function getUserData(address _address) public view returns (
        string memory, string memory, string memory, string memory, uint256, address
    ) {
        User memory user = users[_address];
        require(bytes(user.username).length != 0, "User not found");
        return (
            user.username,
            user.image,
            user.publicKey,
            user.privateKey,
            user.id,
            user.userAddress
        );
    }
}