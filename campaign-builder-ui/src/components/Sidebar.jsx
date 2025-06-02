import React from 'react';
import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer variant="permanent" sx={{ width: 240 }}>
      <List sx={{ width: 240 }}>
        <ListItemButton onClick={() => navigate('/')}>
          <ListItemText primary="Audience Builder" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/history')}>
          <ListItemText primary="History" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
