'use client';
import crypto from 'crypto';
import encryptContentKeyWithPublicKey, { encryptContentKey } from './hashConKey';

async function generateBinaryTree(contentKey, iv,ciphertext, followerPublicKeys) {
    
    const user1 = { publicKey: '-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA2kAR2mxkeOXBqKW5KQsc5ujunzY5/3dGi+8Rzvtmz4Bs9O+qT20b/6gMZA0Z9c7kTi5HmBJNnS439FS1lqNEjn53AerhI/zPMu888/Tbw7kkmBU/qCRQVFhaoflOdsy4s/E42FWxx7EOeHjkm/9Ru884i1T3+909eGRHb9uaYF/+jmjyXtqm0rpcLAtHWAscBYv8xDieAqOythU+CB3v4kSrehEbGTi5e3+cnvdd2RgjusXbZPxxDb67u1+KA2Vtb3Wsq0d4r/QLvMMKCYqj/DxEFarbOKaABEWywQ47QZfRSId54kIc9xxMEV8K53P/u7tb5NMhHkPXx8QTHW0wTX6Bqb/K2zIlIWW86dQ2IPw0ELCBS/jo5HVxxLVWBf5/EoqT7z2ea8MDBKk73GUUE7nV0kmSc/ESUPEDp8NkEwgGCgK2ld1mCDezHFdXMlDma35yxnk5jafnOfhUOw6f9bDAs9YxsaXXqJPwjoGfQca7bgotvmf2MCCRxSqv2PsDo30cWrEIWu04YZNMJkFXcddXqWZ8xzIBv7HFhohzoMvEL8Ap3YqMNeOLy0V+W3p28dbkbVUc6eAXXTl4YTyeBsCOIviWocyaS7NvS8OZeg4Mu4ks8/0HO9De78T82Dhb6Yj9mGM6nTxx6npdHpy+r+9syryxmUoa3YktHnL9fn0CAwEAAQ==-----END PUBLIC KEY-----' }
    // const followerPublicKeys = [user.publicKey, user.publicKey, user.publicKey, user.publicKey, user.publicKey, user.publicKey, user.publicKey, user.publicKey];

    const rootKey = crypto.randomBytes(32);

    const encryptedContentKey = encryptContentKey(rootKey, contentKey);

    const [leftRootKey, rightRootKey] = splitKey(rootKey);

    const tree = await generateSubtree(leftRootKey, rightRootKey, followerPublicKeys, encryptedContentKey, rootKey, iv,ciphertext);

    return tree;
}

function splitKey(key) {
    const mid = Math.ceil(key.length / 2);
    const left = key.slice(0, mid);
    const right = key.slice(mid);
    return [left, right];
}

function generateSubtree(leftKey, rightKey, followerPublicKeys, encryptedContentKey, rootKey, iv,ciphertext) {
    const isLeaf = leftKey.length === 1;
    let followerKeys = followerPublicKeys
    let followers = [];
    let rootkey = null
    if (isLeaf) {
        rootkey = rootKey
        followerPublicKeys.slice(0, 1).forEach(publicKey => {
            
            const encryptedKey = encryptContentKeyWithPublicKey(publicKey, encryptedContentKey)
            // const encryptedKey = crypto.publicEncrypt({
            //     key: publicKey,
            //     padding: crypto.constants.RSA_PKCS1_OAEP_PADDING // RSA_PKCS1_OAEP_PADDING is a constant defined in the crypto library
            // }, encryptedContentKey);
            followers.push({ publicKey, encryptedKey, iv,ciphertext, rootKey });
        });
        followerKeys = followerPublicKeys.slice(1)
    }

    const leftSubtree = isLeaf ? null : generateSubtree(...splitKey(leftKey), followerKeys, encryptedContentKey, rootKey, iv,ciphertext);
    const rightSubtree = isLeaf ? null : generateSubtree(...splitKey(rightKey), followerKeys, encryptedContentKey, rootKey, iv,ciphertext);

    const tree = {
        left: leftSubtree,
        right: rightSubtree,
        followers
    };

    return tree;
}

export default generateBinaryTree
