// "use client";
// import { useRouter } from "next/router";
// import { createContext, useContext, useEffect, useState } from "react";
// import Web3 from "web3";

// const AccountContext = createContext();

// export const AccountProvider = ({ children }) => {
//   const contractAddress = "0xa53404Dd1b1E7b89b6e123b74423f233C2cB7e0b";
//   const contractABI = [
//     {
//       inputs: [
//         {
//           internalType: "string",
//           name: "_username",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "_image",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "_publicKey",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "_privateKey",
//           type: "string",
//         },
//       ],
//       name: "registerUser",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "userAddress",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "string",
//           name: "username",
//           type: "string",
//         },
//         {
//           indexed: false,
//           internalType: "string",
//           name: "image",
//           type: "string",
//         },
//         {
//           indexed: false,
//           internalType: "string",
//           name: "publicKey",
//           type: "string",
//         },
//         {
//           indexed: false,
//           internalType: "string",
//           name: "privateKey",
//           type: "string",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "id",
//           type: "uint256",
//         },
//       ],
//       name: "UserRegistered",
//       type: "event",
//     },
//     {
//       inputs: [],
//       name: "getAllUsers",
//       outputs: [
//         {
//           components: [
//             {
//               internalType: "string",
//               name: "username",
//               type: "string",
//             },
//             {
//               internalType: "string",
//               name: "image",
//               type: "string",
//             },
//             {
//               internalType: "string",
//               name: "publicKey",
//               type: "string",
//             },
//             {
//               internalType: "string",
//               name: "privateKey",
//               type: "string",
//             },
//             {
//               internalType: "uint256",
//               name: "id",
//               type: "uint256",
//             },
//             {
//               internalType: "address",
//               name: "userAddress",
//               type: "address",
//             },
//           ],
//           internalType: "struct UserRegistry.User[]",
//           name: "",
//           type: "tuple[]",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "getUser",
//       outputs: [
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "_address",
//           type: "address",
//         },
//       ],
//       name: "getUserByAdd",
//       outputs: [
//         {
//           components: [
//             {
//               internalType: "string",
//               name: "username",
//               type: "string",
//             },
//             {
//               internalType: "string",
//               name: "image",
//               type: "string",
//             },
//             {
//               internalType: "string",
//               name: "publicKey",
//               type: "string",
//             },
//             {
//               internalType: "string",
//               name: "privateKey",
//               type: "string",
//             },
//             {
//               internalType: "uint256",
//               name: "id",
//               type: "uint256",
//             },
//             {
//               internalType: "address",
//               name: "userAddress",
//               type: "address",
//             },
//           ],
//           internalType: "struct UserRegistry.User",
//           name: "",
//           type: "tuple",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "_address",
//           type: "address",
//         },
//       ],
//       name: "getUserData",
//       outputs: [
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//   ];
//   const followContractAddress = "0xAB3b6d77EC6E3411F45B9c0950bd76d63c545AF7";
//   const followContractABI = [
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "follower",
//           type: "address",
//         },
//       ],
//       name: "acceptFollowRequest",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "follower",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "followee",
//           type: "address",
//         },
//       ],
//       name: "AcceptFollowRequest",
//       type: "event",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "followee",
//           type: "address",
//         },
//       ],
//       name: "follow",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "follower",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "followee",
//           type: "address",
//         },
//       ],
//       name: "FollowRequest",
//       type: "event",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "followee",
//           type: "address",
//         },
//       ],
//       name: "unfollow",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "follower",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "address",
//           name: "followee",
//           type: "address",
//         },
//       ],
//       name: "Unfollow",
//       type: "event",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "user",
//           type: "address",
//         },
//       ],
//       name: "getFollowers",
//       outputs: [
//         {
//           internalType: "address[]",
//           name: "",
//           type: "address[]",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "user",
//           type: "address",
//         },
//       ],
//       name: "getFollowRequests",
//       outputs: [
//         {
//           internalType: "address[]",
//           name: "",
//           type: "address[]",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "follower",
//           type: "address",
//         },
//         {
//           internalType: "address",
//           name: "followee",
//           type: "address",
//         },
//       ],
//       name: "isFollowingUser",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//   ];

//   const postContractAddress = "0xA3439005Ee3E03f172f6E73B5157bBDdFEc2Da4D";
//   const postContractABI = [
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "creator",
//           type: "address",
//         },
//         {
//           indexed: true,
//           internalType: "uint256",
//           name: "postIndex",
//           type: "uint256",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "timestamp",
//           type: "uint256",
//         },
//       ],
//       name: "PostCreated",
//       type: "event",
//     },
//     {
//       inputs: [
//         {
//           internalType: "string",
//           name: "_userId",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "_postName",
//           type: "string",
//         },
//         {
//           internalType: "string",
//           name: "_cid",
//           type: "string",
//         },
//       ],
//       name: "createPost",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address[]",
//           name: "addresses",
//           type: "address[]",
//         },
//       ],
//       name: "getLatestPosts",
//       outputs: [
//         {
//           components: [
//             {
//               internalType: "string",
//               name: "userId",
//               type: "string",
//             },
//             {
//               internalType: "string",
//               name: "postName",
//               type: "string",
//             },
//             {
//               internalType: "string",
//               name: "cid",
//               type: "string",
//             },
//             {
//               internalType: "uint256",
//               name: "date",
//               type: "uint256",
//             },
//           ],
//           internalType: "struct PostContract.Post[]",
//           name: "",
//           type: "tuple[]",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "getUserPosts",
//       outputs: [
//         {
//           components: [
//             {
//               internalType: "string",
//               name: "userId",
//               type: "string",
//             },
//             {
//               internalType: "string",
//               name: "postName",
//               type: "string",
//             },
//             {
//               internalType: "string",
//               name: "cid",
//               type: "string",
//             },
//             {
//               internalType: "uint256",
//               name: "date",
//               type: "uint256",
//             },
//           ],
//           internalType: "struct PostContract.Post[]",
//           name: "",
//           type: "tuple[]",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//   ];

//   // const contractAddress = '0x5b1CFA23764a29458559216E48F0afe6E2C51E7A';
//   // const contractABI = [
//   //     {
//   //         "anonymous": false,
//   //         "inputs": [
//   //             {
//   //                 "indexed": true,
//   //                 "internalType": "address",
//   //                 "name": "userAddress",
//   //                 "type": "address"
//   //             },
//   //             {
//   //                 "indexed": false,
//   //                 "internalType": "string",
//   //                 "name": "username",
//   //                 "type": "string"
//   //             },
//   //             {
//   //                 "indexed": false,
//   //                 "internalType": "string",
//   //                 "name": "image",
//   //                 "type": "string"
//   //             },
//   //             {
//   //                 "indexed": false,
//   //                 "internalType": "string",
//   //                 "name": "publicKey",
//   //                 "type": "string"
//   //             },
//   //             {
//   //                 "indexed": false,
//   //                 "internalType": "string",
//   //                 "name": "privateKey",
//   //                 "type": "string"
//   //             },
//   //             {
//   //                 "indexed": false,
//   //                 "internalType": "uint256",
//   //                 "name": "id",
//   //                 "type": "uint256"
//   //             }
//   //         ],
//   //         "name": "UserRegistered",
//   //         "type": "event"
//   //     },
//   //     {
//   //         "inputs": [],
//   //         "name": "getAllUsers",
//   //         "outputs": [
//   //             {
//   //                 "components": [
//   //                     {
//   //                         "internalType": "string",
//   //                         "name": "username",
//   //                         "type": "string"
//   //                     },
//   //                     {
//   //                         "internalType": "string",
//   //                         "name": "image",
//   //                         "type": "string"
//   //                     },
//   //                     {
//   //                         "internalType": "string",
//   //                         "name": "publicKey",
//   //                         "type": "string"
//   //                     },
//   //                     {
//   //                         "internalType": "string",
//   //                         "name": "privateKey",
//   //                         "type": "string"
//   //                     },
//   //                     {
//   //                         "internalType": "uint256",
//   //                         "name": "id",
//   //                         "type": "uint256"
//   //                     },
//   //                     {
//   //                         "internalType": "address",
//   //                         "name": "userAddress",
//   //                         "type": "address"
//   //                     }
//   //                 ],
//   //                 "internalType": "struct Userregistry.User[]",
//   //                 "name": "",
//   //                 "type": "tuple[]"
//   //             }
//   //         ],
//   //         "stateMutability": "view",
//   //         "type": "function"
//   //     },
//   //     {
//   //         "inputs": [],
//   //         "name": "getAllusers",
//   //         "outputs": [
//   //             {
//   //                 "components": [
//   //                     {
//   //                         "internalType": "string",
//   //                         "name": "username",
//   //                         "type": "string"
//   //                     },
//   //                     {
//   //                         "internalType": "string",
//   //                         "name": "image",
//   //                         "type": "string"
//   //                     },
//   //                     {
//   //                         "internalType": "string",
//   //                         "name": "publicKey",
//   //                         "type": "string"
//   //                     },
//   //                     {
//   //                         "internalType": "string",
//   //                         "name": "privateKey",
//   //                         "type": "string"
//   //                     },
//   //                     {
//   //                         "internalType": "uint256",
//   //                         "name": "id",
//   //                         "type": "uint256"
//   //                     },
//   //                     {
//   //                         "internalType": "address",
//   //                         "name": "userAddress",
//   //                         "type": "address"
//   //                     }
//   //                 ],
//   //                 "internalType": "struct Userregistry.User[]",
//   //                 "name": "",
//   //                 "type": "tuple[]"
//   //             }
//   //         ],
//   //         "stateMutability": "view",
//   //         "type": "function"
//   //     },
//   //     {
//   //         "inputs": [],
//   //         "name": "getUser",
//   //         "outputs": [
//   //             {
//   //                 "internalType": "string",
//   //                 "name": "",
//   //                 "type": "string"
//   //             },
//   //             {
//   //                 "internalType": "string",
//   //                 "name": "",
//   //                 "type": "string"
//   //             },
//   //             {
//   //                 "internalType": "string",
//   //                 "name": "",
//   //                 "type": "string"
//   //             },
//   //             {
//   //                 "internalType": "string",
//   //                 "name": "",
//   //                 "type": "string"
//   //             },
//   //             {
//   //                 "internalType": "uint256",
//   //                 "name": "",
//   //                 "type": "uint256"
//   //             },
//   //             {
//   //                 "internalType": "address",
//   //                 "name": "",
//   //                 "type": "address"
//   //             }
//   //         ],
//   //         "stateMutability": "view",
//   //         "type": "function"
//   //     },
//   //     {
//   //         "inputs": [
//   //             {
//   //                 "internalType": "address",
//   //                 "name": "_address",
//   //                 "type": "address"
//   //             }
//   //         ],
//   //         "name": "getUserByAdd",
//   //         "outputs": [
//   //             {
//   //                 "components": [
//   //                     {
//   //                         "internalType": "string",
//   //                         "name": "username",
//   //                         "type": "string"
//   //                     },
//   //                     {
//   //                         "internalType": "string",
//   //                         "name": "image",
//   //                         "type": "string"
//   //                     },
//   //                     {
//   //                         "internalType": "string",
//   //                         "name": "publicKey",
//   //                         "type": "string"
//   //                     },
//   //                     {
//   //                         "internalType": "string",
//   //                         "name": "privateKey",
//   //                         "type": "string"
//   //                     },
//   //                     {
//   //                         "internalType": "uint256",
//   //                         "name": "id",
//   //                         "type": "uint256"
//   //                     },
//   //                     {
//   //                         "internalType": "address",
//   //                         "name": "userAddress",
//   //                         "type": "address"
//   //                     }
//   //                 ],
//   //                 "internalType": "struct Userregistry.User",
//   //                 "name": "",
//   //                 "type": "tuple"
//   //             }
//   //         ],
//   //         "stateMutability": "view",
//   //         "type": "function"
//   //     },
//   //     {
//   //         "inputs": [
//   //             {
//   //                 "internalType": "address",
//   //                 "name": "_address",
//   //                 "type": "address"
//   //             }
//   //         ],
//   //         "name": "getUserByAddress",
//   //         "outputs": [
//   //             {
//   //                 "internalType": "string",
//   //                 "name": "",
//   //                 "type": "string"
//   //             },
//   //             {
//   //                 "internalType": "string",
//   //                 "name": "",
//   //                 "type": "string"
//   //             },
//   //             {
//   //                 "internalType": "string",
//   //                 "name": "",
//   //                 "type": "string"
//   //             },
//   //             {
//   //                 "internalType": "string",
//   //                 "name": "",
//   //                 "type": "string"
//   //             },
//   //             {
//   //                 "internalType": "uint256",
//   //                 "name": "",
//   //                 "type": "uint256"
//   //             }
//   //         ],
//   //         "stateMutability": "view",
//   //         "type": "function"
//   //     },
//   //     {
//   //         "inputs": [
//   //             {
//   //                 "internalType": "address",
//   //                 "name": "_address",
//   //                 "type": "address"
//   //             }
//   //         ],
//   //         "name": "getUserData",
//   //         "outputs": [
//   //             {
//   //                 "internalType": "string",
//   //                 "name": "",
//   //                 "type": "string"
//   //             },
//   //             {
//   //                 "internalType": "string",
//   //                 "name": "",
//   //                 "type": "string"
//   //             },
//   //             {
//   //                 "internalType": "string",
//   //                 "name": "",
//   //                 "type": "string"
//   //             },
//   //             {
//   //                 "internalType": "string",
//   //                 "name": "",
//   //                 "type": "string"
//   //             },
//   //             {
//   //                 "internalType": "uint256",
//   //                 "name": "",
//   //                 "type": "uint256"
//   //             },
//   //             {
//   //                 "internalType": "address",
//   //                 "name": "",
//   //                 "type": "address"
//   //             }
//   //         ],
//   //         "stateMutability": "view",
//   //         "type": "function"
//   //     },
//   //     {
//   //         "inputs": [
//   //             {
//   //                 "internalType": "string",
//   //                 "name": "_username",
//   //                 "type": "string"
//   //             },
//   //             {
//   //                 "internalType": "string",
//   //                 "name": "_image",
//   //                 "type": "string"
//   //             },
//   //             {
//   //                 "internalType": "string",
//   //                 "name": "_publicKey",
//   //                 "type": "string"
//   //             },
//   //             {
//   //                 "internalType": "string",
//   //                 "name": "_privateKey",
//   //                 "type": "string"
//   //             }
//   //         ],
//   //         "name": "registerUser",
//   //         "outputs": [],
//   //         "stateMutability": "nonpayable",
//   //         "type": "function"
//   //     }
//   // ]

//   //   const followContractAddress = "0xE5eB40eE2EABd73591c395f363Ad911e4346c5fb";
//   //   const followContractABI = [
//   //     {
//   //       inputs: [
//   //         {
//   //           internalType: "address",
//   //           name: "follower",
//   //           type: "address",
//   //         },
//   //       ],
//   //       name: "acceptFollowRequest",
//   //       outputs: [],
//   //       stateMutability: "nonpayable",
//   //       type: "function",
//   //     },
//   //     {
//   //       anonymous: false,
//   //       inputs: [
//   //         {
//   //           indexed: true,
//   //           internalType: "address",
//   //           name: "follower",
//   //           type: "address",
//   //         },
//   //         {
//   //           indexed: true,
//   //           internalType: "address",
//   //           name: "followee",
//   //           type: "address",
//   //         },
//   //       ],
//   //       name: "AcceptFollowRequest",
//   //       type: "event",
//   //     },
//   //     {
//   //       inputs: [
//   //         {
//   //           internalType: "address",
//   //           name: "followee",
//   //           type: "address",
//   //         },
//   //       ],
//   //       name: "follow",
//   //       outputs: [],
//   //       stateMutability: "nonpayable",
//   //       type: "function",
//   //     },
//   //     {
//   //       anonymous: false,
//   //       inputs: [
//   //         {
//   //           indexed: true,
//   //           internalType: "address",
//   //           name: "follower",
//   //           type: "address",
//   //         },
//   //         {
//   //           indexed: true,
//   //           internalType: "address",
//   //           name: "followee",
//   //           type: "address",
//   //         },
//   //       ],
//   //       name: "FollowRequest",
//   //       type: "event",
//   //     },
//   //     {
//   //       inputs: [
//   //         {
//   //           internalType: "address",
//   //           name: "followee",
//   //           type: "address",
//   //         },
//   //       ],
//   //       name: "unfollow",
//   //       outputs: [],
//   //       stateMutability: "nonpayable",
//   //       type: "function",
//   //     },
//   //     {
//   //       anonymous: false,
//   //       inputs: [
//   //         {
//   //           indexed: true,
//   //           internalType: "address",
//   //           name: "follower",
//   //           type: "address",
//   //         },
//   //         {
//   //           indexed: true,
//   //           internalType: "address",
//   //           name: "followee",
//   //           type: "address",
//   //         },
//   //       ],
//   //       name: "Unfollow",
//   //       type: "event",
//   //     },
//   //     {
//   //       inputs: [
//   //         {
//   //           internalType: "address",
//   //           name: "user",
//   //           type: "address",
//   //         },
//   //       ],
//   //       name: "getFollowers",
//   //       outputs: [
//   //         {
//   //           internalType: "address[]",
//   //           name: "",
//   //           type: "address[]",
//   //         },
//   //       ],
//   //       stateMutability: "view",
//   //       type: "function",
//   //     },
//   //     {
//   //       inputs: [
//   //         {
//   //           internalType: "address",
//   //           name: "user",
//   //           type: "address",
//   //         },
//   //       ],
//   //       name: "getFollowRequests",
//   //       outputs: [
//   //         {
//   //           internalType: "address[]",
//   //           name: "",
//   //           type: "address[]",
//   //         },
//   //       ],
//   //       stateMutability: "view",
//   //       type: "function",
//   //     },
//   //     {
//   //       inputs: [
//   //         {
//   //           internalType: "address",
//   //           name: "follower",
//   //           type: "address",
//   //         },
//   //         {
//   //           internalType: "address",
//   //           name: "followee",
//   //           type: "address",
//   //         },
//   //       ],
//   //       name: "isFollowingUser",
//   //       outputs: [
//   //         {
//   //           internalType: "bool",
//   //           name: "",
//   //           type: "bool",
//   //         },
//   //       ],
//   //       stateMutability: "view",
//   //       type: "function",
//   //     },
//   //   ];

//   //   const postContractAddress = "0x9C330c7E51d1219e9b97424C834F347e15144485";
//   //   const postContractABI = [
//   //     {
//   //       anonymous: false,
//   //       inputs: [
//   //         {
//   //           indexed: false,
//   //           internalType: "uint256",
//   //           name: "userId",
//   //           type: "uint256",
//   //         },
//   //         {
//   //           indexed: false,
//   //           internalType: "string",
//   //           name: "postName",
//   //           type: "string",
//   //         },
//   //         {
//   //           indexed: false,
//   //           internalType: "string",
//   //           name: "cid",
//   //           type: "string",
//   //         },
//   //         {
//   //           indexed: false,
//   //           internalType: "uint256",
//   //           name: "date",
//   //           type: "uint256",
//   //         },
//   //       ],
//   //       name: "PostCreated",
//   //       type: "event",
//   //     },
//   //     {
//   //       inputs: [
//   //         {
//   //           internalType: "uint256",
//   //           name: "_userId",
//   //           type: "uint256",
//   //         },
//   //         {
//   //           internalType: "string",
//   //           name: "_postName",
//   //           type: "string",
//   //         },
//   //         {
//   //           internalType: "string",
//   //           name: "_cid",
//   //           type: "string",
//   //         },
//   //       ],
//   //       name: "createPost",
//   //       outputs: [],
//   //       stateMutability: "nonpayable",
//   //       type: "function",
//   //     },
//   //     {
//   //       inputs: [
//   //         {
//   //           internalType: "uint256",
//   //           name: "userId",
//   //           type: "uint256",
//   //         },
//   //       ],
//   //       name: "getLatestPostsForUser",
//   //       outputs: [
//   //         {
//   //           components: [
//   //             {
//   //               internalType: "uint256",
//   //               name: "userId",
//   //               type: "uint256",
//   //             },
//   //             {
//   //               internalType: "string",
//   //               name: "postName",
//   //               type: "string",
//   //             },
//   //             {
//   //               internalType: "string",
//   //               name: "cid",
//   //               type: "string",
//   //             },
//   //             {
//   //               internalType: "uint256",
//   //               name: "date",
//   //               type: "uint256",
//   //             },
//   //           ],
//   //           internalType: "struct PostContractC.Post[]",
//   //           name: "",
//   //           type: "tuple[]",
//   //         },
//   //       ],
//   //       stateMutability: "view",
//   //       type: "function",
//   //     },
//   //     {
//   //       inputs: [],
//   //       name: "getUserPosts",
//   //       outputs: [
//   //         {
//   //           components: [
//   //             {
//   //               internalType: "uint256",
//   //               name: "userId",
//   //               type: "uint256",
//   //             },
//   //             {
//   //               internalType: "string",
//   //               name: "postName",
//   //               type: "string",
//   //             },
//   //             {
//   //               internalType: "string",
//   //               name: "cid",
//   //               type: "string",
//   //             },
//   //             {
//   //               internalType: "uint256",
//   //               name: "date",
//   //               type: "uint256",
//   //             },
//   //           ],
//   //           internalType: "struct PostContractC.Post[]",
//   //           name: "",
//   //           type: "tuple[]",
//   //         },
//   //       ],
//   //       stateMutability: "view",
//   //       type: "function",
//   //     },
//   //   ];

//   const [web3, setWeb3] = useState(null);
//   const [userRegistry, setUserRegistry] = useState(null);
//   const [userInter, setUserInter] = useState(null);
//   const [postContract, setPostContract] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const authUser = (user) => {
//       if (user.id) {
//         window.localStorage.setItem("privateKey", user.privateKey);
//         window.localStorage.setItem("publicKey", user.publicKey);
//         window.localStorage.setItem("username", user.username);
//         window.localStorage.setItem("image", user.image);
//         window.localStorage.setItem("id", user.id);

//         router.push("/");
//       } else {
//         router.push("/account/register");
//       }
//     };

//     const connectToMetamask = async () => {
//       try {
//         // Check if Metamask is installed
//         if (typeof window.ethereum === "undefined") {
//           throw new Error("Metamask is not installed.");
//         }
//         // Connect to Metamask and get the selected account
//         await window.ethereum.request({ method: "eth_requestAccounts" });
//         const selectedAddress = window.ethereum.selectedAddress;
//         if (!selectedAddress) {
//           throw new Error("Metamask is not connected to any account.");
//         }

//         // Initialize Web3 with the current provider
//         const web3Instance = new Web3(window.ethereum);
//         const userContract = new web3Instance.eth.Contract(
//           contractABI,
//           contractAddress
//         );
//         const followContract = new web3Instance.eth.Contract(
//           followContractABI,
//           followContractAddress
//         );
//         const postContract = new web3Instance.eth.Contract(
//           postContractABI,
//           postContractAddress
//         );

//         setWeb3(web3Instance);
//         setUserRegistry(userContract);
//         setUserInter(followContract);
//         setPostContract(postContract);
//         const user = await userContract.methods
//           .getUserByAdd(selectedAddress)
//           .call();
//         authUser(user);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     connectToMetamask();
//   }, []);
//   return (
//     <AccountContext.Provider
//       value={{
//         web3,
//         setWeb3,
//         userRegistry,
//         setUserRegistry,
//         contractAddress,
//         contractABI,
//         followContractAddress,
//         followContractABI,
//         userInter,
//         setUserInter,
//         postContract,
//         setPostContract,
//         postContractAddress,
//         postContractABI,
//       }}
//     >
//       {children}
//     </AccountContext.Provider>
//   );
// };

// export const useAccountContext = () => useContext(AccountContext);


"use client";
import { useRouter } from "next/navigation"; // Changed from next/router
import { createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [userRegistry, setUserRegistry] = useState(null);
  const [userInter, setUserInter] = useState(null);
  const [postContract, setPostContract] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  const contractAddress = "0x7D0D738F99AB89165a308Fb6D529b91a21c83034";
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
          "internalType": "struct UserRegistry.User[]",
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
          "internalType": "struct UserRegistry.User",
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
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "userExists",
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
  const followContractAddress = "0xf88101d823E4bc3358e5f3B9541DE43C311d637a";
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
  ];

  const postContractAddress = "0x84cec9F9235215ff01321A5A509E0Af0bd096D26";
  const postContractABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_userId",
          "type": "string"
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
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "postIndex",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "PostCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "addresses",
          "type": "address[]"
        }
      ],
      "name": "getLatestPosts",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "userId",
              "type": "string"
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
              "internalType": "string",
              "name": "userId",
              "type": "string"
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
  ];

  const authUser = async (userContract, address) => {
    const userExist = await userContract.methods?.userExists(address)?.call()
    console.log('userExist: ', userExist);
    if (userExist) {
      console.log(userExist)
      const user = await userContract.methods
        .getUserByAdd(address)
        .call();
        console.log(user)
      window.localStorage.setItem('privateKey', user.privateKey)
      window.localStorage.setItem('publicKey', user.publicKey)
      window.localStorage.setItem('username', user.username)
      window.localStorage.setItem('image', user.image)
      window.localStorage.setItem('id', user.id)

      router.push('/')
    } else {
      router.push("/account/register")
    }

  }

  const connectToMetamask = async () => {
    try {
      if (typeof window.ethereum === "undefined") {
        throw new Error("Metamask is not installed.");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const selectedAddress = window.ethereum.selectedAddress;

      if (!selectedAddress) {
        throw new Error("Metamask is not connected to any account.");
      }

      const web3Instance = new Web3(window.ethereum);
      const userContract = new web3Instance.eth.Contract(
        contractABI,
        contractAddress
      );
      const followContract = new web3Instance.eth.Contract(
        followContractABI,
        followContractAddress
      );
      const postContract = new web3Instance.eth.Contract(
        postContractABI,
        postContractAddress
      );

      setWeb3(web3Instance);
      setUserRegistry(userContract);
      setUserInter(followContract);
      setPostContract(postContract);

      await authUser(userContract, selectedAddress)

    } catch (error) {
      console.log("Metamask connection error:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!isInitialized) {
      const init = async () => {
        const user = await connectToMetamask();
        if (user) {
          await authUser(user);
        }
        setIsInitialized(true);
      };

      init();
    }
  }, [isInitialized]);

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
        postContractABI,
        connectToMetamask
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => useContext(AccountContext);