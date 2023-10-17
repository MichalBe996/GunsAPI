import React from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import target from "../target.png"


const Navbar = () => {
  const navigate = useNavigate();
  const homeRedirect = () => {
    navigate("/");
  }
  return (
    <nav className="nav-navbar">


    
        <div className="header--header" onClick={homeRedirect}>
            <h1 className="header">GunsApp</h1>
            <img className="target--logo" src={target}></img>
        </div>
        <div className="buttons--navbar">
            <button>Test</button>
            <button>Test</button>
            <button>Test</button>
        </div>
    
    <Outlet/>




    </nav>
    
  )
}

export default Navbar