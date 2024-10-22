import { AccountContext } from "@/context/AccountContext"
import { PostContext } from "@/context/PostContext"
import { useContext, useEffect, useState } from "react"
//import { makeStorageClient } from "../../upload/storage"
import axios from "axios"
import crypto from 'crypto';
import findContentKey from "./decryption"
import ProfileHeader from "@/components/ProfileHeader"
import ProfileTabs from "@/components/ProfileTabs"
import PostsGrid from "@/components/PostsGrid"
import Navbar from "@/components/Navbar"
import { parseArgs } from "util"
import { makeStorageClient } from "../upload/storage";


function Profile() {

    const { user, address } = useContext(AccountContext)
    const { postContract, postcContract } = useContext(PostContext)
    const [trees, setTrees] = useState([])
    const [posts, setPosts] = useState([])

    async function retrieve(cid) {
        const client = makeStorageClient()
        console.log("in retrieve")
        const res = await client.get(cid)
        console.log(res)
        const files = await res.files()
        for (const file of files) {
            console.log(file)
        }
    }
    

    async function getPosts() {
        const userId = parseInt(user.id)
        const post = await postcContract.methods.getLatestPostsForUser(userId).call()
        getFiles(post)

    }

    async function getFiles(postss) {
        console.log(postss)
        
        const data = postss.map((post) => {
            setPosts(prevList => [...prevList, post])

           console.log(posts)
            const link = "https://" + post.cid + ".ipfs.w3s.link/" + post.postName
            // const postData = axios.get(link)
            //     .then(function (response) {
            //         setTrees(prevList => [...prevList, response.data])
            //         const contentKey = findContentKey(response.data, user.publicKey, user.privateKey).then(function (key) {
            //             return key
            //         } )
            //         console.log(contentKey)
            //         // const contentKey = findContentKey(response.data, user.publicKey, user.privateKey).then((res) => {
            //         //     const decipher = crypto.createDecipheriv('aes-256-cbc', res.contentKey, Uint8Array.from(res.iv.data));
            //         //     let plaintext = decipher.update(res.ciphertext, 'hex', 'utf8');
            //         //     plaintext += decipher.final('utf8');
            //         //     console.log(plaintext)
            //         //     return plaintext
            //         // })
            //     })
        })

    }




    useEffect(() => {

        const post = postcContract.methods.getLatestPostsForUser(user.id).call()

      
        getPosts()



    }, [])


    return (<>
        <div className="bg-gray-100">
            <ProfileHeader profile={user} />
            <ProfileTabs />
            {posts && <PostsGrid posts={posts} />}
        </div>
    </>)
}

export default Profile