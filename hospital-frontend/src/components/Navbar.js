import React from 'react';

const Navbar = ({ toggleSidebar, isDesktop }) => {
  const navbarStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '15px 20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'relative',
  };

  const titleStyle = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '1.25rem',
    fontWeight: 'bold',
  };

  return (
    <nav style={navbarStyle} className="d-flex align-items-center">
      {isDesktop && (
        <button
          className="btn btn-light"
          onClick={toggleSidebar}
          style={{ fontSize: '1.2rem', zIndex: 2 }}
        >
          ☰
        </button>
      )}
      <div style={titleStyle}>
        🏥 Hospital Management System
      </div>
    </nav>
  );
};

export default Navbar;
