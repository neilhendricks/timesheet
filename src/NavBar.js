// NavBar.js
import React, { useState } from 'react';
import './App.css';

const NavBar = () => {
  const [selected, setSelected] = useState("Time");

  const handleClick = (e) => {
    setSelected(e.target.innerText);
  };

  return (
    <div className="navbar">
      {["Time", "Tickets", "Details", "Dashboard"].map(button => (
        <button 
          key={button} 
          className={`nav-button ${button === selected ? "selected" : ""}`}
          onClick={handleClick}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default NavBar;
