import { useEffect, useContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import Web3 from 'web3';
import { AccountContext } from '@/context/AccountContext';

function Wallet() {
  const {
    web3,
    setWeb3,
    setAddress,
    userRegistry,
    setUserRegistry,
    contractAddress,
    contractABI,
  } = useContext(AccountContext);

  const router = useRouter();

  // Memoize the connectToMetamask function to avoid unnecessary re-renders
  const connectToMetamask = useCallback(async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('Metamask is not installed.');
      }

      // Request account access and get selected address
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const selectedAddress = accounts[0];

      if (!selectedAddress) {
        throw new Error('No account selected in Metamask.');
      }

      // Initialize Web3 and set contract instance
      const web3Instance = new Web3(window.ethereum);
      const userContract = new web3Instance.eth.Contract(contractABI, contractAddress);

      // Set the context values
      setWeb3(web3Instance);
      setAddress(selectedAddress);
      setUserRegistry(userContract);
      console.log("Connected to MetaMask successfully!");
      router.push('/wallet/register');
    } catch (error) {
      console.error("MetaMask connection failed:", error);
      router.push('/wallet');
    }
  }, [contractABI, contractAddress, setWeb3, setAddress, setUserRegistry, router]);

  // Redirect if web3 and userRegistry are already initialized
  // useEffect(() => {
  //   if (web3 && userRegistry) {
  //     router.push('/wallet/register');
  //   }
  // }, [web3, userRegistry, router]);

  return (
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
  );
}

export default Wallet;
