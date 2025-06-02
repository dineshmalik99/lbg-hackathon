import React from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  IconButton,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const fieldOptions = ['Product Type', 'Product Status', 'Customer Age'];
const operatorOptions = ['=', '!=', '>', '<', 'contains'];

const FilterBuilder = ({ filters, setFilters }) => {
  const handleChange = (index, key, value) => {
    const updated = [...filters];
    updated[index][key] = value;
    setFilters(updated);
  };

  const handleAdd = () => {
    setFilters([...filters, { field: '', operator: '', value: '' }]);
  };

  const handleRemove = (index) => {
    const updated = filters.filter((_, i) => i !== index);
    setFilters(updated);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Audience Filters</Typography>

      {filters.map((filter, index) => (
        <Box
          key={index}
          sx={{ display: 'flex', gap: 2, my: 1, alignItems: 'center' }}
        >
          <TextField
            select
            label="Field"
            value={filter.field}
            onChange={(e) => handleChange(index, 'field', e.target.value)}
            sx={{ minWidth: 180 }}
          >
            {fieldOptions.map((field) => (
              <MenuItem key={field} value={field}>
                {field}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Operator"
            value={filter.operator}
            onChange={(e) => handleChange(index, 'operator', e.target.value)}
            sx={{ minWidth: 100 }}
          >
            {operatorOptions.map((op) => (
              <MenuItem key={op} value={op}>
                {op}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Value"
            value={filter.value}
            onChange={(e) => handleChange(index, 'value', e.target.value)}
            sx={{ minWidth: 200 }}
          />

          <IconButton onClick={() => handleRemove(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Button onClick={handleAdd} sx={{ mt: 1 }}>
        Add Filter
      </Button>
    </Box>
  );
};

export default FilterBuilder;
