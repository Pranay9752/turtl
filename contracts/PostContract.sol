 // SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract PostContract {
    struct Post {
        string userId;
        string postName;
        string cid;
        uint date;
    }

    mapping(address => uint) private _totalPosts;
    mapping(address => mapping(uint => Post)) private _userPosts;

    function createPost(string memory _userId, string memory _postName, string memory _cid) public {
        _totalPosts[msg.sender]++;
        uint total = _totalPosts[msg.sender];
        _userPosts[msg.sender][total] = Post(_userId, _postName, _cid, block.timestamp);
    }

    function getUserPosts() public view returns(Post[] memory) {
        uint total = _totalPosts[msg.sender];
        Post[] memory result = new Post[](total);
        for (uint i = 1; i <= total; i++) {
            result[i - 1] = _userPosts[msg.sender][i];
        }
        return result;
    }

    function getLatestPosts(address[] memory addresses) public view returns(Post[] memory) {
        uint totalCount;
        for (uint i = 0; i < addresses.length; i++) {
            totalCount += _totalPosts[addresses[i]];
        }

        Post[] memory result = new Post[](totalCount);
        uint currentIndex = 0;

        for (uint i = 0; i < addresses.length; i++) {
            uint userTotal = _totalPosts[addresses[i]];
            for (uint j = userTotal; j >= 1; j--) {
                uint postDate = _userPosts[addresses[i]][j].date;
                if (block.timestamp - postDate <= 3 days) {
                    result[currentIndex] = _userPosts[addresses[i]][j];
                    currentIndex++;
                }
            }
        }

        sortByDate(result, 0, int(result.length - 1));
        return result;
    }

    function sortByDate(Post[] memory _posts, int left, int right) internal pure {
        int i = left;
        int j = right;
        if (i == j) return;
        uint pivot = _posts[uint(left + (right - left) / 2)].date;
        while (i <= j) {
            while (_posts[uint(i)].date > pivot) i++;
            while (pivot > _posts[uint(j)].date) j--;
            if (i <= j) {
                Post memory temp = _posts[uint(i)];
                _posts[uint(i)] = _posts[uint(j)];
                _posts[uint(j)] = temp;
                i++;
                j--;
            }
        }
        if (left < j) sortByDate(_posts, left, j);
        if (i < right) sortByDate(_posts, i, right);
    }
}