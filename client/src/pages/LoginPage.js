import React from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import Cookies from "js-cookie"
import { jwtDecode } from 'jwt-decode';
import {useNavigate} from "react-router-dom"


const LoginPage = () => {
    
    const navigate = useNavigate()
    
    const [loginData, setLoginData] = React.useState({})
    axios.defaults.withCredentials = true;
    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setLoginData({
            ...loginData,
            [name]: value
        })
        
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        await axios.post(
            "http://localhost:5000/api/v1/users/login",{
                email: loginData.email,
                password: loginData.password,

            },{
                headers: {
                    "Content-Type": "application/json",
                    withCredentials: true,
                    
                    
                }
            }
        )
        .then((res)=>{
        
            console.log("Server response: ", res)
        
        
            navigate("/")
        })
        .catch((err)=>{
            console.log("Server error: ", err)
        })
        
    }
    

    
  return (
    <div>
        <Navbar/>
        <div className="login-form-header">
            <h2>Enter your e-mail and password below to login to your account:</h2>
            <div className='form-div'>
                <form className='form-login' onSubmit={handleSubmit}>
                    <table>
                        <tr>
                        <td className="login-label">
                                <label htmlFor='email'>E-mail:</label>
                            </td>
                            <td className='login-textbox'>
                                <input 
                                onChange={handleChange}
                                name="email"
                                id="email"
                                type="email"/>
                            
                            </td>
                            
                        </tr>
                        <tr>
                        <td className="login-label">
                                <label htmlFor='password'>Password:</label>
                            </td>
                            <td className='login-textbox'>
                                <input 
                                onChange={handleChange}
                                name="password"
                                id="password"
                                type="password"/>
                            
                            </td>
                            
                        </tr>
                        
                    </table>
                    <button type='submit' className="login--button">
                            Login
                        </button>

                </form>
                <a className="forgot-password" href="/forgot-your-password">Forgot your password?</a>
            </div>

        </div>
    </div>
  )
}

export default LoginPage;