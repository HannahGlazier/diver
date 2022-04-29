import React from 'react'
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="header">Header
      <NavLink to="/">Home</NavLink>
      <NavLink to="/addLog">Add Dive Log</NavLink>
      <NavLink to="/addSite">Add Dive Site</NavLink>
      <NavLink to="/profile">Profile Page</NavLink>
    </div>
  )
}

export default Header