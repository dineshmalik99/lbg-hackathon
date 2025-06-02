import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
    Box,
    TextField,
    Button,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormControlLabel,
    Checkbox
} from '@mui/material';

const NewAudienceForm = ({ onSubmit }) => {

    const initialFormData = {
        id: '',
        name: '',
        description: '',
        message: '',
        starttime: '',
        timestamp: '',
        status: '',
        query: ''
    }
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const id = `audience-${uuidv4()}`
        const currentTimestamp = new Date().toISOString();

        setFormData({
            ...formData,
            id: id,
            timestamp: currentTimestamp,
        });

        onSubmit({
            ...formData,
            id: id,
            timestamp: currentTimestamp,
            status: "SUBMITTED"
        });

        setFormData(initialFormData);
    };

    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: 600,
                margin: 'auto',
                padding: 2,
                '& .MuiTextField-root': { marginBottom: 2, width: '100%' },
            }}
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
        >
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Create New Entry
            </Typography>

            <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <TextField
                label="Description"
                variant="outlined"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
            />
            <TextField
                label="Message"
                variant="outlined"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
            />
            <TextField
                label="Start Time"
                variant="outlined"
                name="starttime"
                type="datetime-local"
                value={formData.starttime}
                onChange={handleChange}
                required
                slotProps={{ inputLabel: { shrink: true } }}
            />

            <TextField
                label="SQL Query"
                variant="outlined"
                name="query"
                value={formData.query}
                onChange={handleChange}
                multiline
                rows={4}
                required
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                Submit
            </Button>
        </Box>
    );
};

export default NewAudienceForm;
