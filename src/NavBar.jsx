import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div style={{padding:"10px",background:"#f0f0f0"}}>
      <Link to="/">Home</Link> ||{" "}
      <Link to="/about">About</Link> ||{" "}
      <Link to="/services">Services</Link> ||{" "}
      <Link to="/contact">Contact</Link> || {" "}
      <Link to="/login">Login</Link> || {" "}
      <Link to="/Register">Register</Link>
    </div>
  )
}

export default NavBar