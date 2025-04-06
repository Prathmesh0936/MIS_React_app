import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import Dashboard from "../Pages/Dashboard";
import Invoice from "../Pages/Invoice";

export default function AppRoutes() {
  return (
      <Router>
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/invoice' element={<Invoice/>} />
        </Routes>
      </Router>
  );
}
