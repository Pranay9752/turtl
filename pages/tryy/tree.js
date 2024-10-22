const crypto = require('crypto');

 function generateBinaryTree(followerPublicKeys) {
  // Generate a random symmetric key for the content
  const contentKey = crypto.randomBytes(32);

  // Generate a random root key for the binary tree
  const rootKey = crypto.randomBytes(32);

  // Encrypt the symmetric key using the root key
  if(contentKey && rootKey){
    const encryptedContentKey = crypto.publicEncrypt(rootKey, contentKey);
  }

  // Split the root key into two subkeys
  const [leftRootKey, rightRootKey] = splitKey(rootKey);

  // Recursively generate the binary tree
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
  const leftSubtree = leftKey.length === 32 ? { key: leftKey } : generateSubtree(...splitKey(leftKey), followerPublicKeys, encryptedContentKey);
  const rightSubtree = rightKey.length === 32 ? { key: rightKey } : generateSubtree(...splitKey(rightKey), followerPublicKeys, encryptedContentKey);

  const tree = {
    left: leftSubtree,
    right: rightSubtree,
    followers: []
  };

  // Encrypt the content key for each follower and add it to the leaf nodes
  followerPublicKeys.forEach(publicKey => {
    const encryptedKey = crypto.publicEncrypt(publicKey, encryptedContentKey);
    tree.followers.push({ publicKey, encryptedKey });
  });

  return tree;
}

export default generateBinaryTree