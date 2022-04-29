
import React from 'react'
import { NavLink } from "react-router-dom";

function Header({ handleLogoutClick }) {
  return (
    <div >
      <div className="ui secondary pointing menu">
        <NavLink to="/" className="item">
          Home
        </NavLink>
        <NavLink to="/addLog" className="item">
          Add Dive Log
        </NavLink>
        <NavLink to="/addSite" className="item">
          Add Dive Site
        </NavLink>
        <NavLink to="/profile" className="item">
          Profile
        </NavLink>
        <div className="right menu">
          <button 
            className="ui item"
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="ui segment">
        <p></p>
      </div>
    </div>
  )
}

export default Header

// import React from 'react'
// import { NavLink } from "react-router-dom";

// function Header() {
//   return (
//     <div className="header">Header
//       <NavLink to="/">Home</NavLink>
//       <NavLink to="/addLog">Add Dive Log</NavLink>
//       <NavLink to="/addSite">Add Dive Site</NavLink>
//       <NavLink to="/profile">Profile Page</NavLink>
//     </div>
//   )
// }

// export default Header