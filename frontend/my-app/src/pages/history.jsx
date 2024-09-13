import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton, Snackbar } from '@mui/material';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch (err) {
                setError('Failed to fetch history.');
                setOpen(true);
            }
        };

        fetchHistory();
    }, [getHistoryOfUser]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleCloseSnackbar = () => {
        setOpen(false);
    };

    return (
        <Box>
            <IconButton onClick={() => navigate('/home')}>
                <HomeIcon />
            </IconButton>
            {meetings.length > 0 ? (
                meetings.map((e) => (
                    <Card key={e.id} variant="outlined" sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Code: {e.meetingCode}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Date: {formatDate(e.date)}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography>No meetings found.</Typography>
            )}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                message={error}
                onClose={handleCloseSnackbar}
            />
        </Box>
    );
}
