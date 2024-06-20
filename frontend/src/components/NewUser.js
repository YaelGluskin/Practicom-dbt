import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Typography } from '@mui/material';

function Welcome() {
  const { username } = useParams();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" gutterBottom>
        Welcome, {username}!
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome} fullWidth>
        Go to Home
      </Button>
    </Container>
  );
}

export default Welcome;

