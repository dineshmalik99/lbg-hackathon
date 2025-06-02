import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Box
} from '@mui/material';

const ScheduleModal = ({ open, onClose, onSchedule }) => {
    const [location, setLocation] = useState('');
    const [frequency, setFrequency] = useState('');

    const handleSchedule = () => {
        onSchedule({ location, frequency });
        onClose();
        setLocation('');
        setFrequency('');
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Schedule Export</DialogTitle>
            <DialogContent dividers>
                <Box display="flex" flexDirection="column" gap={3} mt={1}>
                    <TextField
                        label="Output Location (e.g., /storage/output/audience.csv)"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel>Frequency</InputLabel>
                        <Select
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                            label="Frequency"
                        >
                            <MenuItem value="once">Once</MenuItem>
                            <MenuItem value="daily">Daily</MenuItem>
                            <MenuItem value="weekly">Weekly</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSchedule} disabled={!location || !frequency}>
                    Confirm Schedule
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ScheduleModal;
