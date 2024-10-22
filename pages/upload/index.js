import { useContext, useState } from 'react'
import { makeStorageClient } from './storage'
import { AccountContext } from '@/context/AccountContext';
import crypto from 'crypto';
import axios from 'axios';
import generateBinaryTree from './generatetree';
import { PostContext } from '@/context/PostContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Upload = () => {
    const router = useRouter();
    const [image, setImage] = useState(null);
    const [contentID, setContentID] = useState("");
    const [postName, setPostName] = useState("");

    const { user, web3, address } = useContext(AccountContext)
    const { postContractAddress, postContractABI, setPostContract, postContract, postcContract } = useContext(PostContext)

    const activateContract = () => {
        const PostContract = new web3.eth.Contract(postContractABI, postContractAddress);
        setPostContract(PostContract)
        return PostContract
    }

    const storeFiles = async (file) => {
        const files = []
        files.push(file)
        const client = makeStorageClient()
        const cid = await client.put(files)
        console.log(cid)
        return cid
    }

    const hashContent = async () => {
        const contentKey = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', contentKey, iv);
        let ciphertext = cipher.update(contentID, 'utf8', 'hex');
        ciphertext += cipher.final('hex');
        //setCipherText(ciphertext) // Fixed a typo here
        return [contentKey, iv, ciphertext]
    }
    const formTree = async (contentKey, iv, ciphertext) => {
        const followerPublicKeys = [user.publicKey, user.publicKey, user.publicKey, user.publicKey, user.publicKey, user.publicKey, user.publicKey, user.publicKey];

        let binTree = await generateBinaryTree(contentKey, iv, ciphertext, followerPublicKeys)
        return binTree
    }

    const addPost = (userId,rcid) => {
        console.log(rcid)
        postcContract.methods.createPost(userId,image.name,postName,rcid).send({from: address}) // Wait for the addPost function to complete before proceeding
    }



    const handleSubmit = async () => {
        //e.preventDefault();
        if (!image) {
            return alert("Please select a file to upload");
        }
        const rcid = await storeFiles(image)

        setContentID(rcid)
        console.log("Done!!")
        const contentKey = await hashContent() // Wait for the hashContent function to complete before proceeding
        const contract = activateContract()
        console.log("Done!!")
        const tree = await formTree(contentKey[0], contentKey[1], contentKey[2]) // Wait for the formTree function to complete before proceeding
        console.log(tree)
        const id = Math.floor(Math.random() * 1001);
        const blob = new Blob([JSON.stringify(tree)], { type: 'application/json' })
        const name = `${user.username}-${id}.json`
        const file = new File([blob], name)
        const cid = await storeFiles(file) // Wait for the storeFiles function to complete before proceeding
        const userId = parseInt(user.id)
        addPost(userId,rcid)
        const tx = await contract.methods.createPost(userId, name, cid).send({ from: address });

        
        console.log(tx)

        router.push('/')
    };

    const handleChange = (e) => {
        setImage(e.target.files[0]);
        handleSubmit()
    };

    return (
        <>
            {/* <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleChange} required={true} />
                <button type="submit">Upload</button>

            </form> */}



            <div className="flex flex-col items-center">
            <input
                        className='bg-transparent p-4 mt-4 text-black text-center active:border-white border-transparent w-[150px] rounded-full h-10'
                        type="text"
                        id="username"
                        placeholder="Enter caption"
                        onChange={(e) => setPostName(e.target.value)}
                        value={postName}
                    />
                <label className="flex flex-col p-4 items-center cursor-pointer mt-8 mb-3">
                
                    <span className="py-3 px-13 w-32 mt-4 text-center bg-blue-600 rounded-lg text-white font-semibold shadow-md hover:bg-blue-700 focus:outline-none" >
                        Upload
                    </span>
                    
                    <input type='file' class="hidden" onChange={handleChange} required={true} />
                </label>
                {/* <input type="file" class='hidden' onChange={handleChange} required={true} />
                <button type="submit"
                    className="py-3 px-6 bg-purple-600 rounded-lg text-white font-semibold shadow-md hover:bg-purple-700 focus:outline-none"
                >Upload</button> */}
                
            </div>
        </>
    );
}

export default Upload
