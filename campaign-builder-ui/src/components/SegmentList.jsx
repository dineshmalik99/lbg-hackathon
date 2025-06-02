import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterBuilder from './FilterBuilder';

const SegmentList = ({ segments, setSegments }) => {
  const [newSegmentName, setNewSegmentName] = useState('');

  const handleAddSegment = () => {
    if (!newSegmentName.trim()) return;

    const newSegment = {
      name: newSegmentName.trim(),
      filters: [],
    };

    setSegments([...segments, newSegment]);
    setNewSegmentName('');
  };

  const updateSegmentFilters = (index, filters) => {
    const updated = [...segments];
    updated[index].filters = filters;
    setSegments(updated);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Audience Segments</Typography>

      {/* Add Segment Section */}
      <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
        <TextField
          label="Segment Name"
          value={newSegmentName}
          onChange={(e) => setNewSegmentName(e.target.value)}
        />
        <Button variant="outlined" onClick={handleAddSegment}>
          Add Segment
        </Button>
      </Box>

      {/* Render each segment with filters */}
      {segments.map((segment, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{segment.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FilterBuilder
              filters={segment.filters}
              setFilters={(filters) => updateSegmentFilters(index, filters)}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default SegmentList;
