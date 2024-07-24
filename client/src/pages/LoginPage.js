import React from 'react'
import Navbar from './Navbar';

const LoginPage = () => {
  return (
    <div>
        <Navbar/>
        <div className="login-form-header">
            <h2>Enter your e-mail and password below to login to your account:</h2>
            <div className='form-div'>
                <form className='form-login'>
                    <table>
                        <tr>
                        <td className="login-label">
                                <label htmlFor='email'>E-mail</label>
                            </td>
                            <td className='login-textbox'>
                                <input 
                                onChange={null}
                                name="email"
                                id="email"
                                type="text"/>
                            
                            </td>
                            
                        </tr>
                        <tr>
                        <td className="login-label">
                                <label htmlFor='password'>Password</label>
                            </td>
                            <td className='login-textbox'>
                                <input 
                                onChange={null}
                                name="password"
                                id="password"
                                type="password"/>
                            
                            </td>
                            
                        </tr>
                    </table>

                </form>
            </div>

        </div>
    </div>
  )
}

export default LoginPage;