'use client'
import { createContext, useContext, useState } from 'react';

const AccountContext = createContext()

export const AccountProvider = ({ children }) => {

    const contractAddress = '0x5b1CFA23764a29458559216E48F0afe6E2C51E7A';
    const contractABI = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "username",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "image",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "publicKey",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "privateKey",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "UserRegistered",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "getAllUsers",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "username",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "image",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "publicKey",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "privateKey",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "userAddress",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct Userregistry.User[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getAllusers",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "username",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "image",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "publicKey",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "privateKey",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "userAddress",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct Userregistry.User[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getUser",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "getUserByAdd",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "username",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "image",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "publicKey",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "privateKey",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "userAddress",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct Userregistry.User",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "getUserByAddress",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "getUserData",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_username",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_image",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_publicKey",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_privateKey",
                    "type": "string"
                }
            ],
            "name": "registerUser",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
    const followContractAddress = '0xE5eB40eE2EABd73591c395f363Ad911e4346c5fb'
    const followContractABI = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "follower",
                    "type": "address"
                }
            ],
            "name": "acceptFollowRequest",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "follower",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "followee",
                    "type": "address"
                }
            ],
            "name": "AcceptFollowRequest",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "followee",
                    "type": "address"
                }
            ],
            "name": "follow",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "follower",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "followee",
                    "type": "address"
                }
            ],
            "name": "FollowRequest",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "followee",
                    "type": "address"
                }
            ],
            "name": "unfollow",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "follower",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "followee",
                    "type": "address"
                }
            ],
            "name": "Unfollow",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                }
            ],
            "name": "getFollowers",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                }
            ],
            "name": "getFollowRequests",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "follower",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "followee",
                    "type": "address"
                }
            ],
            "name": "isFollowingUser",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]

    const postContractAddress = "0x9C330c7E51d1219e9b97424C834F347e15144485"
    const postContractABI = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "userId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "postName",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "cid",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "date",
                    "type": "uint256"
                }
            ],
            "name": "PostCreated",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_userId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_postName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_cid",
                    "type": "string"
                }
            ],
            "name": "createPost",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "userId",
                    "type": "uint256"
                }
            ],
            "name": "getLatestPostsForUser",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "userId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "postName",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "cid",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "date",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct PostContractC.Post[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getUserPosts",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "userId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "postName",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "cid",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "date",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct PostContractC.Post[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]

    const [web3, setWeb3] = useState(null);
    const [userRegistry, setUserRegistry] = useState(null);
    const [userInter, setUserInter] = useState(null);
    const [postContract, setPostContract] = useState(null);

    return (
        <AccountContext.Provider
            value={{
                web3,
                setWeb3,
                userRegistry,
                setUserRegistry,
                contractAddress,
                contractABI,
                followContractAddress,
                followContractABI,
                userInter,
                setUserInter,
                postContract,
                setPostContract,
                postContractAddress,
                postContractABI
            }}
        >
            {children}
        </AccountContext.Provider>
    )
}

export const useAccountContext = () => useContext(AccountContext)