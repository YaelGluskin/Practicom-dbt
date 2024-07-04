import {Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArticlesList from '../features/ArticleList';

const Home = () => {  
  const navigate = useNavigate(); // Add the useNavigate hook to navigate to the new article form
  const options = ['1', '2', '3', '4', '5']; // Replace with your actual options

  const handleNewArticle = () => { // Add a new function to handle the new article button click
    navigate('/home/newArticle'); // Navigate to the new article form
  };

  return ( // Replace the JSX in the return statement with the following code
    <Box sx={{ padding: 4 }}>
      <Typography variant="h3" gutterBottom>
        Plan a Trip
      </Typography>
      <Button type="button" variant="contained" color="primary" onClick={handleNewArticle}>
        New Article
      </Button>
      {options.map((option, index) => (
        <Box key={index} sx={{ marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>
            {option}
          </Typography>
          <ArticlesList option={option} />
        </Box>
      ))}
    </Box>
  );
};

export default Home;
