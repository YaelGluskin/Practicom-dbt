import React, { useState } from 'react';
import { TextField, Button, MenuItem, Paper, Typography } from '@mui/material';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
const CreateUserForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        user_password: '',
        email: '',
        user_role: 'USER' // Default role
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/loguser', formData); // Post data to create a new user
            setSuccess(`User ${response.data.username} created successfully!`);
            setError('');
            navigate('/Home/AdminArea/usersTable');
        } catch (err) {
            console.error('Error creating user:', err);
            setError('Failed to create user.');
            setSuccess('');
        }
    };

    return (
        <Paper style={{ padding: '16px', maxWidth: '400px', margin: '0 auto' }}>
            <Typography variant="h6" gutterBottom>
                Create New User
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                />
                <TextField
                    label="Password"
                    name="user_password"
                    type="password"
                    value={formData.user_password}
                    onChange={handleInputChange}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                />
                <TextField
                    label="User Role"
                    name="user_role"
                    select
                    value={formData.user_role}
                    onChange={handleInputChange}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                >
                    <MenuItem value="USER">USER</MenuItem>
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                </TextField>
                {error && <Typography color="error">{error}</Typography>}
                {success && <Typography color="primary">{success}</Typography>}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Create User
                </Button>
            </form>
        </Paper>
    );
};

export default CreateUserForm;
