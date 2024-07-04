import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, MenuItem, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const EditArticle = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        content: '',
        image_url: null,
        local_image_path: '',
        option: 1,
        loading: false,
    });
    const [error, setError] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false); // State for confirmation dialog

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/article/${id}`);
                const { title, summary, content, image_url, option } = response.data;
                setFormData({
                    title,
                    summary,
                    content,
                    image_url,
                    local_image_path: '',
                    option,
                    loading: false,
                });
            } catch (error) {
                console.error('Error fetching article:', error);
                setError('Failed to fetch article. Please try again.');
            }
        };

        fetchArticle();
    }, [id]);

    const { title, summary, content, local_image_path, option, loading, image_url } = formData;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image: file,
            local_image_path: URL.createObjectURL(file)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            loading: true,
            error: null
        });

        try {
            const articleData = {
                title,
                summary,
                content,
                image_url: local_image_path || image_url,
                option
            };

            const response = await axios.patch(`http://localhost:5001/article/${id}`, articleData);
            console.log('Article updated successfully:', response.data);
            navigate(`/home/article/${id}`);
        } catch (error) {
            console.error('Error updating article:', error);
            setError('Failed to update article. Please try again.');
        } finally {
            setFormData({
                ...formData,
                loading: false
            });
        }
    };

    const handleDelete = async () => {
        setConfirmDelete(true); // Open confirmation dialog
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:5001/article/${id}`);
            console.log('Article deleted successfully:', response.data);
            navigate(`/home`);
        } catch (error) {
            console.error('Error deleting article:', error);
            setError('Failed to delete article. Please try again.');
        } finally {
            setConfirmDelete(false); // Close confirmation dialog
        }
    };

    const handleCancelDelete = () => {
        setConfirmDelete(false); // Close confirmation dialog
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Edit Article
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
                />
                {local_image_path && (
                    <img src={local_image_path} alt="Selected" style={{ width: '100px', height: '100px' }} />
                )}
                {!local_image_path && image_url && (
                    <img src={image_url} alt="Current" style={{ width: '100px', height: '100px' }} />
                )}
                {/* <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button> */}
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
            </form>
            <Button variant="contained" color="secondary" onClick={handleDelete}>
                Delete Article
            </Button>

            {/* Confirmation Dialog */}
            <Dialog open={confirmDelete} onClose={handleCancelDelete}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this article?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default EditArticle;
