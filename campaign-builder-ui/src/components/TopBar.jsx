import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const TopBar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          Campaign Builder
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
