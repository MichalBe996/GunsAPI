import React from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import target from "../target.png"
import Cookies from "js-cookie"
import {jwtDecode} from "jwt-decode"


const Navbar = () => {
    /// refactor section below as while rendering user can see text switch between logged in user and not logged in
    const [token, setToken] = React.useState("")
    React.useEffect(()=> {
      if(Cookies.get("jwt")){
        setToken(jwtDecode(Cookies.get("jwt")))
      }
    }, [])
    
    
  
    

  const navigate = useNavigate();
  const homeRedirect = () => {
    navigate("/");
  }
  const cartRedirect = () => {
    navigate("/cart");
  }
  const loginRedirect = () => {
    navigate('/login')
  }
  const registerRedirect = () => {
    navigate("/register")
  }
  const aboutRedirect = () => {
    navigate("/about")
  }
  const myAccountRedirect = () => {
    navigate("/my-account");
  }
  const logoutUser = () => {
    Cookies.remove("jwt")
    setToken("")
    navigate("/")
  }
  
  
  
  
  return (
    <nav className="nav-navbar">


    
        <div className="header--header" onClick={homeRedirect}>
            <h1 className="header">GunsApp</h1>
            <img className="target--logo" src={target}></img>
            
            
        </div>
        <div className="buttons--navbar">
          <span className="dropdown-menu">
            MENU
          </span>
          <div className='dropdown-content'>
          <button onClick={homeRedirect}>Home</button>
            <button onClick={cartRedirect}>Cart</button>
            {(token ==="") && <button onClick={registerRedirect}>Register</button>
            }
            {(token ==="") && <button onClick={loginRedirect}>Login</button>
            }
            {(token !== "") && <button onClick={(myAccountRedirect)}>My Account</button>}
            {(token !== "") && <button onClick={(logoutUser)}>Logout</button>}
            
            
            <button onClick={aboutRedirect}>About</button>
          </div>
            
            
        </div>
    
    <Outlet/>




    </nav>
    
  )
}

export default Navbar