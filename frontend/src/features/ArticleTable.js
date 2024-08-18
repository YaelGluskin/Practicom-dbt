import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton
    , Select, MenuItem, Chip, FormControl, InputLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../services/api'; // Import the api instance
import { labels } from './Labels/Labels'; // Import the preferences array

const ArticleTable = () => {
    const [articles, setArticles] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchLabels, setSearchLabels] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editValues, setEditValues] = useState({});

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await api.get('/article'); // Use the api instance here
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const handleEdit = (article) => {
        setEditingId(article.article_id);
        setEditValues(article);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this article?");
        if (confirmDelete) {
            try {
                await api.delete(`/article/${id}`); // Use the api instance here
                fetchArticles();
            } catch (error) {
                console.error('Error deleting article:', error);
            }
        }
    };

    const handleSave = async (id) => {
        try {
            await api.patch(`/article/${id}`, editValues); // Use the api instance here
            fetchArticles();
            setEditingId(null);
        } catch (error) {
            console.error('Error updating article:', error);
        }
    };

    //   const handleDelete = async (id) => {

    //     try {
    //       await api.delete(`/article/${id}`); // Use the api instance here
    //       fetchArticles();
    //     } catch (error) {
    //       console.error('Error deleting article:', error);
    //     }
    //   };

    const handleInputChange = (e) => {
        setEditValues({
            ...editValues,
            [e.target.name]: e.target.value
        });
    };

    const handleLabelsChange = (event) => {
        const { value } = event.target;
        setEditValues({
            ...editValues,
            labels: typeof value === 'string' ? value.split(',') : value,
        });
    };

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
        article.labels.some(label => label.toLowerCase().includes(searchLabels.toLowerCase()))
    );
    

    return (
        <div>
            <TextField
                label="Search by Title"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                variant="outlined"
                margin="normal"
            />
            <TextField
                label="Search by Option"
                value={searchLabels}
                onChange={(e) => setSearchLabels(e.target.value)}
                variant="outlined"
                margin="normal"
            />
            {/* <Button variant="contained" onClick={handleSearch}>Search</Button> */}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Summary</TableCell>
                            <TableCell>Content</TableCell>
                            <TableCell>Image URL</TableCell>
                            <TableCell>Labels</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredArticles.map((article) => (
                            <TableRow key={article.article_id}>
                                <TableCell>{article.article_id}</TableCell>
                                <TableCell>
                                    {editingId === article.article_id ? (
                                        <TextField
                                            name="title"
                                            value={editValues.title || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        article.title
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingId === article.article_id ? (
                                        <TextField
                                            name="summary"
                                            value={editValues.summary || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        article.summary
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingId === article.article_id ? (
                                        <TextField
                                            name="content"
                                            value={editValues.content || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        article.content
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingId === article.article_id ? (
                                        <TextField
                                            name="image_url"
                                            value={editValues.image_url || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        article.image_url
                                    )}
                                </TableCell>

                                {/* <TableCell>
                                    {editingId === article.article_id ? (
                                        <TextField
                                            name="labels"
                                            value={editValues.labels || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        article.label
                                    )}
                                </TableCell> */}
                                <TableCell>
                                    {editingId === article.article_id ? (
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Labels</InputLabel>
                                            <Select
                                                name="labels"
                                                multiple
                                                value={editValues.labels || []}
                                                onChange={handleLabelsChange}
                                                renderValue={(selected) => (
                                                    <div>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value} />
                                                        ))}
                                                    </div>
                                                )}
                                            >
                                                {labels.map((label) => (
                                                    <MenuItem key={label} value={label}>
                                                        {label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    ) : (
                                        (article.labels || []).join(', ')  // Updated to handle null or undefined
                                    )}
                                </TableCell>

                                <TableCell>
                                    {editingId === article.article_id ? (
                                        <IconButton onClick={() => handleSave(article.article_id)}>
                                            <SaveIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick={() => handleEdit(article)}>
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                    <IconButton onClick={() => handleDelete(article.article_id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ArticleTable;
