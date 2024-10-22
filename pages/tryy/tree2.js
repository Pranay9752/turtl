import React, { useContext } from 'react';
import crypto from 'crypto';
import encryptContentKey from './encrypt';
import { AccountContext } from '@/context/AccountContext';

function Tree2() {
    const {user} = useContext(AccountContext)
    const user1 = { publicKey: user.publicKey }
    const followerPublicKeys = [user1.publicKey, user1.publicKey, user1.publicKey, user1.publicKey, user1.publicKey, user1.publicKey, user1.publicKey, user1.publicKey];

    // Generate a random symmetric key for the content
    const contentKey = crypto.randomBytes(32);

    // Generate a random root key for the binary tree
    const rootKey = crypto.randomBytes(32);

    // Encrypt the symmetric key using the root key
    const encryptedContentKey = encryptContentKey(rootKey, contentKey)

    // Split the root key into two subkeys
    const [leftRootKey, rightRootKey] = splitKey(rootKey);

    // Recursively generate the binary tree
    const tree = generateSubtree(leftRootKey, rightRootKey, followerPublicKeys, encryptedContentKey);
    console.log(tree)
    // Render the tree
    return (
        <div>
            <p>Root Key: {rootKey.toString('hex')}</p>
            <p>Content Key: {contentKey.toString('hex')}</p>
            {/* {renderNode(tree)} */}
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
    console.log("length "+leftKey.length)
    let mid = Math.floor(followerPublicKeys.length / 2)
    console.log("mid : "+followerPublicKeys.length)
    const leftSubtree = isLeafNode ? { key: leftKey } : generateSubtree(...splitKey(leftKey), followerPublicKeys.slice(0,mid), encryptedContentKey);
    const rightSubtree = isLeafNode ? { key: rightKey } : generateSubtree(...splitKey(rightKey), followerPublicKeys.slice(0,mid), encryptedContentKey);

    const node = {
        left: leftSubtree,
        right: rightSubtree,
        followers: []
    };

    // Encrypt the content key for each follower and add it to the leaf nodes
    if ( followerPublicKeys.length===1) {
        console.log(followerPublicKeys)
        //followerPublicKeys.forEach(publicKey => {
            let publicKey = followerPublicKeys.shift()
            const encryptedKey = crypto.publicEncrypt(publicKey, encryptedContentKey);
            node.followers.push({ publicKey, encryptedKey });
        //});
    }

    return node;
}

// function renderNode(node) {
//     if (!node) {
//         return null;
//     }

//     if (!node.left && !node.right) {
//         return (
//             <div>
//                 <p>Leaf Node</p>
//                 {node.followers.map((follower, index) => (
//                     <div key={index}>
//                         <p>Public Key: {follower.publicKey.toString('hex')}</p>
//                         <p>Encrypted Key: {follower.encryptedKey.toString('hex')}</p>
//                     </div>
//                 ))}
//             </div>
//         );
//     }

//     return (
//         <div>
//             <p>Node</p>
//             <div>{renderNode(node.left)}</div>
//             <div>{renderNode(node.right)}</div>
//         </div>
//     );
// }

export default Tree2;
