import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("")


  const handleChange = (e) => {
    const target = e.target
    const name = target.name
    const value = target.value
    setEmail(value)
    
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("DATA SUBMITTED", email)
  }
  return (
    <div>
        <Navbar/>
        
        <div className="forgot-password-form-div">
        <h3>Please enter your e-mail adress below to reset your password</h3>
          <form className="forgot-password-form" onSubmit={handleSubmit}>
            <label htmlFor='emaile'>E-mail:</label>
            <input id="email" name="email" onChange={handleChange}/>
            <button type='submit'>Submit</button>

          </form> 


        </div>
        <Footer/>
        
    </div>
  )
}

export default ForgotPassword