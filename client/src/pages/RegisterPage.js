import React from 'react'
import Navbar from './Navbar'
import axios from 'axios'

const RegisterPage = () => {
    axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
    const [registerData, setRegisterData] = React.useState({})
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
        const headers = {
            'Content-Type': 'text/plain'
        };
        await axios.post(
            "http://localhost:5000/api/v1/users/signup",
            {
                name: registerData.name,
                email: registerData.email,
                password: registerData.password,
                passwordConfirm: registerData.passwordConfirm
            },
            {headers}
        ).then(response=>{
            console.log("Success ======>", response)
        }).catch(error=>{
            console.log("Error====>", error)
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