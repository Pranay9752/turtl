import { AccountContext } from "@/context/AccountContext"
import { useContext, useState } from "react"

const Request = () => {

    const {userInter,userRegistry,user,address} = useContext(AccountContext)
    const [req,setReq] = useState([])
    async function getFollowRequest() {
        const followRequest = await userInter.methods.getFollowRequests(address).call()
        return followRequest
    }
    const requests = getFollowRequest()
    
    const data = requests.then(async function (request)  {
      let arr = new Array()
      console.log(request)
      for(let i=0;i<request.length;i++){
        let u = await userRegistry.methods.getUserByAddress(r).call()
        u.then(async function (ui){
          console.log(ui)
        })
      }
    })
    

  return (
    <>{console.log(data.then((t)=> {return t} ))
      }</>
  )
}

export default Request