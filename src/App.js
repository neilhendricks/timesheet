import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Time from "./Time";
import Expenses from "./Expenses/Expenses"
import Employees from "./Employees/Employees";
import Dashboard from "./Dashboard/Dashboard";
import Tickets from "./Tickets/Tickets";
import Details from "./Details/Details"
import NavBar from "./NavBar";
import logo from './intersoft-logo-white.png'
import './App.css';
const App = () => {
  return (
    <Router>
        <div class="header">
        <img src={logo} alt="logo" className="logo"/>
        <h1 className="title">Time Sheet</h1>
        {/* <h2 className="user">{loggedInUser}</h2> */}
      </div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Time />} index />
        <Route path="/Time" element={<Time />} index />
        <Route path="/Expenses" element={<Expenses />} />
        <Route path="/Employees" element={<Employees />} />
        <Route path="/Tickets" element={<Tickets />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Details" element={<Details/>} />
        <Route path="*" element={<div>Not Found</div>} /> {/* Optional 404 route */}
      </Routes>
    </Router>
  );
};

export default App;






