import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const SegmentsModal = ({ open, onClose, onSave, existingSegments = [] }) => {
  const [segments, setSegments] = useState(existingSegments);

  const handleAddSegment = () => {
    setSegments([...segments, { name: '', filter: '' }]);
  };

  const handleUpdate = (index, key, value) => {
    const updated = [...segments];
    updated[index][key] = value;
    setSegments(updated);
  };

  const handleDelete = (index) => {
    const updated = [...segments];
    updated.splice(index, 1);
    setSegments(updated);
  };

  const handleSave = () => {
    onSave(segments);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Define Segments</DialogTitle>
      <DialogContent dividers>
        {segments.length === 0 ? (
          <Typography>No segments defined yet.</Typography>
        ) : (
          segments.map((segment, index) => (
            <Box key={index} display="flex" gap={2} mt={2} alignItems="center">
              <TextField
                label="Segment Name"
                value={segment.name}
                onChange={(e) => handleUpdate(index, 'name', e.target.value)}
                fullWidth
              />
              <TextField
                label="Filter Description"
                value={segment.filter}
                onChange={(e) => handleUpdate(index, 'filter', e.target.value)}
                fullWidth
              />
              <IconButton onClick={() => handleDelete(index)}>
                <Delete />
              </IconButton>
            </Box>
          ))
        )}

        <Button
          startIcon={<Add />}
          onClick={handleAddSegment}
          sx={{ mt: 3 }}
          variant="outlined"
        >
          Add Segment
        </Button>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save Segments
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SegmentsModal;
