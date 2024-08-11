import { useContext } from 'react'; // Import the useContext hook
import { UserContext } from '../Hooks/UserContext';  // Import the UserContext
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArticlesList from '../features/ArticleList';

const Home = () => {
  const navigate = useNavigate(); // Add the useNavigate hook to navigate to the new article form
  const options = ['1', '2', '3', '4', '5']; // Replace with your actual options
  const { user } = useContext(UserContext); // Get the user from the UserContext
  const handleNewArticle = () => { // Add a new function to handle the new article button click
    navigate('articleTable'); // Navigate to the new article form
  };
  console.log(user);
  return ( // Replace the JSX in the return statement with the following code
    <Box sx={{ padding: 4 }}>
      <Typography variant="h3" gutterBottom>
        Plan a Trip
      </Typography>
      {user && user.user_role === 'Admin' &&
        <Button type="button" variant="contained" color="success" onClick={() => { navigate('AdminArea') }}>
          Admin Area
        </Button>
      }
      <br />
      <br />
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
