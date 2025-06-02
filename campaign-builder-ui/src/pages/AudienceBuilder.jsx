import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';

import AudienceFilters from '../components/AudienceFilters';
import StageAudienceButton from '../components/StageAudienceButton';
import SavedAudiencesTable from '../components/SavedAudiencesTable';
import ToastSnackbar from '../components/ToastSnackbar';
import NewAudienceForm from '../components/NewAudienceForm';
import AudienceTable from '../components/AudienceTable';

const AudienceBuilder = () => {
    const [audiences, setAudiences] = useState([]);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

    // const [productType, setProductType] = useState('all');
    // const [stagedAudiences, setStagedAudiences] = useState([]);
    // const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

    // const [exclusions, setExclusions] = useState({
    //     deceased: false,
    //     over70: false
    // });

    const handleSubmit = (newAudience) => {
        const updatedAudiences = [...audiences, newAudience];
        setAudiences(updatedAudiences);
        localStorage.setItem('audiences', JSON.stringify(updatedAudiences));
        setToast({ open: true, message: 'Audience created', severity: 'success' });
    };

    const handleDelete = (audienceId) => {
        const updated = audiences.filter((a) => a.id !== audienceId);
        setAudiences(updated);
        localStorage.setItem('audiences', JSON.stringify(updated));
    };

    useEffect(() => {
        const saved = localStorage.getItem('audiences');
        if (saved) {
            setAudiences(JSON.parse(saved));
        }
    }, []);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Audience Builder
            </Typography>

            <NewAudienceForm onSubmit={handleSubmit} />

            <AudienceTable audiences={audiences} onDelete={handleDelete} />
            {/* <AudienceFilters
                productType={productType}
                setProductType={setProductType}
                exclusions={exclusions}
                setExclusions={setExclusions}
            />

            <StageAudienceButton
                onStage={handleStage}
                productType={productType}
                exclusions={exclusions}
            />


            <SavedAudiencesTable
                audiences={stagedAudiences}
                setAudiences={setStagedAudiences}
                onDelete={handleDelete}
            /> */}

            {/* 4. Toasts */}
            <ToastSnackbar toast={toast} setToast={setToast} />
        </Box>
    );
};

export default AudienceBuilder;
