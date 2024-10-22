const crypto = require('crypto');
import { AccountContext } from '@/context/AccountContext';
import encryptContentKey from './encrypt';
import decryptContentKey from './decrypt';
import { useContext } from 'react';



function decryptContentKeyWithPrivateKey(privateKey, encryptedContentKey) {
    const buffer = Buffer.from(encryptedContentKey)//, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    console.log(decrypted)
    return decrypted//.toString('base64');
}
export default decryptContentKeyWithPrivateKey
