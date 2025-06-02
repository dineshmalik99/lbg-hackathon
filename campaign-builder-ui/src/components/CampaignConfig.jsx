import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from '@mui/material';

const CampaignConfig = ({ filters, exclusions, segments, onGenerate }) => {
  const [fileName, setFileName] = useState(`audience-export-${new Date().toISOString().split('T')[0]}.csv`);

  const handleGenerate = () => {
    onGenerate(fileName); // call back to parent to generate export
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Export Configuration</Typography>

      {/* File Name Input */}
      <TextField
        fullWidth
        label="Output File Name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        sx={{ my: 2 }}
      />

      <Divider sx={{ my: 2 }} />

      {/* Summary */}
      <Typography variant="subtitle1">Summary:</Typography>
      <Typography variant="body2">Filters: {filters.length}</Typography>
      <Typography variant="body2">Exclusions: {Object.keys(exclusions).filter(k => exclusions[k]).join(', ') || 'None'}</Typography>
      <Typography variant="body2">Segments: {segments.length}</Typography>

      {/* Generate Button */}
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleGenerate}>
          Generate Export
        </Button>
      </Box>
    </Box>
  );
};

export default CampaignConfig;
