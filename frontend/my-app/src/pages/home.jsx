import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, TextField, Box, Typography } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';
import withAuth from '../utils/withAuth';
import "../Home.css";
import AiImage from '../../src/png1.jpg';

function HomeComponent() {
    const navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    const handleJoinVideoCall = async () => {
        try {
            await addToUserHistory(meetingCode);
            navigate(`/${meetingCode}`);
        } catch (err) {
            // Handle error (e.g., show an error message)
            console.error("Failed to join video call:", err);
        }
    };

    return (
        <>
            <div className="navBar">
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
                    <Typography variant="h4">GenAi Venturers</Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton onClick={() => navigate("/history")} aria-label="History">
                            <RestoreIcon />
                        </IconButton>
                        <Typography>History</Typography>
                        <Button onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/auth");
                        }}>
                            Logout
                        </Button>
                    </Box>
                </Box>
            </div>

            <div className="meetContainer">
                <Box className="leftPanel" sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 ,color:'black'}}>
                    <Typography variant="h5">Empowering Inclusivity with Edge Cutting Solution</Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            onChange={(e) => setMeetingCode(e.target.value)}
                            id="outlined-basic"
                            label="Meeting Code"
                            variant="outlined"
                        />
                        <Button onClick={handleJoinVideoCall} variant='contained'>
                            Join
                        </Button>
                    </Box>
                </Box>
                <Box className="rightPanel" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={AiImage} alt="Logo" />
                </Box>
            </div>
        </>
    );
}

export default withAuth(HomeComponent);
