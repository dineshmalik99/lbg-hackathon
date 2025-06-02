import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from '@mui/material';

const AudienceFilters = ({ productType, setProductType, exclusions, setExclusions }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Product Type
      </Typography>

      <FormControl sx={{ width: 300 }}>
        <InputLabel>Product</InputLabel>
        <Select
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          label="Product"
        >
          <MenuItem value="all">All Products</MenuItem>
          <MenuItem value="lloyds">Lloyds XXX</MenuItem>
          <MenuItem value="bos">BOS YYY</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Hygiene Exclusions
      </Typography>

      <Box>
        <FormControlLabel
          control={
            <Switch
              checked={exclusions.deceased}
              onChange={() =>
                setExclusions({ ...exclusions, deceased: !exclusions.deceased })
              }
            />
          }
          label="Exclude deceased customers"
        />
        <FormControlLabel
          control={
            <Switch
              checked={exclusions.over70}
              onChange={() =>
                setExclusions({ ...exclusions, over70: !exclusions.over70 })
              }
            />
          }
          label="Exclude customers over 70"
        />
      </Box>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Channel Exclusions
      </Typography>

      <Box>
        <FormControlLabel
          control={
            <Switch
              checked={exclusions.deceased}
              onChange={() =>
                setExclusions({ ...exclusions, deceased: !exclusions.deceased })
              }
            />
          }
          label="Exclude deceased customers"
        />
        <FormControlLabel
          control={
            <Switch
              checked={exclusions.over70}
              onChange={() =>
                setExclusions({ ...exclusions, over70: !exclusions.over70 })
              }
            />
          }
          label="Exclude customers over 70"
        />
      </Box>
    </Box>
  );
};

export default AudienceFilters;
