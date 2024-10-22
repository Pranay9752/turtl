import { useRouter } from "next/router";
import { useState } from "react";


function Tryy() {
  const router = useRouter()
  const [key,setKey] = useState("")
  const show = () => {
    const { privateKey } = router.query
    setKey(privateKey)
  }
  
  

  return (
    <div> 
      <button onClick={show}>Click to show your secret key</button>
      {key !== "" &&
        <h2>
          You have {key} unread messages.
        </h2>
      }
    </div>
  );
}



export default Tryy;
