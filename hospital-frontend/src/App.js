import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Medicines from './pages/Medicines';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const toggleSidebar = () => {
    if (isDesktop) setIsSidebarOpen(!isSidebarOpen);
  };

  // Listen for screen size changes
  useEffect(() => {
    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 768;
      setIsDesktop(isNowDesktop);
      if (!isNowDesktop) {
        setIsSidebarOpen(false); // Hide sidebar on small screens
      } else {
        setIsSidebarOpen(true); // Show on desktop
      }
    };

    handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className="d-flex">
        {isDesktop && <Sidebar isSidebarOpen={isSidebarOpen} />}
        <div style={{ flex: 1, marginLeft: isDesktop && isSidebarOpen ? 220 : 0 }}>
          <Navbar toggleSidebar={toggleSidebar} isDesktop={isDesktop} />
          <div className="p-3">
            <Routes>
              <Route path="/" element={<Patients />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/medicines" element={<Medicines />} />
            </Routes>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
