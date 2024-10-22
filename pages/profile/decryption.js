import crypto from 'crypto';
//import decryptContentKeyWithPrivateKey from '../../tryy/dec';
//import decryptContentKey from '../../tryy/decrypt';
// import decryptContentKeyWithPrivateKey from '../tryy/dec';
// import decryptContentKey from '../tryy/decrypt';

function decryptContentKeyWithPrivateKey(privateKey, encryptedContentKey) {
    const buffer = Buffer.from(encryptedContentKey)//, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    console.log(decrypted)
    return decrypted//.toString('base64');
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

async function findContentKey(tree, publicKey, privateKey) {


    if (!tree) {
        return null;
    }
    // Check if the public key is in the followers list of this node
    if (tree.followers.length > 0 && tree.followers[0].publicKey === publicKey) {
        try {
            const post = tree.followers[0]
            //return post
            const decryptedContentKeyWithPrivateKey = decryptContentKeyWithPrivateKey(privateKey, Uint8Array.from(post.encryptedKey))
           // const decContentKey = await decryptContentKey(post.rootKey, decryptedContentKeyWithPrivateKey)
            const contentKey = await decryptContentKey(post.rootKey.data,decryptedContentKeyWithPrivateKey)//.then((key) => {
            //     return key
            // })
            const iv = post.iv
            const ciphertext = post.ciphertext
            return {contentKey,iv,ciphertext}

        } catch (error) {
            console.log(error)
        }

    }
    const follower = tree.followers.find(f => f.publicKey === publicKey);
    //console.log(follower)
    //   if (follower) {
    //     console.log(follower)
    //     // Decrypt the encrypted key with the private key
    //     const decryptedKey = crypto.privateDecrypt({ key: privateKey, passphrase: '' }, follower.encryptedKey);
    //     // Return the content key
    //     return decryptContentKey(tree.rootKey, decryptedKey);
    //   }

    // If the key is not found in this node's followers, recurse on left and right subtrees
    const leftContentKey = findContentKey(tree.left, publicKey, privateKey);
    if (leftContentKey) {
        return leftContentKey;
    }

    return findContentKey(tree.right, publicKey, privateKey);
}

export default findContentKey;

//const publicKey = await window.crypto.subtle.importKey(
//     'jwk',
//     publicKey,
//     {
//       name: 'RSA-OAEP',
//       hash: { name: 'SHA-256' },
//     },
//     true,
//     ['encrypt']
//   );
