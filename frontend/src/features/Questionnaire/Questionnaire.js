import React, { useState } from 'react';
import {
    Box,
    Checkbox,
    FormControlLabel,
    TextField,
    Button,
    Typography,
    Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const preferences = [ // Define the preferences array
    "Limit Live Event",
    "Theater",
    "Extreme",
    "History",
    "National Parks",
    "Beaches",
    "Caves",
    "Cliffs",
    "Mountains",
    "Waterfalls",
    "Islands",
    "Forest",
    "Entertainment Parks",
    "Wildlife Attractions",
    "Museums And Art Galleries",
    "Unique Built Attractions",
    "Sport Attractions",
    "Participating Sport Attractions",
    "Stadium Tours",
    "Special Events",
    "Markets",
    "Festivals And Parades",
    "Exhibitions"
]; 

const Questionnaire = () => { 
    const [selectedPreferences, setSelectedPreferences] = useState([]); 
    const [keywords, setKeywords] = useState([]);
    const [keywordInput, setKeywordInput] = useState(''); 
    const navigate = useNavigate(); // Add the useNavigate hook to navigate to the new article form

    const handleCheckboxChange = (event) => { // Define the handleCheckboxChange function
        const { value } = event.target;
        setSelectedPreferences((prev) =>
            prev.includes(value)
                ? prev.filter((pref) => pref !== value)
                : [...prev, value]
        );
    };

    const handleKeywordChange = (event) => {
        setKeywordInput(event.target.value);
    };

    const handleAddKeyword = () => { 
        if (keywords.length < 10 && keywordInput) { // Add the keyword to the keywords array
            setKeywords((prev) => [...prev, keywordInput]); // Add the keyword to the keywords array
            setKeywordInput(''); // Clear the keyword input field
        }
    };

    const handleSubmit = (event) => { 
        event.preventDefault(); // Prevent the default form submission
        const formData = { // Create the form data object
            selectedPreferences, // Add the selected preferences
            keywords // Add the keywords
        };
        console.log(formData); // Log the form data
        navigate('/home'); // Navigate to the home page
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Preferences Questionnaire
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {preferences.map((preference, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value={preference}
                                        onChange={handleCheckboxChange}
                                    />
                                }
                                label={preference}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <TextField
                            label="Add Keyword"
                            value={keywordInput}
                            onChange={handleKeywordChange}
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddKeyword}
                            disabled={keywords.length >= 10}
                        >
                            Add Keyword
                        </Button>
                        {keywords.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle1">Keywords:</Typography>
                                <ul>
                                    {keywords.map((keyword, index) => (
                                        <li key={index}>{keyword}</li>
                                    ))}
                                </ul>
                            </Box>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default Questionnaire;
