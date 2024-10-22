import { generateKeyPairSync } from 'crypto';

async function generateKeyPair() {
    let keyPair = await window.crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: 4096,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
      );
      const publicKey = await window.crypto.subtle.exportKey("jwk", keyPair.publicKey);
      const privateKey = await window.crypto.subtle.exportKey("jwk", keyPair.privateKey);
          
    return [privateKey, publicKey]
}

export default generateKeyPair;