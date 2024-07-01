import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

/**
 * Article component displays an article card with title and image.
 * @param {Object} article - The article object containing title and image.
 */
const Article = ({ article }) => {
  const navigate = useNavigate();

  /**
   * Handles the click event when the card is clicked.
   * Navigates to the article details page.
   */
  const handleEdit = () => navigate(`/articles/${article.id}`);

  return (
    <Card sx={{ width: 200, height: 200, margin: 1 }} onClick={handleEdit}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={article.image}
          alt={article.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {article.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Article;