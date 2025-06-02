import React, { useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@mui/material';

import SegmentsModal from './SegmentsModal';
import ScheduleModal from './ScheduleModal';

const SavedAudiencesTable = ({ audiences, setAudiences, onDelete }) => {
    const [openSegmentModal, setOpenSegmentModal] = useState(false);
    const [openScheduleModal, setOpenScheduleModal] = useState(false);
    const [selectedAudienceId, setSelectedAudienceId] = useState(null);

    const handleOpenSegment = (audienceId) => {
        setSelectedAudienceId(audienceId);
        setOpenSegmentModal(true);
    };

    const handleOpenSchedule = (audienceId) => {
        setSelectedAudienceId(audienceId);
        setOpenScheduleModal(true);
    };

    const handleSaveSegments = (segments) => {
        const updated = audiences.map((a) =>
            a.id === selectedAudienceId ? { ...a, segments } : a
        );
        setAudiences(updated);
    };

    const handleSchedule = ({ location, frequency }) => {
        const updated = audiences.map((a) =>
            a.id === selectedAudienceId
                ? {
                    ...a,
                    status: 'Scheduled',
                    schedule: { location, frequency },
                }
                : a
        );
        setAudiences(updated);
    };

    const handleExport = (audience) => {
        const rows = [
            ['Customer ID', 'Product', 'Included?', 'Segment'],
            ...(audience.records || []).map((record) => [
                record.customerId,
                audience.productType,
                record.included ? 'Yes' : 'No',
                record.segment || '',
            ]),
        ];

        const csvContent = rows.map((r) => r.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;

        const safeName = audience.name.replace(/\s+/g, '_').toLowerCase();
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        link.download = `${safeName}_export_${timestamp}.csv`;

        link.click();
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                Staged Audiences
            </Typography>

            {audiences.length === 0 ? (
                <Typography variant="body1" sx={{ mt: 2 }}>
                    No audiences staged yet.
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Audience Name</TableCell>
                                <TableCell>Product</TableCell>
                                <TableCell>Audience Size</TableCell>
                                <TableCell>Exclusion Size</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Last Updated</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {audiences.map((audience) => (
                                <TableRow key={audience.id}>
                                    <TableCell>{audience.name}</TableCell>
                                    <TableCell>{audience.productType}</TableCell>
                                    <TableCell>{audience.audienceSize}</TableCell>
                                    <TableCell>{audience.exclusionSize}</TableCell>
                                    <TableCell>{audience.status}</TableCell>
                                    <TableCell>
                                        {new Date(audience.lastUpdated).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            sx={{ mr: 1, my: 1 }}
                                            onClick={() => handleOpenSegment(audience.id)}
                                        >
                                            Segment
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleOpenSchedule(audience.id)}
                                            sx={{ mr: 1, my: 1 }}
                                        >
                                            Schedule
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleExport(audience)}
                                            sx={{ mr: 1, my: 1 }}
                                        >
                                            Export CSV
                                        </Button>
                                        <Button 
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            onClick={()  => onDelete(audience.id)}
                                            sx={{ mr: 1, my: 1 }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <SegmentsModal
                open={openSegmentModal}
                onClose={() => setOpenSegmentModal(false)}
                onSave={handleSaveSegments}
                existingSegments={
                    audiences.find((a) => a.id === selectedAudienceId)?.segments || []
                }
            />

            <ScheduleModal
                open={openScheduleModal}
                onClose={() => setOpenScheduleModal(false)}
                onSchedule={handleSchedule}
            />
        </Box>
    );
};

export default SavedAudiencesTable;
