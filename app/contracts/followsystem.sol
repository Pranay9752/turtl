// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FollowSystem {

    // Events
    event FollowRequest(address indexed follower, address indexed followee);
    event AcceptFollowRequest(address indexed follower, address indexed followee);
    event Unfollow(address indexed follower, address indexed followee);

    // Mappings to store follow relationships and requests
    mapping(address => address[]) private followers;
    mapping(address => address[]) private followRequests;
    mapping(address => mapping(address => bool)) private isFollowing;

    // Function to send a follow request
    function follow(address followee) public {
        require(msg.sender != followee, "You cannot follow yourself");
        require(!isFollowing[msg.sender][followee], "Already following this user");

        followRequests[followee].push(msg.sender);
        emit FollowRequest(msg.sender, followee);
    }

    // Function to accept a follow request
    function acceptFollowRequest(address follower) public {
        require(!isFollowing[follower][msg.sender], "Already following");

        // Remove follower from followRequests
        address[] storage requests = followRequests[msg.sender];
        bool found = false;
        for (uint256 i = 0; i < requests.length; i++) {
            if (requests[i] == follower) {
                requests[i] = requests[requests.length - 1];
                requests.pop();
                found = true;
                break;
            }
        }
        require(found, "Follow request not found");

        // Add to followers list
        followers[msg.sender].push(follower);
        isFollowing[follower][msg.sender] = true;

        emit AcceptFollowRequest(follower, msg.sender);
    }

    // Function to unfollow a user
    function unfollow(address followee) public {
        require(isFollowing[msg.sender][followee], "Not following this user");

        // Remove followee from the follower's list
        address[] storage followingList = followers[followee];
        for (uint256 i = 0; i < followingList.length; i++) {
            if (followingList[i] == msg.sender) {
                followingList[i] = followingList[followingList.length - 1];
                followingList.pop();
                break;
            }
        }

        isFollowing[msg.sender][followee] = false;
        emit Unfollow(msg.sender, followee);
    }

    // Function to get the followers of a user
    function getFollowers(address user) public view returns (address[] memory) {
        return followers[user];
    }

    // Function to get follow requests for a user
    function getFollowRequests(address user) public view returns (address[] memory) {
        return followRequests[user];
    }

    // Function to check if a user is following another user
    function isFollowingUser(address follower, address followee) public view returns (bool) {
        return isFollowing[follower][followee];
    }
}
