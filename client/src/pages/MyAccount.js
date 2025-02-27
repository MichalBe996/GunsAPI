import React from 'react'
import Navbar from './Navbar'
import { jwtDecode } from 'jwt-decode'
import Cookies from "js-cookie"
import axios from 'axios'

const MyAccount = () => {
  
  const [accountData, setAccountData] = React.useState({

  })
  React.useEffect(()=>{
    axios.get(`http://localhost:5000/api/v1/users/${jwtDecode(Cookies.get("jwt")).id}`)
    .then(res=>{
      setAccountData(prevState => res.data.data.singleUser)

      console.log("ACCOUNT DATA:", accountData)
    })
  }, [])

  return (
    <div>
        <Navbar/>
        <div className="my-account-body">
        <h1>Hello, {accountData.name}!</h1>
        <h3>E-mail: {accountData.email}</h3>
        <div className='account-buttons-div'>
          <button>Change email</button>
          <button>Change password</button>
        </div>
        
        </div>
    </div>
  )
}

export default MyAccount