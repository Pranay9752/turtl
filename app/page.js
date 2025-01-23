"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import FollowRequests from "./components/followRequests";
import Post from "./components/post";
import { useAccountContext } from "./account/context/AccountContext";
import { makeStorageClient } from "./utils/storage";
import FollowUsers from "./components/users";
import useIPFS from "./_hooks/ipfshook/useipfs";
import { Heart, User } from "lucide-react";

const PostsGrid = ({ blockPosts, getIPFSUrl }) => {
  console.log("blockPosts: ", blockPosts);
  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900 transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blockPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-xl transform transition-all hover:scale-105 hover:shadow-xl dark:hover:shadow-2xl duration-300"
          >
            <div className="flex items-center p-4 space-x-4">
              <img
                src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${post.userImage}`}
                alt="avatar"
                className="w-12 h-12 rounded-full ring-2 ring-indigo-200 dark:ring-indigo-600"
              />
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {post.username}
              </span>
            </div>
            <div className="relative group">
              <img
                src={getIPFSUrl(post.cid)}
                alt="post"
                className="w-full h-64 object-cover rounded-b-xl"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const { userInter, userRegistry, postContract } = useAccountContext();

  const [userData, setUserData] = useState({
    ids: [],
    posts: [],
    username: "",
    image: "",
    imgNames: [],
  });
  const [blockPosts, setBlockPosts] = useState([]);

  const { getIPFSUrl } = useIPFS("pinata");

  const loadPosts = async () => {
    const followers = await userInter.methods
      .getFollowers(window.ethereum.selectedAddress)
      .call();
    const promises = followers.map(async (address) => {
      const user = await userRegistry.methods.getUserByAdd(address).call();
      return user;
    });
    const results = await Promise.allSettled(promises);
    const users = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);
    let updated_posts = [];
    const user_posts = await Promise.all(
      users.map(async (user) => {
        const posts = await postContract.methods
          .getLatestPosts([user.userAddress])
          .call();
        const userInfo = {
          username: user.username,
          userAddress: user.userAddress,
          userImage: user.image,
        };
        const updated_posts = posts.map((post) => ({
          ...post,
          ...userInfo,
        }));
        return updated_posts; // Return posts instead of directly modifying `b`
      })
    );

    // Flatten the array of posts into `b`
    updated_posts = user_posts
      .flat()
      .filter((post) => !post.postName?.includes(".json"));

    setBlockPosts(updated_posts || []);

    ///////////////
    const latestposts = await postContract.methods
      .getLatestPosts(followers)
      .call();

    setUserData((prev) => ({
      ...prev,
      ids: users?.map((user) => user.id) || [],
      username: users?.[0]?.username || "", // Set the username and image from the first user (followers list).
      image: users?.[0]?.image || "",
    }));

    const posts = await Promise.all(
      users.map((user) => postContract.methods.getLatestPosts(followers).call())
    );
    setUserData((prev) => ({
      ...prev,
      posts: posts,
    }));

    const imgNames = posts.flat().reduce((names, post) => {
      if (!post.postName.endsWith(".json")) {
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
  }, [userInter, userRegistry, postContract]);

  return (
    <>
      <div className="h-[100svh]">
        <Navbar />
        <div className="h-full">
          <div className="grid grid-cols-[30rem,70%] gap-2 divide-x divide-gray-400 h-full">
            <div className="mt-1">
              <FollowRequests />
              <FollowUsers />
            </div>
            <PostsGrid getIPFSUrl={getIPFSUrl} blockPosts={blockPosts} />
            {/* <div className="">
              <p className="btn btn-ghost normal-case text-xl">Posts</p>
              <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-2 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                  {blockPosts.map((post, index) => (
                    <div
                      key={index}
                      className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                      <div className="flex m-3">
                        <label
                          tabIndex={index}
                          className="btn btn-ghost btn-circle avatar"
                        >
                          <div className="w-10 rounded-full">
                            <img
                              src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${post.image}`}
                              height="28"
                              width="28"
                            />
                          </div>
                        </label>
                        <div className="flex  justify-start items-center content-center">
                          <span className="text-base font-bold text-gray-900 dark:text-white">
                            {post.username}
                          </span>
                        </div>
                      </div>
                      <a href="#">
                        <img
                          className=" rounded-b-lg bg-yellow-400"
                          src={getIPFSUrl(post.cid)}
                          alt="product image"
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
