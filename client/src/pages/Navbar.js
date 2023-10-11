import React from 'react'
import { Outlet, Link } from "react-router-dom";
import target from "../target.png"

const Navbar = () => {
  return (
    <nav className="nav-navbar">


    
        <div className="header--header">
            <h1 className="header">GunsApp</h1>
            <img className="target--logo" src={target}></img>
        </div>
        <div clasName="buttons--navbar">
            <button>Test</button>
            <button>Test</button>
            <button>Test</button>
        </div>
    
    <Outlet/>




    </nav>
    
  )
}

export default Navbar