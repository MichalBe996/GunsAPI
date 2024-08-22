import React from 'react'
import Navbar from './Navbar'
import axios from 'axios'

const RegisterPage = () => {
    const [registerData, setRegisterData] = React.useState({role: "user"})
    axios.defaults.withCredentials = true;
    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setRegisterData({
            ...registerData,
            [name]: value
        })
        
    }
    const handleSubmit = async (e)=> {
        e.preventDefault()
        await axios.post(
            "http://localhost:5000/api/v1/users/signup",{
                name: registerData.name,
                email: registerData.email,
                password: registerData.password,
                passwordConfirm: registerData.passwordConfirm
            },{
                headers: {
                    "Content-Type": "application/json",
                    withCredentials: true
                    
                }
            }
        )
        .then((res)=>{
            console.log("Server response: ", res)
        })
        .catch((err)=>{
            console.log("Server error: ", err)
        })
        
    }     
  return (
    <div>
        <Navbar/>
        <div className="register--div">
            <h2>Fill the fields below to create your account:</h2>
            <form className="register--form" onSubmit={handleSubmit}>
                <table>
                <tr>
                        <td className="register-label">
                                <label htmlFor='name'>Name:</label>
                            </td>
                            <td className='register-textbox'>
                                <input 
                                onChange={handleChange}
                                name="name"
                                id="name"
                                type="name"/>
                            
                            </td>
                            
                        </tr>
                        <tr>
                        <td className="register-label">
                                <label htmlFor='email'>E-mail:</label>
                            </td>
                            <td className='register-textbox'>
                                <input 
                                onChange={handleChange}
                                name="email"
                                id="email"
                                type="email"/>
                            
                            </td>
                            
                        </tr>
                        <tr>
                        <td className="register-label">
                                <label htmlFor='password'>Password:</label>
                            </td>
                            <td className='register-textbox'>
                                <input 
                                onChange={handleChange}
                                name="password"
                                id="password"
                                type="password"/>
                            
                            </td>
                            
                        </tr>
                        <tr>
                        <td className="register-label">
                                <label htmlFor='passwordConfirm'>Confirm password:</label>
                            </td>
                            <td className='register-textbox'>
                                <input 
                                onChange={handleChange}
                                name="passwordConfirm"
                                id="passwordConfirm"
                                type="password"/>
                            
                            </td>
                            
                        </tr>
                        
                </table>
                <button type="submit">Create account</button>
            </form>
        </div>
    </div>
  )
}

export default RegisterPage