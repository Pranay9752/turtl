import React, { useEffect, useState } from 'react';
import crypto from 'crypto';
import encryptContentKey from './encrypt';


function Tree1() {
    const [tree, setTree] = useState(null)
    const user1 = { publicKey: "-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA2kAR2mxkeOXBqKW5KQsc5ujunzY5/3dGi+8Rzvtmz4Bs9O+qT20b/6gMZA0Z9c7kTi5HmBJNnS439FS1lqNEjn53AerhI/zPMu888/Tbw7kkmBU/qCRQVFhaoflOdsy4s/E42FWxx7EOeHjkm/9Ru884i1T3+909eGRHb9uaYF/+jmjyXtqm0rpcLAtHWAscBYv8xDieAqOythU+CB3v4kSrehEbGTi5e3+cnvdd2RgjusXbZPxxDb67u1+KA2Vtb3Wsq0d4r/QLvMMKCYqj/DxEFarbOKaABEWywQ47QZfRSId54kIc9xxMEV8K53P/u7tb5NMhHkPXx8QTHW0wTX6Bqb/K2zIlIWW86dQ2IPw0ELCBS/jo5HVxxLVWBf5/EoqT7z2ea8MDBKk73GUUE7nV0kmSc/ESUPEDp8NkEwgGCgK2ld1mCDezHFdXMlDma35yxnk5jafnOfhUOw6f9bDAs9YxsaXXqJPwjoGfQca7bgotvmf2MCCRxSqv2PsDo30cWrEIWu04YZNMJkFXcddXqWZ8xzIBv7HFhohzoMvEL8Ap3YqMNeOLy0V+W3p28dbkbVUc6eAXXTl4YTyeBsCOIviWocyaS7NvS8OZeg4Mu4ks8/0HO9De78T82Dhb6Yj9mGM6nTxx6npdHpy+r+9syryxmUoa3YktHnL9fn0CAwEAAQ==-----END PUBLIC KEY-----" }
    const followerPublicKeys = [user1.publicKey, user1.publicKey, user1.publicKey, user1.publicKey, user1.publicKey, user1.publicKey, user1.publicKey, user1.publicKey];
    const rootKey = crypto.randomBytes(32)
    const contentKey = crypto.randomBytes(32)
    
    const encryptedContentData = encryptContentKey(rootKey,contentKey)
    // 
    //     if(rootKey && contentKey) {
    //         const encryptedContentKey = crypto.publicEncrypt(publicContentKey, contentKey);
            const [leftRootKey, rightRootKey] = splitKey(rootKey);
             async function createTree(){
                 setTree(generateSubtree(leftRootKey, rightRootKey, followerPublicKeys, encryptedContentData));
             }
            
           createTree()
           
    //     }
            
            // Split the root key into two subkeys
            
    
  
    // Render the tree
    return (
        <div>
            {tree?<><p>Root Key: {rootKey.toString('hex')}</p>
            <p>Content Key: {contentKey.toString('hex')}</p>
            {renderNode(tree)}</>: <h1>Loading...</h1>}
        </div>
    );
}

function splitKey(key) {
    const mid = Math.ceil(key.length / 2);
    const left = key.slice(0, mid);
    const right = key.slice(mid);
    return [left, right];
}

function generateSubtree(leftKey, rightKey, followerPublicKeys, encryptedContentKey) {
    const isLeafNode = leftKey.length === 1;

    const leftSubtree = isLeafNode ? { key: leftKey } : generateSubtree(...splitKey(leftKey), followerPublicKeys, encryptedContentKey);
    const rightSubtree = isLeafNode ? { key: rightKey } : generateSubtree(...splitKey(rightKey), followerPublicKeys, encryptedContentKey);

    const node = {
        left: leftSubtree,
        right: rightSubtree,
        followers: []
    };

    // Encrypt the content key for each follower and add it to the leaf nodes
    if (isLeafNode) {
        followerPublicKeys.forEach(publicKey => {
            const encryptedKey = crypto.publicEncrypt(publicKey, encryptedContentKey);
            node.followers.push({ publicKey, encryptedKey });
        });
    }

    return node;
}

function renderNode(node) {
    if (!node) {
        return null;
    }

    if (!node.left && !node.right) {
        return (
            <div>
                <p>Leaf Node</p>
                {node.followers.map((follower, index) => (
                    <div key={index}>
                        <p>Public Key: {follower.publicKey.toString('hex')}</p>
                        <p>Encrypted Key: {follower.encryptedKey.toString('hex')}</p>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            <p>Node</p>
            <div>{renderNode(node.left)}</div>
            <div>{renderNode(node.right)}</div>
        </div>
    );
}

export default Tree1;
