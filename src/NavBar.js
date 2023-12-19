// NavBar.js
import React, { useState } from 'react';
import {Link} from "react-router-dom";
import CustomLink from './CustomLink';
import './App.css';

const NavBar = () => {
  const [selected, setSelected] = useState("Time");

  const handleClick = (e) => {
    setSelected(e.target.innerText);
  };
//Clients, Empoyees, Reporting, and Staff are only accesible to admin
  return (
    <div className="navbar">
      {["Time", "Expenses",  "Tickets", "Employees", "Details", "Dashboard",].map(button => (
        <CustomLink 
        to={`/${button.toLowerCase()}`} 
        key={button}
        onClick={()=>setSelected(button)}
      >
        <button 
          
          className={`nav-button ${button === selected ? "selected" : ""}`}
          onClick={handleClick}
        >
          {button}
        </button>
        </CustomLink>
      ))}
    </div>
  );
};

export default NavBar;
