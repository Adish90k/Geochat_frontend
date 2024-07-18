import React from 'react';
import "./Header.css";
import { useNavigate } from "react-router-dom";


function Header() {
    const user = localStorage.getItem("user"); 
    const username = JSON.parse(user);
    const navigate = useNavigate();
  return (
    <div className="header-container">
      <nav className="navbar">
        <ul className="nav-list left-nav">
          <li className="nav-item">{username}</li>
        </ul>
        <ul className="nav-list right-nav">
          <li className="nav-item" onClick={()=>navigate("/login")}>Login</li>
          <li className="nav-item" onClick={()=>navigate("/register")}>Register</li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
