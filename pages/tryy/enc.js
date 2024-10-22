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
export default encryptContentKeyWithPublicKey


// function enc() {
//     const { user } = useContext(AccountContext)
//     const rootKey = crypto.randomBytes(32);
//     const contentKey = crypto.randomBytes(32);
    
//     const publicKey = user.publicKey;
//     const privateKey = user.privateKey;
    
//     const encryptedContentKey = encryptContentKey(rootKey, contentKey);
//     const encryptedContentKeyString = encryptedContentKey//.toString('base64');

//     const encryptedContentKeyWithPublicKey = encryptContentKeyWithPublicKey(publicKey, encryptedContentKey);
//     const decryptedContentKeyWithPrivateKey = decryptContentKeyWithPrivateKey(privateKey, encryptedContentKeyWithPublicKey);
//     const decContentKey = decryptContentKey(rootKey, decryptedContentKeyWithPrivateKey)
//     decContentKey.then((key)=>{
//         console.log(key,contentKey)
//         console.log(key===contentKey)
//         console.log(key==contentKey)
//     })
//     return (
//         <></>
//     )
// }
// // Example usage

// export default enc