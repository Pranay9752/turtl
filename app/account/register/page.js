'use client';
import generateName from "@/app/utils/genName";
import Link from "next/link"
import { useEffect, useState } from "react";
import { useAccountContext } from "../context/AccountContext";
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Register() {
    const imageURL = "https://api.dicebear.com/5.x/adventurer/svg?seed="
    const [username, setUsername] = useState("")
    const [image, setImage] = useState("Abby")

    const router = useRouter()
    const { 
        userRegistry
    } = useAccountContext()

    function handleGenerateImg() {
        // code to generate a new image
        setImage(
            generateName()
        );
    }
    
    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }
    
    function handleGenerateName() {
        // code to generate a new username
        setUsername(
            generateName()
        );
    }
    
    async function handleRegisterUser() {
        try {
            const keys = await axios('/api/generate-key-pair/').then(function (response) {
                return response.data
            })
            console.log('keys: ', userRegistry);

            const tx = await userRegistry.methods.registerUser(username, image, keys.publicKey, keys.privateKey).send({ from: window.ethereum.selectedAddress });
            const user = userRegistry.methods.getUserByAdd(window.ethereum.selectedAddress).call();
            console.log(user)
            window.localStorage.setItem('privateKey',keys.privateKey)
            window.localStorage.setItem('publicKey',keys.publicKey)
            window.localStorage.setItem('username',username)
            window.localStorage.setItem('image',image)
            router.push('/')
        } catch (err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        if(window.localStorage.getItem('image')){
            router.push('/')
        }
    })

    return <>
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href="/account/wallet" className="btn btn-ghost normal-case text-xl">Turtl</Link>
            </div>
        </div>
        <div className="flex flex-col items-center h-screen w-screen p-16">
                <div className='relative  w-80 '>
                    <img src={imageURL+image} className="mx-1" alt="avatar" height="333" width="333" />
                    <button className='absolute bottom-6 right-6 h-5 w-5 p-3' id="generate-image" onClick={handleGenerateImg}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div className='relative bg-slate-200 h-10 w-[300px] rounded-full'>
                    <input
                        className='bg-transparent outline-none text-black active:border-transparent border-transparent w-[284px] rounded-full h-10 absolute inset-y-0 left-4'
                        type="text"
                        id="username"
                        placeholder="Enter username"
                        onChange={handleUsernameChange}
                        value={username}
                    />
                    <button className='absolute inset-y-0 right-3' id="generate-username" onClick={handleGenerateName}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div>
                    <button
                        className='inline-flex justify-center items-center w-[200px] px-4 py-2 border border-transparent text-base font-medium rounded-full m-3 text-white bg-yellow-400 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
                        onClick={handleRegisterUser} type="submit">Create</button>
                </div>
            </div>

    </>
}

export default Register