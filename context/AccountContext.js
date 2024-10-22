
import { createContext, useEffect, useState } from "react";
import Web3 from 'web3';
import { useRouter } from 'next/router';

export const AccountContext = createContext()

export const AccountProvider = ({ children }) => {

    const contractAddress = '0x26b2c35B33fe234762DBfB84268518DBcC54E47f';
    const contractABI = [
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
        },
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
        }
    ]
    const followContractAddress = '0xe70fC2A9a7Bac1E92C17D16e5919F241ACB2F53e'
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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [web3, setWeb3] = useState(null);
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [image, setImage] = useState('');
    const [user, setUser] = useState(null);
    const [userRegistry, setUserRegistry] = useState(null);
    const [userInter, setUserInter] = useState(null);

    const router = useRouter();
    useEffect(() => {
        
        if (web3===null || address===null) {
            router.push('/wallet');
        }
      }, [web3, address, router]);
    

      


    return (
        <AccountContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                web3,
                setWeb3,
                address,
                setAddress,
                username,
                setUsername,
                image,
                setImage,
                user,
                setUser,
                userRegistry,
                setUserRegistry,
                contractAddress,
                contractABI,
                followContractAddress,
                followContractABI,
                userInter,
                setUserInter
            }}
        >
            {children}
        </AccountContext.Provider>
    )
}