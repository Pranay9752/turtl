import { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Web3 from 'web3';
import { AccountContext } from '@/context/AccountContext';
import generateKeyPair from './keys';
import axios from 'axios';
import generateName from './genName';


function Register() {
    const [publicKey, setPublicKey] = useState("")
    const [privateKey, setPrivateKey] = useState("")
    const {
        address,
        username,
        setUsername,
        image,
        setImage,
        user,
        setUser,
        userRegistry
    } = useContext(AccountContext);

    const router = useRouter()

    if (user !== null) {
        // if (privateKey !== "") {
        //     router.push({
        //         pathname: '/secretkey',
        //         query: { privateKey: privateKey },
        //     })
        //     return null
        // } else {
            router.push('/')
        // }

    }
    const getUserData = async () => {
        const user = await userRegistry.methods.getUserByAdd(address).call();
        if (user.username !== '') {
            setUser(user)
        }

    };

    getUserData()

    const handleRegisterUser = async () => {
        try {
            const keys = await axios('/api/generate-key-pair/').then(function (response) {
                return response.data
            })

            const tx = await userRegistry.methods.registerUser(username, image, keys.publicKey, keys.privateKey).send({ from: address });
            const user = userRegistry.methods.getUserByAdd(address).call();
            console.log(keys.privateKey)
            setPrivateKey(keys.privateKey)
            setUser(user)
        } catch (err) {
            console.log(err)
        }
    }
    const handleGenerateName = () => {
        setUsername(generateName());
    };

    const handleGenerateImg = () => {
        setImage(
            "https://api.dicebear.com/5.x/adventurer/svg?seed=" + generateName()
        );
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };


    return (
        // <div className='flex flex-col justify-center items-center bg-slate-400 w-screen h-screen'>
        //     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        //     <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        //     <button onClick={handleRegisterUser}>Register User</button>

        //     {privateKey !== "" && (<>
        //         <p>Your Private key!! Do not share with anyone</p><br/>
        //         <p>{privateKey}</p>
        //     </>)}
        // </div>
        <>
            {/* {user ? router.push('/') : */}
            <div className="flex flex-col items-center h-screen w-screen p-16">
                <div className='relative'>
                    <img src={image} alt="avatar" height="200" width="200" />
                    <button className='absolute bottom-9 right-9 h-5 w-5' id="generate-image" onClick={handleGenerateImg}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div className='relative bg-slate-200 h-10 w-[300px] rounded-full'>
                    <input
                        className='bg-transparent text-black active:border-transparent border-transparent w-[284px] rounded-full h-10 absolute inset-y-0 left-4'
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
                        className='inline-flex justify-center items-center w-[200px] px-4 py-2 border border-transparent text-base font-medium rounded-full m-3 text-white bg-green-400 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                        onClick={handleRegisterUser} type="submit">Create</button>
                </div>
            </div>



            {/* <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block font-bold mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="block w-full border-gray-400 border-2 rounded py-2 px-4"
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="block font-bold mb-1">
                            Profile Image URL
                        </label>
                        <input
                            type="text"
                            id="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="block w-full border-gray-400 border-2 rounded py-2 px-4"
                        />
                    </div>
                    <div>
                        <button
                            onClick={handleRegisterUser}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div> */}
            {/* } */}
        </>


    )
}

export default Register