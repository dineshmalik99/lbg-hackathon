import React from 'react';
import { Button, Box } from '@mui/material';

const StageAudienceButton = ({ onStage, productType, exclusions }) => {
    const handleClick = () => {
        const dummyAudience = {
            id: Date.now(),
            name: `audience-${Date.now()}`,
            productType,
            exclusions,
            audienceSize: 1500,
            exclusionSize: 23, // mock logic
            segments: [],
            schedule: null,
            status: 'Not Submitted',
            lastUpdated: new Date().toISOString(),
            records: Array.from({ length: 10 }).map(() => ({
                customerId: `CUST-${Math.floor(Math.random() * 100000)}`,
                included: Math.random() > 0.1,
                segment: '',
            }))
        };

        onStage(dummyAudience);
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="warning" onClick={handleClick}>
                Stage Audience
            </Button>
        </Box>
    );
};

export default StageAudienceButton;