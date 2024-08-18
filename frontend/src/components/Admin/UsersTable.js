import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../services/api' // Assuming you created this based on our previous discussion

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [searchUsername, setSearchUsername] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editValues, setEditValues] = useState({});

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/loguser'); // Fetch all users from the backend
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const filteredUsers = users.filter(user =>
                user.username.toLowerCase().includes(searchUsername.toLowerCase()) &&
                user.email.toLowerCase().includes(searchEmail.toLowerCase())
            );
            setUsers(filteredUsers);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    const handleEdit = (user) => {
        setEditingId(user.user_id);
        setEditValues(user);
    };

    const handleSave = async (id) => {
        try {
            await api.patch(`/loguser/${id}`, editValues); // Save the edited user
            fetchUsers(); // Refresh the users list
            setEditingId(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this article?");
        if (confirmDelete) {
            try {
                await api.delete(`/loguser/${id}`); // Delete the user
                fetchUsers(); // Refresh the users list
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleInputChange = (e) => {
        setEditValues({
            ...editValues,
            [e.target.name]: e.target.value
        });
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchUsername.toLowerCase()) &&
        user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );

    return (
        <div>
            <TextField
                label="Search by Username"
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
                variant="outlined"
                margin="normal"
            />
            <TextField
                label="Search by Email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                variant="outlined"
                margin="normal"
            />
            {/* <Button variant="contained" onClick={handleSearch}>Search</Button> */}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>User Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.user_id}>
                                <TableCell>{user.user_id}</TableCell>
                                <TableCell>
                                    {editingId === user.user_id ? (
                                        <TextField
                                            name="username"
                                            value={editValues.username || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        user.username
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingId === user.user_id ? (
                                        <TextField
                                            name="email"
                                            value={editValues.email || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingId === user.user_id ? (
                                        <TextField
                                            name="user_role"
                                            value={editValues.user_role || ''}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        user.user_role
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingId === user.user_id ? (
                                        <IconButton onClick={() => handleSave(user.user_id)}>
                                            <SaveIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick={() => handleEdit(user)}>
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                    <IconButton onClick={() => handleDelete(user.user_id)}>
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

export default UsersTable;
