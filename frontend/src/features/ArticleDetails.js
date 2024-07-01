import React from 'react';
import { Typography, Container } from '@mui/material';

/**
 * Renders the details of an article.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.article - The article object containing the title, summary, and content.
 * @returns {JSX.Element} The rendered ArticleDetails component.
 */
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
