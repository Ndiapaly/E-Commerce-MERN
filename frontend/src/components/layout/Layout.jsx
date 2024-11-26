import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
