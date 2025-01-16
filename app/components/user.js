import { useEffect, useState } from 'react';
import { useAccountContext } from '../account/context/AccountContext';

const FollowUser = (props) => {
  const { userRegistry, userInter } = useAccountContext();

  const [user, setUser] = useState({
    username: "",
    image: ""
  })

  const handleClick = () => {

    props.onRemoveRequest(props.index, props.address);

  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usr = await userRegistry.methods.getUserByAdd(props.address).call();
        setUser(usr);
      } catch (error) {
        console.error('Error fetching follow requests:', error);
      }
    };

    fetchUser();
  }, [])
  return (

    <li key={props.index} className="p-3 sm:p-4 rounded-2xl m-1 bg-white">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            className="w-17 h-12 rounded-full"
            src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${user.image}`}
            alt="Neil image"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {user.username}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <button onClick={handleClick} className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white btn btn-square btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );

};

export default FollowUser;
