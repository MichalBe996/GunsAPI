import React from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import target from "../target.png"


const Navbar = () => {
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
  return (
    <nav className="nav-navbar">


    
        <div className="header--header" onClick={homeRedirect}>
            <h1 className="header">GunsApp</h1>
            <img className="target--logo" src={target}></img>
        </div>
        <div className="buttons--navbar">
            <button onClick={homeRedirect}>Home</button>
            <button onClick={cartRedirect}>Cart</button>
            <button>Register</button>
            <button onClick={loginRedirect}>Login</button>
            <button>About</button>
        </div>
    
    <Outlet/>




    </nav>
    
  )
}

export default Navbar