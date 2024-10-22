
import { createContext, useEffect, useState } from "react";
import Web3 from 'web3';
import { useRouter } from 'next/router';

export const PostContext = createContext()

export const PostProvider = ({ children }) => {

    const postContractAddress = '0xE799a874E3b29C40D69Fe73B917Dff7FC36F66bd';
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
                    "internalType": "struct PostContract.Post[]",
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
                    "internalType": "struct PostContract.Post[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    const postContractCAddress = "0xBC690A00Aad131e2a17959b0D14b5DcA6600f0c8"
    const postContractCABI = [
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
                    "name": "_caption",
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
                    "name": "caption",
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
                            "name": "caption",
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
                            "name": "caption",
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
    const [postContract, setPostContract] = useState(null);
    const [postcContract, setPostcContract] = useState(null);
    
    const router = useRouter();

        

      


    return (
        <PostContext.Provider
            value={{
                postContractABI,
                postContractAddress,
                setPostContract,
                postContract,
                postContractCABI,
                postContractCAddress,
                setPostcContract,
                postcContract,
            }}
        >
            {children}
        </PostContext.Provider>
    )
}