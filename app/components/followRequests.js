import { useEffect, useState } from 'react';
import { useAccountContext } from '../account/context/AccountContext';
import FollowRequest from './followRequest';

const FollowRequests = () => {
  const { userInter, userRegistry } = useAccountContext();
  const [requests, setRequests] = useState([]);

  const removeRequest = async (index, address) => {

    setRequests((prevRequests) => {
      const updatedRequests = [...prevRequests];
      updatedRequests.splice(index, 1);
      return updatedRequests;
    });
    await userInter.methods.acceptFollowRequest(address).send({ from: window.ethereum.selectedAddress });
  };

  useEffect(() => {
    const fetchFollowRequests = async () => {
      try {
        const requestList = await userInter.methods.getFollowRequests(window.ethereum.selectedAddress).call();
        setRequests(requestList);
      } catch (error) {
        console.error('Error fetching follow requests:', error);
      }
    };

    fetchFollowRequests();
  }, [userInter]);

  return (
    <div >
      <p className="btn btn-ghost normal-case text-xl">Follow requests</p>

      <ul className="max-w-md divide-y m-4 divide-gray-200 dark:divide-gray-700">
        {requests.map((item, index) => (

          <FollowRequest key={index} address={item} index={index} onRemoveRequest={removeRequest} />
        ))}
      </ul>
    </div>
  );
};

export default FollowRequests;
