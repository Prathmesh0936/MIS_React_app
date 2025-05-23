// Home.jsx
import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import '../css/Home.css'; // Link to CSS file

export default function Home() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <ul className="sidebar-nav">
          <li><Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>Dashboard</Link></li>
          <li><Link to="/group" className={isActive('/group') ? 'active' : ''}>Manage Groups</Link></li>
          <li><Link to="/chain" className={isActive('/chain') ? 'active' : ''}>Manage Chain</Link></li>
          <li><Link to="/brands" className={isActive('/brands') ? 'active' : ''}>Manage Brands</Link></li>
          <li><Link to="/subzones" className={isActive('/subzones') ? 'active' : ''}>Manage SubZones</Link></li>
          <li><Link to="/estimate" className={isActive('/estimate') ? 'active' : ''}>Manage Estimate</Link></li>
          <li><Link to="/invoice" className={isActive('/invoice') ? 'active' : ''}>Manage Invoices</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <div className="header-left"><strong>Invoice</strong> | Manage Section</div>
          <div className="header-right">
            Hi User <Link to="/logout" className="logout-link">Logout</Link>
          </div>
        </div>
        <div className="form-section">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
