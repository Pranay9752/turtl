import { useEffect, useState } from "react";
import { useAccountContext } from "../account/context/AccountContext";
import FollowRequest from "./followRequest";
import FollowUser from "./user";

const FollowUsers = () => {
  const { userInter, userRegistry } = useAccountContext();
  const [requests, setRequests] = useState([]);

  const removeRequest = async (index, address) => {
    setRequests((prevRequests) => {
      const updatedRequests = [...prevRequests];
      updatedRequests.splice(index, 1);
      return updatedRequests;
    });
    await userInter.methods
      .follow(address)
      .send({ from: window.ethereum.selectedAddress });
  };

  useEffect(() => {
    function removeElementsFromArray(a, b, c) {
      const filteredArray = a.filter((item) => !b.includes(item));
      const removedC = filteredArray.filter(
        (item) => item.toLowerCase() !== c.toLowerCase()
      );
      return removedC;
    }

    const fetchFollower = async () => {
      try {
        const followers = await userInter.methods
          .getFollowers(window.ethereum.selectedAddress)
          .call();
        const promises = followers.map(async (address) => {
          const user = await userRegistry.methods.getUserByAdd(address).call();
          return user.userAddress;
        });
        const followers_add = await Promise.allSettled(promises);
        const allUser = await userRegistry.methods
          .getAllUsers()
          .call()
          .then((users) => {
            const user_add = users.map((user) => {
              return user.userAddress;
            });
            return user_add;
          });
        const userAdd = window.ethereum.selectedAddress;
        const usersArray = removeElementsFromArray(
          allUser,
          followers_add,
          userAdd
        );
        setRequests(usersArray);
      } catch (error) {
        console.error("Error fetching follow requests:", error);
      }
    };

    fetchFollower();
  }, [userInter]);

  return (
    <div>
      <p className="btn btn-ghost normal-case text-xl">Follow Users</p>

      <ul className="max-w-md divide-y m-4 divide-gray-200 dark:divide-gray-700">
        {requests.map((item, index) => (
          <FollowUser
            key={index}
            address={item}
            index={index}
            onRemoveRequest={removeRequest}
          />
        ))}
      </ul>
    </div>
  );
};

export default FollowUsers;
