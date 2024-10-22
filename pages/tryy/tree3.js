import React, { useContext } from 'react';
import crypto from 'crypto';
import encryptContentKey from './encrypt';
import { AccountContext } from '@/context/AccountContext';

function generateBinaryTree() {
    const { user } = useContext(AccountContext)
    const user1 = { publicKey: user.publicKey }
    const followerPublicKeys = [user1.publicKey, user1.publicKey, user1.publicKey, user1.publicKey, user1.publicKey, user1.publicKey, user1.publicKey, user1.publicKey];

    const contentKey = crypto.randomBytes(32);

    const rootKey = crypto.randomBytes(32);

    const encryptedContentKey = encryptContentKey(rootKey, contentKey);

    const [leftRootKey, rightRootKey] = splitKey(rootKey);

    const tree = generateSubtree(leftRootKey, rightRootKey, followerPublicKeys, encryptedContentKey);

    return tree;
}

function splitKey(key) {
    const mid = Math.ceil(key.length / 2);
    const left = key.slice(0, mid);
    const right = key.slice(mid);
    return [left, right];
}

function generateSubtree(leftKey, rightKey, followerPublicKeys, encryptedContentKey) {
    const isLeaf = leftKey.length === 1;
    let followerKeys = followerPublicKeys
    let followers = [];
    if (isLeaf) {
        followerPublicKeys.slice(0, 1).forEach(publicKey => {
            const encryptedKey = crypto.publicEncrypt(publicKey, encryptedContentKey);
            followers.push({ publicKey, encryptedKey });
        });
        followerKeys = followerPublicKeys.slice(1)
    }

    const leftSubtree = isLeaf ? null : generateSubtree(...splitKey(leftKey), followerKeys, encryptedContentKey);
    const rightSubtree = isLeaf ? null : generateSubtree(...splitKey(rightKey), followerKeys, encryptedContentKey);

    const tree = {
        left: leftSubtree,
        right: rightSubtree,
        followers
    };

    return tree;
}

export default generateBinaryTree
