const crypto = require('crypto');
import { AccountContext } from '@/context/AccountContext';
import encryptContentKey from './encrypt';
import decryptContentKey from './decrypt';
import { useContext } from 'react';

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


function enc0() {
    const { user } = useContext(AccountContext)
    const cid = "bafybeiemgizfqb6yv6ij4lphpekixezvaowltfaq6io6qsvhz6ctyl72dm"

    const rootKey = crypto.randomBytes(32);
    const contentKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', contentKey, iv);
    let ciphertext = cipher.update(cid, 'utf8', 'hex');
    ciphertext += cipher.final('hex');

    const publicKey = user.publicKey;
    const privateKey = user.privateKey;

    const encryptedContentKey = encryptContentKey(rootKey, contentKey);
    const encryptedContentKeyString = encryptedContentKey//.toString('base64');
    const encryptedContentKeyWithPublicKey = encryptContentKeyWithPublicKey(publicKey, encryptedContentKey);
    
    console.log(encryptedContentKey, encryptedContentKeyWithPublicKey)
    
    const decryptedContentKeyWithPrivateKey = decryptContentKeyWithPrivateKey(privateKey, Array.from(encryptedContentKeyWithPublicKey));
    const decContentKey = decryptContentKey(rootKey, decryptedContentKeyWithPrivateKey).then((key) => {
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let plaintext = decipher.update(ciphertext, 'hex', 'utf8');
        plaintext += decipher.final('utf8');
        console.log(plaintext)
    })
    return (
        <></>
    )
}
// Example usage
export default enc0
