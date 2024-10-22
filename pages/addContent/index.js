import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { makeStorageClient } from './storage'


async function storeFiles(file) {
  const files = []
  files.push(file)
  alert(files)
  const client = makeStorageClient()
  const cid = await client.put(files)
  console.log(typeof cid)
  return cid
}

async function getFiles() {
  
  const client = makeStorageClient()
  const image = await client.get("bafybeibm4ciikf4wfrlix6bn364mfzu557ctdksyxt5m6pogi6x7apicni")
  
  return image
}

const AddContent = () => {
  
  const [image, setImage] = useState(null);

  const router = useRouter()

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      return alert("Please select a file to upload");
    }

    const cid = await storeFiles(image)
    router.push('/')
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} required={true} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default AddContent;
