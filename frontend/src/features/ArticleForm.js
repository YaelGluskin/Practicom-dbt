import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, MenuItem, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * ArticleForm component for creating a new article.
 * 
 * This component renders a form for creating a new article. It includes fields for title, summary, content, image, and option.
 * The form data is submitted to the server using an HTTP POST request.
 * 
 * @returns {JSX.Element} The ArticleForm component.
 */

const ArticleForm = () => {
  // Import the necessary hooks and components
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    image: null,
    localImageUrl: '',
    option: 1,
    loading: false,
  });
  const [error, setError] = useState(null);

  // Destructure the form data for easier access
  const { title, summary, content, localImageUrl, option, loading } = formData;

  /**
   * Event handler for image change.
   * 
   * This function is called when the user selects an image file. It updates the form data with the selected image file and creates a local image URL for preview.
   * 
   * @param {Event} e - The image change event.
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
      localImageUrl: URL.createObjectURL(file)
    });
  };

  /**
   * Event handler for form submission.
   * 
   * This function is called when the user submits the form. It sends the form data to the server using an HTTP POST request.
   * 
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      loading: true,
      error1: null
    });

    try {
      const articleData = {
        title,
        summary,
        content,
        imageUrl: localImageUrl,
        option
      };

      const response = await axios.post('http://localhost:5001/articles', articleData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Article created successfully:', response.data);
      navigate(`/home/articles/${articleData.data}`); // Check 

    } catch (error) {
      console.error('Error creating article:', error);
      setError('Failed to create article. Please try again.');
    } finally {
      setFormData({
        ...formData,
        loading: false
      });
    }
    /*
    setTitle('');
    setSummary('');
    setContent('');
    setImage(null);
    setLocalImageUrl('');
    setOption(1); */
  };
  

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create New Article
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 30 }}
          required
        />
        <TextField
          label="Summary"
          value={summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          fullWidth
          margin="normal"
          multiline
          rows={3}
          inputProps={{ maxLength: 100 }}
          required
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          fullWidth
          margin="normal"
          multiline
          rows={6}
          inputProps={{ maxLength: 2000 }}
          required
        />
        <TextField
          select
          label="Option"
          value={option}
          onChange={(e) => setFormData({ ...formData, option: e.target.value })}
          fullWidth
          margin="normal"
          required
        >
          {[1, 2, 3, 4, 5].map(option => (
            <MenuItem key={option} value={option}>
              Option {option}
            </MenuItem>
          ))}
        </TextField>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ margin: '20px 0' }}
          required
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </form>
    </Container>
  );
};

export default ArticleForm;