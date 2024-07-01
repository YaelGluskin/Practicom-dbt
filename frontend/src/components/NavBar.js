import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Container } from '@mui/material';


/**
 * Represents a navigation bar component.
 * @returns {JSX.Element} The JSX element representing the navigation bar.
 */
const NavBar = () => {

    const navigate = useNavigate();

    // Handlers for navigation
    //const onHomeClicked = () => navigate('/Home');
    const onContactClicked = () => navigate('/Contact');
    const onAboutClicked = () => navigate('/About');
    const onDiscoverClicked = () => navigate('/Discover');
    // const onLogoutClicked = () => sendLogout();
    const onLogoutClicked = () => navigate('/LogOut');




    const contactButton = (
        <IconButton style={{ color: 'white' }} title="Contact" onClick={onContactClicked}>
            Contact
        </IconButton>
    );


    const aboutButton = (
        <IconButton style={{ color: 'white' }} title="About" onClick={onAboutClicked}>
            About
        </IconButton>
    );

    const discoverButton = (
        <IconButton style={{ color: 'white' }} title="Discover" onClick={onDiscoverClicked}>
            Discover
        </IconButton>
    );

    // The logout will work if the user is registered
    // This assumes that the registration process sets up the necessary authentication and session management

    const logoutButton = (
        <IconButton style={{ color: 'white' }} title="Logout" onClick={onLogoutClicked}>
            {/* <FontAwesomeIcon icon={faRightFromBracket} /> */}
        </IconButton>
    );
    


    const buttonContent = (
        <>
            {contactButton}
            {aboutButton}
            {discoverButton}
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
                            {buttonContent}
                        </nav>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default NavBar;