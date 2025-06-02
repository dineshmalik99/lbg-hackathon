import React from 'react';
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

const AudienceTable = ({ audiences, onDelete }) => {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                Audiences
            </Typography>

            {audiences.length === 0 ? (
                <Typography variant="body1" sx={{ mt: 2 }}>
                    No audiences created yet.
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Message</TableCell>
                                <TableCell>Start Time</TableCell>
                                <TableCell>Timestamp</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Query</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {audiences.map((audience) => (
                                <TableRow key={audience.id}>
                                    <TableCell>{audience.id}</TableCell>
                                    <TableCell>{audience.name}</TableCell>
                                    <TableCell>{audience.description}</TableCell>
                                    <TableCell>{audience.message}</TableCell>
                                    <TableCell>{new Date(audience.starttime).toLocaleString()}</TableCell>
                                    <TableCell>{new Date(audience.timestamp).toLocaleString()}</TableCell>
                                    <TableCell>{audience.status}</TableCell>
                                    <TableCell>{audience.query}</TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            onClick={() => onDelete(audience.id)}
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
        </Box>
    );
};

export default AudienceTable;