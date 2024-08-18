import { useContext } from "react";
import { UserContext } from "../Hooks/UserContext";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const handleLogOut = () => {
        setUser(null);
        navigate("/");
    };
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h3" gutterBottom>
                Log Out
            </Typography>
            <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleLogOut}
            >
                Log Out
            </Button>
        </Box>
    );
}
export default LogOut;