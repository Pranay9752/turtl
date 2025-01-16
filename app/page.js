"use client"
import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import FollowRequests from './components/followRequests';
import Post from './components/post';
import { useAccountContext } from './account/context/AccountContext';
import { makeStorageClient } from './utils/storage';
import FollowUsers from './components/users';

export default function Home() {
  const { userInter, userRegistry, postContract } = useAccountContext();
  const [userData, setUserData] = useState({
    ids: [],
    posts: [],
    username: '',
    image: '',
    imgNames: [],
  });

  const loadPosts = async () => {
    const followers = await userInter.methods.getFollowers(window.ethereum.selectedAddress).call();
    const promises = followers.map(async (address) => {
      const user = await userRegistry.methods.getUserByAdd(address).call();
      return {
        id: user.id,
        username: user.username,
        image: user.image,
      };
    });
    const results = await Promise.allSettled(promises);
    const users = results
      .filter((result) => result.status === 'fulfilled')
      .map((result) => result.value);
    setUserData((prev) => ({
      ...prev,
      ids: users.map((user) => user.id),
      username: users[0].username, // Set the username and image from the first user (followers list).
      image: users[0].image,
    }));

    const posts = await Promise.all(users.map((user) => postContract.methods.getLatestPostsForUser(user.id).call()));
    setUserData((prev) => ({
      ...prev,
      posts: posts,
    }));

    const imgNames = posts.flat().reduce((names, post) => {
      if (!post.postName.endsWith('.json')) {
        names.push(post.postName);
      }
      return names;
    }, []);
    setUserData((prev) => ({
      ...prev,
      imgNames: imgNames,
    }));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <div>
          <div className="grid grid-cols-3 gap-2 divide-x divide-gray-400">
            <div className="col-span-1 mt-1">
              <FollowRequests />
              <FollowUsers />
            </div>
            <div className="col-span-2">
              <p className="btn btn-ghost normal-case text-xl">Posts</p>
              <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-2 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                  {userData.imgNames.map((name, index) => (
                    <div key={index} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <div className="flex m-3">
                        <label tabIndex={index} className="btn btn-ghost btn-circle avatar">
                          <div className="w-10 rounded-full">
                            <img src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${userData.image}`} height="28" width="28" />
                          </div>
                        </label>
                        <div className="flex  justify-start items-center content-center">
                          <span className="text-base font-bold text-gray-900 dark:text-white">{userData.username}</span>
                        </div>
                      </div>
                      <a href="#">
                        <img className=" rounded-b-lg bg-yellow-400" src={`/images/${name}`} alt="product image" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
