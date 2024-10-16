import React from 'react'
import Navbar from './Navbar';
import axios from 'axios';

const LoginPage = () => {
    const [loginData, setLoginData] = React.useState({})
    const [message, setMessage] = React.useState('');
    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setLoginData({
            ...loginData,
            [name]: value
        })
        
    }
    const handleSubmit = async (e)=> {
        e.preventDefault()
        try {
            const response = await axios.post("https://localhost:5000/api/v1/users/login", {loginData});
            setMessage(response.data.message)
            console.log(response)
            alert("User successfully logged in!")
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage('An error occurred');
        }
        
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
            </div>

        </div>
    </div>
  )
}

export default LoginPage;