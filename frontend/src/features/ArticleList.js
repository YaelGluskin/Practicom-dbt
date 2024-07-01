import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Article from './Article';
import { Grid, CircularProgress, Alert } from '@mui/material';

/**
 * Component that displays a list of articles based on the selected option.
 * @param {string} option - The selected option for fetching articles.
 * @returns {JSX.Element} - The rendered component.
 */
const ArticlesList = ({ option }) => {
  const [articles, setArticles] = useState([]); // State variable to store the fetched articles
  const [isLoading, setIsLoading] = useState(true); // State variable to track loading state
  const [isError, setIsError] = useState(false); // State variable to track error state

  useEffect(() => {
    /**
     * Fetches articles based on the selected option.
     */
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/articles/${option}`);
        setArticles(response.data); // Update the articles state with the fetched data
        setIsLoading(false); // Set loading state to false
      } catch (error) {
        setIsError(true); // Set error state to true
        setIsLoading(false); // Set loading state to false
      }
    };

    fetchArticles(); // Call the fetchArticles function when the component mounts or when the option changes
  }, [option]);

  if (isLoading) return <CircularProgress />; // Show a loading spinner if the data is still being fetched
  if (isError) return <Alert severity="error">Error fetching articles</Alert>; // Show an error message if there was an error fetching the articles

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      {articles.map(article => (
        <Article key={article.id} article={article} /> // Render each article component with a unique key
      ))}
    </Grid>
  );
};

export default ArticlesList;
