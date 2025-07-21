import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();

  const sidebarStyle = {
    width: '220px',
    backgroundColor: '#f8f9fa',
    height: '100vh',
    paddingTop: '20px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.05)',
    position: 'fixed',
    top: 0,
    left: isSidebarOpen ? 0 : '-220px',
    transition: 'left 0.3s ease-in-out',
    zIndex: 1050,
  };

  const linkStyle = (path) => ({
    display: 'block',
    padding: '12px 20px',
    color: location.pathname === path ? '#007bff' : '#333',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    textDecoration: 'none',
    backgroundColor: location.pathname === path ? '#e9f5ff' : 'transparent',
    borderRadius: '4px',
    marginBottom: '10px',
  });

  return (
    <div style={sidebarStyle}>
      <ul className="list-unstyled">
        <li><Link to="/" style={linkStyle('/')}>Patients</Link></li>
        <li><Link to="/doctors" style={linkStyle('/doctors')}>Doctors</Link></li>
        <li><Link to="/appointments" style={linkStyle('/appointments')}>Appointments</Link></li>
        <li><Link to="/medicines" style={linkStyle('/medicines')}>Medicines</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
