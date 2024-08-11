import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [userCount, setUserCount] = useState(0);
    const [managedUserCount, setManagedUserCount] = useState(0);
    const navigate = useNavigate();

    const handleViewAllUsers = () => {
        // Handle logic for viewing all users
        // Replace with your own implementation
        console.log('View all users');
    };

    const handleViewAllArticle = () => {
        // Handle logic for viewing all addresses
        // Replace with your own implementation
        console.log('View all addresses');
        navigate('articleTable');
    };

    const handleCreateUser = () => {
        // Handle logic for creating a new user
        // Replace with your own implementation
        console.log('Create new user');
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <p>Number of registers: {userCount}</p>
            <p>Number of admin users : {managedUserCount}</p>
            <Button variant="contained" color="primary" onClick={handleViewAllUsers}>View All Users</Button>
            <Button variant="contained" color="primary" onClick={handleViewAllArticle}>View All Articles</Button>
            <Button variant="contained" color="primary" onClick={handleCreateUser}>Create New User</Button>
        </div>
    );
};

export default Admin;