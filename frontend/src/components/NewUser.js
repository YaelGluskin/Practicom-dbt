import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Typography } from '@mui/material';

function Welcome() {
  const { username } = useParams();
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Welcome, {username}!
      </Typography>
      <Button variant="contained" color="primary" onClick={() => {navigate('/Home')}} fullWidth>
        Go to Home
      </Button>
      
      <div style={{ marginTop: '10px' }}></div>
      
      <Button variant="contained" color="primary" onClick={() => {navigate('/Questionnaire')}} fullWidth>
        Add Your Preferences
      </Button>
    </Container>
  );
}

export default Welcome;

