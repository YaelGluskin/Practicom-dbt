import React, { useState, useEffect } from 'react';
import { Button, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Admin = () => {
    const [userCount, setUserCount] = useState(0);
    const [adminCount, setAdminCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserCounts();
    }, []);

    const fetchUserCounts = async () => {
        try {
            const response = await api.get('/loguser');
            const users = response.data;
            setUserCount(users.length);
            setAdminCount(users.filter(user => user.user_role === 'Admin').length);
        } catch (err) {
            console.error('Error fetching user counts:', err);
        }
    };

    const handleViewAllUsers = () => {
        navigate('usersTable');
    };

    const handleViewAllArticles = () => {
        navigate('articleTable');
    };

    const handleCreateUser = () => {
        navigate('createUser');
    };

    return (
        <Paper style={{ padding: '16px', maxWidth: '800px', margin: '32px auto' }}>
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Number of Registered Users</Typography>
                            <Typography variant="h3" color="primary">{userCount}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Number of Admin Users</Typography>
                            <Typography variant="h3" color="secondary">{adminCount}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: '16px' }}>
                <Grid item xs={12} sm={4}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleViewAllUsers}>
                        View All Users
                    </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleViewAllArticles}>
                        View All Articles
                    </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleCreateUser}>
                        Create New User
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Admin;
