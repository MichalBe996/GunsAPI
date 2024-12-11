import React from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import target from "../target.png"
import Cookies from "js-cookie"


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
  const registerRedirect = () => {
    navigate("/register")
  }
  const aboutRedirect = () => {
    navigate("/about")
  }
  const getJWTCookie = () => {
    console.log(Cookies.get("jwt"))
  }
  
  
  
  return (
    <nav className="nav-navbar">


    
        <div className="header--header" onClick={homeRedirect}>
            <h1 className="header">GunsApp</h1>
            <img className="target--logo" src={target}></img>
            
        </div>
        <div className="buttons--navbar">
            <button onClick={getJWTCookie}>Show cookies</button>
            <button onClick={homeRedirect}>Home</button>
            <button onClick={cartRedirect}>Cart</button>
            <button onClick={registerRedirect}>Register</button>
            <button onClick={loginRedirect}>Login</button>
            <button onClick={aboutRedirect}>About</button>
        </div>
    
    <Outlet/>




    </nav>
    
  )
}

export default Navbar