import { useRouter } from "next/router";
import { useState } from "react";
import Link from 'next/link'


function Secretkey() {
  const router = useRouter()
  const [key,setKey] = useState("")
  const show = () => {
    const { privateKey } = router.query
    setKey(privateKey)
  }
  
  return (
    <div>
      <Link href={`/`}>
            Go to home
          </Link>
      <button onClick={show}>Click to show your secret key</button>
      {key !== "" &&
        <h2>
          {key}
        </h2>
      }
      
    </div>
  )
}



export default Secretkey;
