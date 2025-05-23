import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from "./Login";
import Register from "./Register";
import Invoice from "../Pages/Invoice";
import GroupManagement from './GroupManagement';
import CustomNavbar from './Navbar';
import Home from './Home';
import ForgotPassword from './ForgotPassword';
// import Dashboard from '../Pages/Dashboard';  // Temporarily removed

export default function AppRoutes() {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />

        {/* Home is the layout with sidebar */}
        <Route path="/" element={<Home />}>
          {/* Nested routes rendered inside Home's <Outlet /> */}
          {/* <Route index element={<Dashboard />} /> */}
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="invoice" element={<Invoice />} />
          <Route path="group" element={<GroupManagement />} />
          
          {/* Add other nested routes here */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
