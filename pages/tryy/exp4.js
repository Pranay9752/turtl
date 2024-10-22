import { useContext, useEffect, useState } from "react";
import crypto from 'crypto';
import { AccountContext } from "@/context/AccountContext";
import generateBinaryTree from "./tree";
const user1 = { publicKey: "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA2kAR2mxkeOXBqKW5KQsc5ujunzY5/3dGi+8Rzvtmz4Bs9O+qT20b/6gMZA0Z9c7kTi5HmBJNnS439FS1lqNEjn53AerhI/zPMu888/Tbw7kkmBU/qCRQVFhaoflOdsy4s/E42FWxx7EOeHjkm/9Ru884i1T3+909eGRHb9uaYF/+jmjyXtqm0rpcLAtHWAscBYv8xDieAqOythU+CB3v4kSrehEbGTi5e3+cnvdd2RgjusXbZPxxDb67u1+KA2Vtb3Wsq0d4r/QLvMMKCYqj/DxEFarbOKaABEWywQ47QZfRSId54kIc9xxMEV8K53P/u7tb5NMhHkPXx8QTHW0wTX6Bqb/K2zIlIWW86dQ2IPw0ELCBS/jo5HVxxLVWBf5/EoqT7z2ea8MDBKk73GUUE7nV0kmSc/ESUPEDp8NkEwgGCgK2ld1mCDezHFdXMlDma35yxnk5jafnOfhUOw6f9bDAs9YxsaXXqJPwjoGfQca7bgotvmf2MCCRxSqv2PsDo30cWrEIWu04YZNMJkFXcddXqWZ8xzIBv7HFhohzoMvEL8Ap3YqMNeOLy0V+W3p28dbkbVUc6eAXXTl4YTyeBsCOIviWocyaS7NvS8OZeg4Mu4ks8/0HO9De78T82Dhb6Yj9mGM6nTxx6npdHpy+r+9syryxmUoa3YktHnL9fn0CAwEAAQ==" }
const followerPublicKeys = [
    {
        name: 'Follower 1',
        publicKey: user1.publicKey
    },
    {
        name: 'Follower 2',
        publicKey: user1.publicKey
    },
    {
        name: 'Follower 3',
        publicKey: user1.publicKey
    },
    {
        name: 'Follower 4',
        publicKey: user1.publicKey
    },
    {
        name: 'Follower 5',
        publicKey: user1.publicKey
    },
    {
        name: 'Follower 6',
        publicKey: user1.publicKey
    },
];
const contentKey = crypto.randomBytes(32)



// // Define a Node class for building the binary tree
// class Node {
//     constructor(value, p = null) {
//         this.value = value;
//         this.left = null;
//         this.right = null;
//     }
// }

// // Recursive function for building the binary tree
// function buildTree(hash, names) {
//     // If the hash is a leaf node, assign it a name from the list
//     if (hash.length === 1) {
//         return new Node(names.shift());
//     }

//     // Split the hash into two parts and recursively build the tree
//     const mid = Math.ceil(hash.length / 2);
//     let leftHash = hash.slice(0, mid);
//     let rightHash = hash.slice(mid);
//     let node = new Node(hash);
//     node.left = buildTree(leftHash, names);
//     node.right = buildTree(rightHash, names);
//     return node;
// }

// // Function that takes a list of names and a message string and returns a binary tree with leaf nodes assigned names
// function generateBinaryTree(names, msg) {
//     // Generate 32 random bytes
//     const randomBytes = crypto.randomBytes(32);

//     // Hash the message with the random bytes
//     let hashedMsg = crypto.createHmac('sha256', randomBytes)
//         .update(msg)
//         .digest();

//     // Build the binary tree
//     let root = buildTree(hashedMsg, [...names]); // Use spread operator to create a copy of the array

//     return root;
// }


function Exp4() {
    const { user } = useContext(AccountContext);

    if (user && contentKey) {
        const plaintext = 'Hello world!';
        const iv = crypto.randomBytes(16); // Initialization vector for AES-CBC
        const cipher = crypto.createCipheriv('aes-256-cbc', contentKey, iv);
        let ciphertext = cipher.update(plaintext, 'utf8', 'hex');
        ciphertext += cipher.final('hex');
        const encryptedContentKey = crypto.publicEncrypt(user.publicKey, contentKey);
        console.log(encryptedContentKey)
        let tree = generateBinaryTree(followerPublicKeys)
    }
    return (
        <>Exp 4</>
    )
}

export default Exp4