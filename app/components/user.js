import { useEffect, useState } from 'react';
import { useAccountContext } from '../account/context/AccountContext';
import { UserPlus } from 'lucide-react';

const FollowUser = ({ index, address, onRemoveRequest }) => {
  const { userRegistry } = useAccountContext();
  
  const [user, setUser] = useState({
    username: "",
    image: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const userData = await userRegistry.methods.getUserByAdd(address).call();
        setUser(userData);
      } catch (err) {
        setError('Failed to fetch user data');
        console.error('Error fetching user:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [address, userRegistry.methods]);

  const handleClick = () => {
    onRemoveRequest(index, address);
  };

  if (error) {
    return (
      <li className="p-4 rounded-2xl m-1 bg-red-50 dark:bg-red-900/10">
        <p className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      </li>
    );
  }

  return (
    <li 
      className="p-4 rounded-2xl m-1 bg-white dark:bg-gray-800 transition-all duration-200 hover:shadow-md dark:hover:bg-gray-700/50"
    >
      <div className="flex items-center gap-4">
        {isLoading ? (
          <div className="animate-pulse flex items-center w-full gap-4">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </div>
        ) : (
          <>
            <div className="relative flex-shrink-0">
              <img
                className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${user.image}`}
                alt={`${user.username}'s avatar`}
                loading="lazy"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {user.username}
              </p>
            </div>
            
            <button
              onClick={handleClick}
              className="inline-flex items-center justify-center p-2 rounded-xl
                text-gray-700 dark:text-gray-200 
                hover:bg-gray-100 dark:hover:bg-gray-700
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors duration-200"
              aria-label={`Add ${user.username} to contacts`}
              disabled={isLoading}
            >
              <UserPlus className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default FollowUser;