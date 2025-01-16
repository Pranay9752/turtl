import { randomBytes, createHmac, createCipheriv, createDecipheriv } from 'crypto';

function encryptContentKey(rootKey, contentKey) {
    const salt = randomBytes(16);
    const info = Buffer.from('encryptedContentKey', 'utf-8');

    const derivedKey = createHmac('sha256', salt)
        .update(rootKey)
        .digest();

    const iv = randomBytes(16);

    const cipher = createCipheriv('aes-256-gcm', derivedKey, iv);
    const encryptedContentKey = Buffer.concat([
        cipher.update(contentKey),
        cipher.final(),
        cipher.getAuthTag()
    ]);

    const encryptedData = Buffer.concat([
        salt,
        iv,
        encryptedContentKey
    ]);

    return encryptedData;
}

async function decryptContentKey(rootKey, encryptedData) {
    const salt = encryptedData.slice(0, 16);
    const iv = encryptedData.slice(16, 32);
    const encryptedContentKey = encryptedData.slice(32);

    const derivedKey = createHmac('sha256', salt)
        .update(rootKey)
        .digest();

    const decipher = createDecipheriv('aes-256-gcm', derivedKey, iv);
    decipher.setAuthTag(encryptedContentKey.slice(-16));
    const contentKey = Buffer.concat([
        decipher.update(encryptedContentKey.slice(0, -16)),
        decipher.final()
    ]);

    return contentKey;
}

const crypto = require('crypto');

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



export  { encryptContentKey, decryptContentKey, encryptContentKeyWithPublicKey, decryptContentKeyWithPrivateKey }