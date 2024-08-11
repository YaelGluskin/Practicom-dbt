import React, { useEffect, useState, useContext } from 'react';
import { Typography, Container, CardMedia, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../Hooks/UserContext';


const ArticleDetails = () => { // ArticleDetails component to display article details

  const article_id = useParams();
  console.log("ArticleDetails: ", article_id); // article_id is an object with the key 'id'
  console.log("id: ", article_id.id); // article_id.id is the value of the 'id' key
  const [article, setArticle] = useState(null); // State variable to store the fetched article data
  const navigate = useNavigate();
  const {user} = useContext(UserContext);

  useEffect(() => {
    const fetchArticle = async () => { // Function to fetch article data
      try {
        const response = await axios.get(`http://localhost:5001/article/${article_id.id}`); // Fetch article data by id
        setArticle(response.data); // Update state with fetched article data
      } catch (error) { // Catch any errors and log them to the console
        console.error('Error fetching article:', error); // Log any errors to the console 
      }
    };

    fetchArticle(); // Call the fetch function when the component mounts
  }, [article_id]); // Execute fetch when article_id changes

  if (!article) { // Show a loading message if the article data is still being fetched
    return <CircularProgress />;
  }
  console.log("article: ", article);
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {article.title}
      </Typography>
      <Typography variant="body1" paragraph>
        {article.summary}
      </Typography>
      <Typography variant="body1">
        {article.content}
      </Typography>

      <CardMedia
        component="img"
        height="140"
        image={article.image_url}
        alt={article.title}
        sx={{ objectFit: 'contain' }} // שימוש ב-objectFit contain
      />

      {user && user.user_role === 'Admin' &&
        <Button variant="contained" color="primary" onClick={() => navigate(`/home/AdminArea/articleTable/${article_id.id}/edit`)}>
          Edit Article
        </Button>
      }
    </Container>
  );
};

export default ArticleDetails;
