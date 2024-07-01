import React from 'react';
import { Typography, Container } from '@mui/material';

const ArticleDetails = ({ article }) => {
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
    </Container>
  );
};

export default ArticleDetails;
