import { useRouter } from "next/router";
import { useContext, useState } from "react";
import crypto from 'crypto';
import { AccountContext } from "@/context/AccountContext";
const user = { publicKey: "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA2kAR2mxkeOXBqKW5KQsc5ujunzY5/3dGi+8Rzvtmz4Bs9O+qT20b/6gMZA0Z9c7kTi5HmBJNnS439FS1lqNEjn53AerhI/zPMu888/Tbw7kkmBU/qCRQVFhaoflOdsy4s/E42FWxx7EOeHjkm/9Ru884i1T3+909eGRHb9uaYF/+jmjyXtqm0rpcLAtHWAscBYv8xDieAqOythU+CB3v4kSrehEbGTi5e3+cnvdd2RgjusXbZPxxDb67u1+KA2Vtb3Wsq0d4r/QLvMMKCYqj/DxEFarbOKaABEWywQ47QZfRSId54kIc9xxMEV8K53P/u7tb5NMhHkPXx8QTHW0wTX6Bqb/K2zIlIWW86dQ2IPw0ELCBS/jo5HVxxLVWBf5/EoqT7z2ea8MDBKk73GUUE7nV0kmSc/ESUPEDp8NkEwgGCgK2ld1mCDezHFdXMlDma35yxnk5jafnOfhUOw6f9bDAs9YxsaXXqJPwjoGfQca7bgotvmf2MCCRxSqv2PsDo30cWrEIWu04YZNMJkFXcddXqWZ8xzIBv7HFhohzoMvEL8Ap3YqMNeOLy0V+W3p28dbkbVUc6eAXXTl4YTyeBsCOIviWocyaS7NvS8OZeg4Mu4ks8/0HO9De78T82Dhb6Yj9mGM6nTxx6npdHpy+r+9syryxmUoa3YktHnL9fn0CAwEAAQ==" }

const followerKeys = [
  {
    name: 'Follower 1',
    publicKey: user.publicKey
  },
  {
    name: 'Follower 2',
    publicKey: user.publicKey
  },
  {
    name: 'Follower 3',
    publicKey: user.publicKey
  },
  {
    name: 'Follower 4',
    publicKey: user.publicKey
  },
  {
    name: 'Follower 5',
    publicKey: user.publicKey
  },
  {
    name: 'Follower 6',
    publicKey: user.publicKey
  },
];

async function hash() {



  // Generate a random content encryption key
  const contentKey = crypto.randomBytes(32); // 256-bit key
  // Create a binary tree of encryption keys
  //const tree = createBinaryTree(followerKeys.length);


  // Encrypt the content using the symmetric encryption key
  const plaintext = 'Hello world!';
  const iv = crypto.randomBytes(16); // Initialization vector for AES-CBC
  const cipher = crypto.createCipheriv('aes-256-cbc', contentKey, iv);
  let ciphertext = cipher.update(plaintext, 'utf8', 'hex');
  ciphertext += cipher.final('hex');
  // Encrypt the content encryption key using the master public key
  const tree = generateBinaryTree(followerKeys, contentKey)
  console.log(tree)
}

function generateBinaryTree(followerPublicKeys, contentKey) {
  // Generate a random symmetric key for the content

  // Generate a random root key for the binary tree
  const rootKey = crypto.randomBytes(32);
  console.log("rootKey: ", rootKey);
  // Encrypt the symmetric key using the root key
  console.log("contentKey: ", contentKey);
  const encryptedContentKey = crypto.publicEncrypt(JSON.parse( JSON.stringify( user.publicKey ) ), contentKey);
  console.log("encryptedContentKey: ", encryptedContentKey);

  // Split the root key into two subkeys
  const [leftRootKey, rightRootKey] = splitKey(rootKey);

  // Recursively generate the binary tree
  const tree = generateSubtree(leftRootKey, rightRootKey, followerPublicKeys, encryptedContentKey);

  return tree;
}


async function splitKey(key) {
  const mid = Math.ceil(key.length / 2);
  const left = key.slice(0, mid);
  const right = key.slice(mid);
  return [left, right];
}

function generateSubtree(leftKey, rightKey, followerPublicKeys, encryptedContentKey) {
  const filteredPublicKeys = followerPublicKeys.filter(publicKey => publicKey);

  const leftSubtree = leftKey.length === 32 ? { key: leftKey } : generateSubtree(...splitKey(leftKey), filteredPublicKeys, encryptedContentKey);
  const rightSubtree = rightKey.length === 32 ? { key: rightKey } : generateSubtree(...splitKey(rightKey), filteredPublicKeys, encryptedContentKey);

  const tree = {
    left: leftSubtree,
    right: rightSubtree,
    followers: []
  };

  // Encrypt the content key for each follower and add it to the leaf nodes
  filteredPublicKeys.forEach(publicKey => {
    const encryptedKey = crypto.publicEncrypt(publicKey, encryptedContentKey);
    tree.followers.push({ publicKey, encryptedKey });
  });

  return tree;
}





function Exp1() {
  const router = useRouter()

  hash()



  return (
    <div>

    </div>
  );
}



export default Exp1;