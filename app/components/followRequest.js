import { useEffect, useState } from 'react';
import { useAccountContext } from '../account/context/AccountContext';

const FollowRequest = (props) => {
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.5 12.5l3.5 3.5 8.5-8.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );

};

export default FollowRequest;
