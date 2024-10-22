import { useContext, useState } from 'react'
import { makeStorageClient } from './storage'
import { AccountContext } from '@/context/AccountContext';
import crypto from 'crypto';
import axios from 'axios';
import generateBinaryTree from './generatetree';
import { PostContext } from '@/context/PostContext';
import { useRouter } from 'next/router';

const Upload = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  // const [tree, setTree] = useState(null);
  const [contentID, setContentID] = useState("");
  const [cipherText, setCipherText] = useState("");


  const { user, web3, address } = useContext(AccountContext)
  const { postContractAddress, postContractABI, setPostContract, postContract } = useContext(PostContext)

  const activateContract = () => {
    const PostContract = new web3.eth.Contract(postContractABI, postContractAddress);
    setPostContract(PostContract)
    return PostContract
  }

  async function storeFiles(file) {
    const files = []
    files.push(file)
    const client = makeStorageClient()
    const cid = await client.put(files)
    return cid
  }

  const hashContent = () => {

    const contentKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16); // Initialization vector for AES-CBC
    const cipher = crypto.createCipheriv('aes-256-cbc', contentKey, iv);
    let ciphertext = cipher.update(contentID, 'utf8', 'hex');
    ciphertext += cipher.final('hex');
    setContentID("")
    setCipherText(cipherText)
    return contentKey

  }
  const formTree = async (contentKey) => {
    let binTree = await generateBinaryTree(contentKey)
    return binTree
  }


  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      return alert("Please select a file to upload");
    }

    setContentID(await storeFiles(image))

    const contentKey = hashContent()
    const contract = activateContract()//.then((PostContract) => {
    //   return PostContract
    // })
    const tree = formTree(contentKey).then((tree) => {
      const id = Math.floor(Math.random() * 1001);
      const blob = new Blob([JSON.stringify(tree)], { type: 'application/json' })
      const name = `${user.username}-${id}.json`
      const file = new File([blob], name)
      setContentID(storeFiles(file))
      return name
    })
    console.log(tree)
    const tx = contract.methods.addPost(tree, contentID).send({ from: address });

    //router.push('/')
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} required={true} />
      <button type="submit">Upload</button>
    </form>

  );
}

export default Upload