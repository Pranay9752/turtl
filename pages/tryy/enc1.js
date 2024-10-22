const crypto = require('crypto');
import { AccountContext } from '@/context/AccountContext';
import { PostContext } from "@/context/PostContext"
import encryptContentKey from './encrypt';
import decryptContentKey from './decrypt';
import { useContext, useState } from 'react';
import generateBinaryTree from '../upload/generatetree';
import findContentKey from '../profile/[]/decryption';

// Function to encrypt the encryptedContentKey using the public key
function encryptContentKeyWithPublicKey(publicKey, encryptedContentKey) {
    const buffer = Buffer.from(encryptedContentKey)//, 'base64');
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted//.toString('base64');
}

// Function to decrypt the encryptedContentKey using the private key
function decryptContentKeyWithPrivateKey(privateKey, encryptedContentKey) {
    const buffer = Buffer.from(encryptedContentKey)//, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted//.toString('base64');
}


async function enc1() {
    
    return (
        <></>
    )
}
// Example usage
export default enc1
