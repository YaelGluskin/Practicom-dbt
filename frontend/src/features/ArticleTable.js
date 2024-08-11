import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Article from './Article';
import { Button, CircularProgress, Alert, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ArticlTablet = () => {
    const [articles, setArticles] = useState([]); // State variable to store the fetched articles
    const [isLoading, setIsLoading] = useState(true); // State variable to track loading state
    const [isError, setIsError] = useState(false); // State variable to track error state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/article/`); // Fetch articles by option
                console.log("fetchArticles: ", response);
                setArticles(response.data); // Update the articles state with the fetched data
                setIsLoading(false); // Set loading state to false
            } catch (error) {
                setIsError(true); // Set error state to true
                setIsLoading(false); // Set loading state to false
            }

        }; fetchArticles(); // Call the fetchArticles function when the component mounts or when the option changes
    }, []);
    console.log("articles: ", articles);
    if (isLoading) return <CircularProgress />; // Show a loading spinner if the data is still being fetched
    if (isError) return <Alert severity="error">Error fetching articles</Alert>; // Show an error message if there was an error fetching the articles

    return (
        <div>
            {articles.map((article) => (
                <Card key={article.id} style={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Typography variant="h5">{article.title}</Typography>
                        <Typography variant="body1" paragraph>
                            {article.summary}
                        </Typography>
                        <Typography variant="body1">
                            {article.content}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={() => navigate(`${article.article_id}/edit`)}>
                            Edit Article
                        </Button>
                        {/* Add more fields as necessary */}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default ArticlTablet; 