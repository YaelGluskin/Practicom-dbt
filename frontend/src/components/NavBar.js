import React, { useContext } from 'react'; // Import the useContext hook
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Container } from '@mui/material';
import { UserContext } from '../Hooks/UserContext';  // Import the UserContext
import { ShoppingCart, AccountCircle, Logout } from '@mui/icons-material';

/**
 * Represents a navigation bar component.
 * @returns {JSX.Element} The JSX element representing the navigation bar.
 */
const NavBar = () => {

    const navigate = useNavigate();
    const { user } = useContext(UserContext); // Get the user from the UserContext

    // Handlers for navigation
    //const onHomeClicked = () => navigate('/Home');
    const onContactClicked = () => navigate('/Contact');
    const onAboutClicked = () => navigate('/About');
    const onDiscoverClicked = () => navigate('/Discover');
    // const onLogoutClicked = () => sendLogout();
    const onLogoutClicked = () => navigate('/LogOut');




    const contactButton = ( // The contact button to display when the user is not logged in
        <IconButton style={{ color: 'white' }} title="Contact" onClick={onContactClicked}>
            Contact
        </IconButton>
    );


    const aboutButton = ( // The about button to display when the user is not logged in
        <IconButton style={{ color: 'white' }} title="About" onClick={onAboutClicked}>
            About
        </IconButton>
    );

    const discoverButton = ( // The discover button to display when the user is not logged in
        <IconButton style={{ color: 'white' }} title="Discover" onClick={onDiscoverClicked}>
            Discover
        </IconButton>
    );

    // The logout will work if the user is registered
    // This assumes that the registration process sets up the necessary authentication and session management

    const profileButton = ( // The profile button to display when the user is logged in
        <IconButton style={{ color: 'white' }} title="Profile" onClick={ () => navigate('/Profile')}>
            <AccountCircle/>
        </IconButton>
    );

    const ShopButton = ( // The shop button to display when the user is logged in
        <IconButton style={{ color: 'white' }} title="Shop" onClick={ () => navigate('/ShopCart')}>
            <ShoppingCart/>
        </IconButton>
    );

    const logoutButton = ( // The logout button to display when the user is logged in
        <IconButton style={{ color: 'white' }} title="Logout" onClick={onLogoutClicked}>
            <Logout />
        </IconButton>
    );
    


    const PublicButtonContent = ( // The buttons to display when the user is not logged in
        <>
            {contactButton}
            {aboutButton}
            {discoverButton}
        </>
    );

    const buttonContent = ( // The buttons to display when the user is logged in
        <>
            {ShopButton}
            {profileButton}
            {logoutButton}
            
        </>
    );


    return (
        <>

            <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to="/Home" style={{ textDecoration: 'none', color: 'inherit' }}>DBT</Link>
                        </Typography>
                        <nav>
                        {user ? buttonContent : PublicButtonContent}
                        </nav>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default NavBar;