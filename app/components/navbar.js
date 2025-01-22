import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { makeStorageClient } from "../utils/storage";
import crypto from "crypto";
import generateBinaryTree from "../utils/genBinTree";
import { useAccountContext } from "../account/context/AccountContext";
import useIPFS from "../_hooks/ipfshook/useipfs";

const Navbar = () => {
  const { postContract } = useAccountContext();
  const [image, setImage] = useState(null);
  const [contentID, setContentID] = useState("");

  const { uploadToPinata, getIPFSUrl, isUploading, error } = useIPFS("pinata");

  const storeFiles = async (file) => {
    const files = [file];
    const client = makeStorageClient();
    const cid = await client.put(files);
    return cid;
  };

  const handleUpload = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  const hashContent = async () => {
    const contentKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", contentKey, iv);
    let ciphertext = cipher.update(contentID, "utf8", "hex");
    ciphertext += cipher.final("hex");
    return [contentKey, iv, ciphertext];
  };

  const formTree = async (contentKey, iv, ciphertext) => {
    const publicKey = window.localStorage.getItem("publicKey");
    const followerPublicKeys = new Array(8).fill(publicKey);

    return generateBinaryTree(contentKey, iv, ciphertext, followerPublicKeys);
  };

  const handleSubmit = async (image) => {
    console.log('image: ', image);
    if (!image) {
      return alert("Please select a file to upload");
    }

    try {
      const rcid = await uploadToPinata(image);
      console.log('rcid: ', rcid);
      // const rcid = await storeFiles(image);
      setContentID(rcid);

      // await handleUpload();

      const contentKey = await hashContent();
      const tree = await formTree(contentKey[0], contentKey[1], contentKey[2]);

      const id = Math.floor(Math.random() * 1001);
      const blob = new Blob([JSON.stringify(tree)], {
        type: "application/json",
      });
      const name = `${window.localStorage.getItem("username")}-${id}.json`;
      const file = new File([blob], name);
      const cid = await uploadToPinata(file);
      // const cid = await storeFiles(file);

      const userId = window.localStorage.getItem("id");
      console.log('userId, image.name, rcid: ', userId, image.name, rcid);
      await postContract.methods
        .createPost(userId, image.name, rcid)
        .send({ from: window.ethereum.selectedAddress });
      const tx = await postContract.methods
        .createPost(userId, name, cid)
        .send({ from: window.ethereum.selectedAddress });

    } catch (error) {
      console.error("Error during form submission:", error);
      // Handle errors here or show an error message to the user.
    }
  };

  // useEffect(() => {
  //   if (image) handleSubmit();
  // }, [image]);

  const handleChange = async (e) => {
    console.log('e: ', e);
    const file = e.target.files?.[0];
    console.log('file: ', file);
    if (!file) return;
    setImage(file);
    handleSubmit(file);
    // const cid = await uploadToPinata(file);
    // console.log("first", cid)
  };

  return (
    <div className="navbar bg-base-100 px-4 py-2 shadow-md">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl font-semibold">
          Turtl
        </a>
      </div>

      <div className="flex-none space-x-4">
        {/* Upload Image Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.5em"
                viewBox="0 0 448 512"
                className="text-gray-800"
              >
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg>
            </div>
          </label>

          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow-lg rounded-lg"
          >
            <div className="card-body">
              <span className="font-bold text-lg">Upload Image</span>
              <div className="card-actions">
                <label className="btn btn-primary btn-block">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                    required={true}
                  />
                  <span>Upload</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* User Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
              <img
                src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${window.localStorage.getItem(
                  "image"
                )}`}
                alt="User Avatar"
                className="object-cover w-full h-full"
              />
            </div>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow-lg bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/account/logout" legacyBehavior>
                <a className="text-red-500">Logout</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
