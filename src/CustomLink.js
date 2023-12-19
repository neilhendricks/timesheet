// CustomLink.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomLink = ({ to, children, onClick }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(to);
    if(onClick) {
      onClick();
    }
  };
  
  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
};

export default CustomLink;
