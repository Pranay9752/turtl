import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { makeStorageClient } from '../utils/storage';
import crypto from 'crypto';
import generateBinaryTree from '../utils/genBinTree';
import { useAccountContext } from '../account/context/AccountContext';

const Navbar = () => {
  const { postContract } = useAccountContext();
  const [image, setImage] = useState(null);
  const [contentID, setContentID] = useState('');

  const storeFiles = async (file) => {
    const files = [file];
    const client = makeStorageClient();
    const cid = await client.put(files);
    return cid;
  };

  const handleUpload = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('file', image);

      await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    }
  };

  const hashContent = async () => {
    const contentKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', contentKey, iv);
    let ciphertext = cipher.update(contentID, 'utf8', 'hex');
    ciphertext += cipher.final('hex');
    return [contentKey, iv, ciphertext];
  };

  const formTree = async (contentKey, iv, ciphertext) => {
    const publicKey = window.localStorage.getItem('publicKey');
    const followerPublicKeys = new Array(8).fill(publicKey);

    return generateBinaryTree(contentKey, iv, ciphertext, followerPublicKeys);
  };

  const handleSubmit = async () => {
    if (!image) {
      return alert('Please select a file to upload');
    }

    try {
      const rcid = await storeFiles(image);
      setContentID(rcid);

      await handleUpload()

      const contentKey = await hashContent();
      const tree = await formTree(contentKey[0], contentKey[1], contentKey[2]);

      const id = Math.floor(Math.random() * 1001);
      const blob = new Blob([JSON.stringify(tree)], { type: 'application/json' });
      const name = `${window.localStorage.getItem('username')}-${id}.json`;
      const file = new File([blob], name);
      const cid = await storeFiles(file);

      const userId = parseInt(window.localStorage.getItem('id'));
      await postContract.methods.createPost(userId, image.name, rcid).send({ from: window.ethereum.selectedAddress });
      const tx = await postContract.methods.createPost(userId, name, cid).send({ from: window.ethereum.selectedAddress });

      console.log(tx);
    } catch (error) {
      console.error('Error during form submission:', error);
      // Handle errors here or show an error message to the user.
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [image]);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl">
          Turtl
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
              </svg>
              {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg> */}
              {/* <span className="badge badge-sm indicator-item">8</span> */}
            </div>
          </label>
          <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              <span className="font-bold text-lg">Upload Image</span>
              <div className="card-actions">
                <label className="btn btn-primary btn-block">
                  <input type="file" className="hidden" onChange={handleChange} required={true} />
                  <span className="">Upload</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${window.localStorage.getItem('image')}`} height="20" width="20" />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {/* <li>
              <Link className="justify-between" href="/account/profile" legacyBehavior>Profile</Link>
            </li>
            <li><a>Settings</a></li> */}
            <li>
              <Link href="/account/logout" legacyBehavior>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
