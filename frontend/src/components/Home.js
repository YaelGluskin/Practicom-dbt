import {Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArticlesList from '../features/ArticleList';

const Home = () => {
  const navigate = useNavigate();
  const options = ['option1', 'option2', 'option3', 'option4', 'option5']; // Replace with your actual options

  const handleNewArticle = () => {
    navigate('/home/newArticle');
  };

  return (
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
