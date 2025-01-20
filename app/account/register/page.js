// 'use client';
// import Link from "next/link"
// import { useEffect, useState } from "react";
// import { useAccountContext } from "../context/AccountContext";
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import generateName from "../../utils/genName";
// import { Camera, Sparkles, RefreshCw } from 'lucide-react';

// function Register() {
//     const imageURL = "https://api.dicebear.com/5.x/adventurer/svg?seed="
//     const [username, setUsername] = useState("")
//     const [image, setImage] = useState("Abby")

//     const router = useRouter()
//     const { 
//         userRegistry
//     } = useAccountContext()

//     function handleGenerateImg() {
//         // code to generate a new image
//         setImage(
//            () => generateName()
//         );
//     }
    
//     function handleUsernameChange(event) {
//         setUsername(() => event.target.value);
//     }
    
//     function handleGenerateName() {
//         // code to generate a new username
//         setUsername(
//          () =>   generateName()
//         );
//     }
    
//     async function handleRegisterUser() {
//         try {
//             const keys = await axios('/api/generate-key-pair/').then(function (response) {
//                 return response.data
//             })

//             const tx = await userRegistry.methods.registerUser(username, image, keys.publicKey, keys.privateKey).send({ from: window.ethereum.selectedAddress });
//             const user = userRegistry.methods.getUserByAdd(window.ethereum.selectedAddress).call();
//             window.localStorage.setItem('privateKey',keys.privateKey)
//             window.localStorage.setItem('publicKey',keys.publicKey)
//             window.localStorage.setItem('username',username)
//             window.localStorage.setItem('image',image)
//             router.push('/')
//         } catch (err) {
//             console.log(err)
//         }
//     }
    
//     useEffect(() => {
//         const authUser = async () => {

//             const user = await userRegistry.methods.getUserByAdd(window.ethereum.selectedAddress).call();
//             console.log('user: ', user.userAddress, );
//             if(user.userAddress) {
//                 router.push('/')
//             }
//         }

//         authUser()
//     })

//     return <>
//         <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
//       {/* Navbar */}
//       <nav className="p-4 backdrop-blur-sm bg-white/30 border-b border-purple-100">
//         <div className="max-w-7xl mx-auto flex items-center">
//           <Link href="/account/wallet" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
//             ✨ Turtl
//           </Link>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="flex flex-col items-center p-8 space-y-8">
//         {/* Profile Image Section */}
//         <div className="relative group">
//           <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
//           <div className="relative bg-white rounded-2xl p-2">
//             <img 
//               src={imageURL + image} 
//               className="w-80 h-80 object-cover rounded-xl" 
//               alt="avatar" 
//             />
//             <button 
//               onClick={handleGenerateImg}
//               className="absolute bottom-4 right-4 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
//             >
//               <RefreshCw className="w-6 h-6 text-purple-600" />
//             </button>
//           </div>
//         </div>

//         {/* Username Input */}
//         <div className="relative w-80">
//           <input
//             className="w-full px-6 py-4 bg-white/70 hover:bg-white/90 focus:bg-white rounded-full shadow-md focus:shadow-lg transition-all duration-200 outline-none text-gray-700 pr-12"
//             type="text"
//             placeholder="✨ Pick a cool username"
//             onChange={handleUsernameChange}
//             value={username}
//           />
//           <button 
//             onClick={handleGenerateName}
//             className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-purple-50 rounded-full transition-colors duration-200"
//           >
//             <Sparkles className="w-5 h-5 text-purple-600" />
//           </button>
//         </div>

//         {/* Create Button */}
//         <button
//           onClick={handleRegisterUser}
//           className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
//         >
//           <span className="relative z-10">Create Your Vibe ✨</span>
//           <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-200"></div>
//         </button>
//       </div>
//     </div>
//     </>
// }

// export default Register


'use client';
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Camera, Sparkles, RefreshCw, Loader2, AlertTriangle } from 'lucide-react';
import { useAccountContext } from "../context/AccountContext";
import generateName from "../../utils/genName";

const IMAGE_URL = "https://api.dicebear.com/5.x/adventurer/svg?seed=";

function Register() {
    const [formState, setFormState] = useState({
        username: "",
        image: "Abby",
        isLoading: false,
        error: null,
        isGeneratingName: false,
        isGeneratingImage: false,
        isRegistering: false
    });

    const router = useRouter();
    const { userRegistry } = useAccountContext();

    // Check if user is already registered
    useEffect(() => {
        const checkUserAuth = async () => {
            try {
                const user = await userRegistry.methods.getUserByAdd(window.ethereum.selectedAddress).call();
                if (user.userAddress) {
                    // router.push('/');
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            }
        };

        if (window.ethereum?.selectedAddress) {
            checkUserAuth();
        }
    }, [userRegistry, router]);

    // Memoized handlers
    const handleGenerateImg = useCallback(async () => {
        setFormState(prev => ({ ...prev, isGeneratingImage: true }));
        try {
            const newImage = generateName();
            setFormState(prev => ({ 
                ...prev, 
                image: newImage,
                isGeneratingImage: false 
            }));
        } catch (error) {
            setFormState(prev => ({ 
                ...prev, 
                error: "Failed to generate image",
                isGeneratingImage: false 
            }));
        }
    }, []);

    const handleUsernameChange = useCallback((event) => {
        setFormState(prev => ({ 
            ...prev, 
            username: event.target.value,
            error: null 
        }));
    }, []);

    const handleGenerateName = useCallback(async () => {
        setFormState(prev => ({ ...prev, isGeneratingName: true }));
        try {
            const newName = generateName();
            setFormState(prev => ({ 
                ...prev, 
                username: newName,
                isGeneratingName: false 
            }));
        } catch (error) {
            setFormState(prev => ({ 
                ...prev, 
                error: "Failed to generate username",
                isGeneratingName: false 
            }));
        }
    }, []);

    const handleRegisterUser = useCallback(async () => {
        if (!formState.username.trim()) {
            setFormState(prev => ({ 
                ...prev, 
                error: "Username is required" 
            }));
            return;
        }

        setFormState(prev => ({ ...prev, isRegistering: true, error: null }));
        
        try {
            const { data: keys } = await axios('/api/generate-key-pair/');
            
            await userRegistry.methods
                .registerUser(
                    formState.username, 
                    formState.image, 
                    keys.publicKey, 
                    keys.privateKey
                )
                .send({ from: window.ethereum.selectedAddress });

            // Store user data in localStorage
            const userData = {
                privateKey: keys.privateKey,
                publicKey: keys.publicKey,
                username: formState.username,
                image: formState.image
            };
            
            Object.entries(userData).forEach(([key, value]) => {
                window.localStorage.setItem(key, value);
            });

            router.push('/');
        } catch (error) {
            setFormState(prev => ({ 
                ...prev, 
                error: error.message || "Registration failed. Please try again.",
                isRegistering: false 
            }));
        }
    }, [formState.username, formState.image, userRegistry, router]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
            <nav className="sticky top-0 z-50 p-4 backdrop-blur-sm bg-white/30 border-b border-purple-100">
                <div className="max-w-7xl mx-auto flex items-center">
                    <Link href="/account/wallet" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                        ✨ Turtl
                    </Link>
                </div>
            </nav>

            <div className="flex flex-col items-center p-8 space-y-8 max-w-md mx-auto">
                {formState.error && (
                    <div className="w-full px-4 py-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-red-600">
                        <AlertTriangle className="w-5 h-5" />
                        <p>{formState.error}</p>
                    </div>
                )}

                <div className="relative group w-full">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                    <div className="relative bg-white rounded-2xl p-2">
                        <img 
                            src={IMAGE_URL + formState.image} 
                            className="w-full aspect-square object-cover rounded-xl"
                            alt="avatar"
                        />
                        <button 
                            onClick={handleGenerateImg}
                            disabled={formState.isGeneratingImage}
                            className="absolute bottom-4 right-4 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
                        >
                            {formState.isGeneratingImage ? (
                                <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
                            ) : (
                                <RefreshCw className="w-6 h-6 text-purple-600" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="relative w-full">
                    <input
                        className="w-full px-6 py-4 bg-white/70 hover:bg-white/90 focus:bg-white rounded-full shadow-md focus:shadow-lg transition-all duration-200 outline-none text-gray-700 pr-12"
                        type="text"
                        placeholder="✨ Pick a cool username"
                        onChange={handleUsernameChange}
                        value={formState.username}
                        disabled={formState.isRegistering}
                    />
                    <button 
                        onClick={handleGenerateName}
                        disabled={formState.isGeneratingName || formState.isRegistering}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-purple-50 rounded-full transition-colors duration-200 disabled:opacity-50"
                    >
                        {formState.isGeneratingName ? (
                            <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
                        ) : (
                            <Sparkles className="w-5 h-5 text-purple-600" />
                        )}
                    </button>
                </div>

                <button
                    onClick={handleRegisterUser}
                    disabled={formState.isRegistering || !formState.username.trim()}
                    className="group relative w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {formState.isRegistering ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            'Create Your Vibe ✨'
                        )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-200" />
                </button>
            </div>
        </div>
    );
}

export default Register;