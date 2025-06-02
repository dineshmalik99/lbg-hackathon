import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import AudienceBuilder from './pages/AudienceBuilder';
import History from './pages/History';

const App = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1 }}>
        <TopBar sx={{ width: '100vw' }}/>

        <Box sx={{ p: 2 }}>
          <Routes>
            <Route path="/" element={<AudienceBuilder />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
