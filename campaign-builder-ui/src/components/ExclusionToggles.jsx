import React from 'react';
import { Box, Typography, FormControlLabel, Switch } from '@mui/material';

const ExclusionToggles = ({ exclusions, setExclusions }) => {
  const handleToggle = (key) => {
    setExclusions({ ...exclusions, [key]: !exclusions[key] });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Hygiene Exclusions</Typography>

      <FormControlLabel
        control={
          <Switch
            checked={exclusions.deceased}
            onChange={() => handleToggle('deceased')}
          />
        }
        label="Exclude deceased customers"
      />

      <FormControlLabel
        control={
          <Switch
            checked={exclusions.over70}
            onChange={() => handleToggle('over70')}
          />
        }
        label="Exclude customers over 70"
      />
    </Box>
  );
};

export default ExclusionToggles;
