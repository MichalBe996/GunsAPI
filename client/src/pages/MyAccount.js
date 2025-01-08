import React from 'react'
import Navbar from './Navbar'

const MyAccount = () => {
  const [jwtToken, setjwtToken] = React.useState("")
  const [accountData, setAccountData] = React.useState({

  })
  return (
    <div>
        <Navbar/>
        <div className="my-account-body">

        </div>
    </div>
  )
}

export default MyAccount