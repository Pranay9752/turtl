// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PostContract {
    struct Post {
        string userId;
        string postName;
        string cid;
        uint256 date;
    }

    // Mapping to store total post count per user address
    mapping(address => uint256) private _totalPosts;
    // Mapping to store posts by user address and post index
    mapping(address => mapping(uint256 => Post)) private _userPosts;

    // Event to track post creation
    event PostCreated(
        address indexed creator,
        uint256 indexed postIndex,
        uint256 timestamp
    );

    // Function to create a new post
    function createPost(
        string calldata _userId,
        string calldata _postName,
        string calldata _cid
    ) external {
        uint256 newIndex = ++_totalPosts[msg.sender];
        _userPosts[msg.sender][newIndex] = Post({
            userId: _userId,
            postName: _postName,
            cid: _cid,
            date: block.timestamp
        });
        emit PostCreated(msg.sender, newIndex, block.timestamp);
    }

    // Function to retrieve all posts by the calling user
    function getUserPosts() external view returns (Post[] memory) {
        uint256 total = _totalPosts[msg.sender];
        Post[] memory result = new Post[](total);

        for (uint256 i = 1; i <= total; i++) {
            result[i - 1] = _userPosts[msg.sender][i];
        }

        return result;
    }

    // Function to retrieve the latest posts from a list of addresses within the last 3 days
    function getLatestPosts(address[] calldata addresses)
        external
        view
        returns (Post[] memory)
    {
        uint256 totalCount = 0;
        uint256 timeLimit = block.timestamp - 3 days;

        // First pass: Count valid posts within the time window
        for (uint256 i = 0; i < addresses.length; i++) {
            uint256 userTotal = _totalPosts[addresses[i]];
            for (uint256 j = 1; j <= userTotal; j++) {
                if (_userPosts[addresses[i]][j].date >= timeLimit) {
                    totalCount++;
                }
            }
        }

        // Initialize result array with known size
        Post[] memory result = new Post[](totalCount);
        uint256 currentIndex = 0;

        // Second pass: Collect valid posts
        for (uint256 i = 0; i < addresses.length; i++) {
            uint256 userTotal = _totalPosts[addresses[i]];
            for (uint256 j = 1; j <= userTotal; j++) {
                if (_userPosts[addresses[i]][j].date >= timeLimit) {
                    result[currentIndex++] = _userPosts[addresses[i]][j];
                }
            }
        }

        // Sort the result array by post date in descending order
        if (result.length > 1) {
            quickSortByDate(result, 0, int256(result.length - 1));
        }

        return result;
    }

    // Internal function to sort posts by date using QuickSort algorithm
    function quickSortByDate(
        Post[] memory _posts,
        int256 left,
        int256 right
    ) internal pure {
        if (left >= right) return;

        int256 i = left;
        int256 j = right;
        uint256 pivot = _posts[uint256(left + (right - left) / 2)].date;

        while (i <= j) {
            while (_posts[uint256(i)].date > pivot) i++;
            while (_posts[uint256(j)].date < pivot) j--;
            if (i <= j) {
                Post memory temp = _posts[uint256(i)];
                _posts[uint256(i)] = _posts[uint256(j)];
                _posts[uint256(j)] = temp;
                i++;
                j--;
            }
        }

        if (left < j) quickSortByDate(_posts, left, j);
        if (i < right) quickSortByDate(_posts, i, right);
    }
}
