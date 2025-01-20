'use client';
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

function Logout() {
    const router = useRouter();
    
    useEffect(() => {
        // Clear localStorage
        window.localStorage.clear();

        // Disconnect MetaMask (if available)
        if (window.ethereum) {
            // Request MetaMask to disconnect
            window.ethereum.request({ method: 'eth_accounts' })
                .then(() => {
                    // Optional: you can reset any connected accounts if needed
                    window.ethereum.request({ method: 'eth_requestAccounts' })
                        .catch(() => {
                            // Handle disconnection errors (e.g., if no accounts were available)
                            console.log("No MetaMask accounts available or MetaMask is disconnected");
                        });
                })
                .catch((err) => {
                    console.error("MetaMask disconnect failed:", err);
                });
        }

        // Redirect user after logout
        router.push('/account/wallet/');
    }, [router]);

    return null; // Since it's just for logout logic, no UI is needed
}

export default Logout;
