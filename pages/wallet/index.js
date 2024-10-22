import { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Web3 from 'web3';
import { AccountContext } from '@/context/AccountContext';

function Wallet() {
  const {
    isAuthenticated,
    setIsAuthenticated,
    web3,
    setWeb3,
    address,
    setAddress,
    username,
    setUsername,
    image,
    setImage,
    user,
    setUser,
    userRegistry,
    setUserRegistry,
    contractAddress,
    contractABI
  } = useContext(AccountContext);

  const router = useRouter()

  const connectToMetamask = async () => {
    try {
      // Check if Metamask is installed
      if (typeof window.ethereum === 'undefined') {
        throw new Error('Metamask is not installed.');
      }

      // Connect to Metamask and get the selected account
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const selectedAddress = window.ethereum.selectedAddress;
      if (!selectedAddress) {
        throw new Error('Metamask is not connected to any account.');
      }

      // Initialize Web3 with the current provider
      const web3Instance = new Web3(window.ethereum);
      const userContract = new web3Instance.eth.Contract(contractABI, contractAddress);
      setWeb3(web3Instance);
      setAddress(selectedAddress);
      setUserRegistry(userContract);
      console.log("Done!!")
    } catch (error) {
      console.error(error);
      router.push('/wallet');
    }
  };

  if (web3 && userRegistry) {
    router.push('/wallet/register/')
    return null;
  }

  return (
    <>

    {/* <div className="h-screen w-screen flex flex-col">
      
      <div className=" flex items-center justify-center p-32 bg-gray-100">
        <div className="flex flex-col items-center justify-center bg-white rounded-lg p-6 shadow-md">
          <img
            className="h-44 w-64"
            src={"https://imgs.search.brave.com/kuu2Js6yZB6QcN7_aZBtNfdknpDsKftkL8hQuBQ18pw/rs:fit:632:225:1/g:ce/aHR0cHM6Ly90c2Uz/LmV4cGxpY2l0LmJp/bmcubmV0L3RoP2lk/PU9JUC5KSVdZd3hp/WVliV3NOakNpMHhE/TXZ3SGFGaiZwaWQ9/QXBp"}
            alt=""
          />
          <button
            onClick={connectToMetamask}
            className="inline-flex justify-center items-center w-[200px] px-4 py-2 border border-transparent text-base font-medium rounded-full m-3 text-white bg-green-400 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Connect Metamask
          </button>
     
        </div>
      </div>

    </div> */}
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="flex flex-col items-center justify-center bg-white rounded-lg p-8 shadow-lg">
        <img
          className="h-48 w-auto mb-6"
          src="https://imgs.search.brave.com/kuu2Js6yZB6QcN7_aZBtNfdknpDsKftkL8hQuBQ18pw/rs:fit:632:225:1/g:ce/aHR0cHM6Ly90c2Uz/LmV4cGxpY2l0LmJp/bmcubmV0L3RoP2lk/PU9JUC5KSVdZd3hp/WVliV3NOakNpMHhE/TXZ3SGFGaiZwaWQ9/QXBp"
          alt="Metamask Logo"
        />
        <button
          onClick={connectToMetamask}
          className="inline-flex justify-center items-center w-full px-6 py-3 bg-green-500 text-white text-lg font-medium rounded-full hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out"
        >
          Connect MetaMask
        </button>
      </div>
    </div>
    </>
  )
}

export default Wallet;