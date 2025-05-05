import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

// Basic placeholder for Layout - usually contains header, sidebar, etc.
const Layout = ({ user, onLogout }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Placeholder for potential Sidebar */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Placeholder for potential Header/Toolbar */}
        <p>Layout Placeholder (User: {user ? user.username : 'None'})</p>
        <button onClick={onLogout}>Logout</button>
        <hr />
        {/* Child routes will render here */}
        <Outlet /> 
      </Box>
    </Box>
  );
};

export default Layout;

