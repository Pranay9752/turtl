import { AccountContext } from '@/context/AccountContext';
import Upload from '@/pages/upload';
import Link from 'next/link'
import { useContext } from 'react';
function RightSidebar({profile}) {

    const {userRegistry} = useContext(AccountContext)

    async function getPosts() {
        const users = userRegistry.methods.getAllUsers().call()
        return users
    }

    const users = getPosts()
    console.log(users)

   
    return (
        <div className="fixed h-screen   right-0 w-1/4 bg-white text-black flex flex-col">
            
            
            <Upload/>


          <div className='pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700'></div>
        
            
            
            
        </div>
    );
};

export default RightSidebar;