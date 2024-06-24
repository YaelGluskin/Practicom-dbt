import React from 'react';
import { Container, Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const items = [
  { id: 1, title: 'Title 1', summary: 'Summary 1', image: '/path/to/image1.jpg' },
  { id: 2, title: 'Title 2', summary: 'Summary 2', image: '/path/to/image2.jpg' },
  { id: 3, title: 'Title 3', summary: 'Summary 3', image: '/path/to/image3.jpg' },
];

const Home = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        {items.map(item => (
          <Grid item xs={12} sm={4} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.summary}
                </Typography>
                <Link to={`/details/${item.id}`}>Read more</Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
