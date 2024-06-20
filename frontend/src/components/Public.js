import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Public() {
    const navigate = useNavigate() // Hook to navigate to different routes
    const handleLoginRegister = () => navigate(`/login`);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Plan a trip
                    </Typography>
                    <Button color="inherit" onClick={handleLoginRegister}>
                        Login/Register
                    </Button>
                </Toolbar>
            </AppBar>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h4">
                    Welcome to the Trip Planner!
                </Typography>
            </Box>
        </div>
    );
}

export default Public;
