import React, { useState } from 'react';
import {
    Box, RadioGroup, Radio, Checkbox, FormControlLabel,TextField,
    Button, FormControl, FormLabel, Typography, Grid, IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Import the DatePicker component
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Import the AdapterDayjs component
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // Import the LocalizationProvider component
import dayjs from 'dayjs'; // Import the dayjs library
import CloseIcon from '@mui/icons-material/Close';

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
    // "Waterfalls",
    // "Islands",
    // "Forest",
    // "Entertainment Parks",
    // "Wildlife Attractions",
    // "Museums And Art Galleries",
    // "Unique Built Attractions",
    // "Sport Attractions",
    // "Participating Sport Attractions",
    // "Stadium Tours",
    // "Special Events",
    // "Markets",
    // "Festivals And Parades",
    "Exhibitions"
];

const Questionnaire = () => {
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [keywordInput, setKeywordInput] = useState('');

    const navigate = useNavigate(); // Add the useNavigate hook to navigate to the new article form
    const [startDate, setStartDate] = useState(null); // Add the startDate state variable
    const [endDate, setEndDate] = useState(null); // Add the endDate state variable

    const handleCheckboxChange = (event) => { // Define the handleCheckboxChange function
        const { value } = event.target;
        setSelectedPreferences((prev) =>
            prev.includes(value)
                ? prev.filter((pref) => pref !== value)
                : [...prev, value]
        );
    };

    const handleKeywordChange = (event) => { // Define the handleKeywordChange function
        setKeywordInput(event.target.value);
    };

    const handleAddKeyword = () => {
        if (keywords.length < 10 && keywordInput) { // Add the keyword to the keywords array
            setKeywords((prev) => [...prev, keywordInput]); // Add the keyword to the keywords array
            setKeywordInput(''); // Clear the keyword input field
        }
    };
    const handleDelete = (index) => { // Handle the deletion of a keyword
        const newKeywords = keywords.filter((_, i) => i !== index);
        setKeywords(newKeywords);
    };





    const [selectedPurpose, setSelectedPurpose] = useState(''); // Purpose state variable and setPurpose function
    const handlePurposeChange = (event) => { // Handle the purpose change
        setSelectedPurpose(event.target.value);
    };
    const purposes = [ // Purposes array
        'Entertainment',
        'Tourism',
        'Entertainment and Tourism',
        'Shopping',
        'Education',
        'Business',
        'Health',
        'Visiting Family',
    ];
    const [selectEdendurance, setSelectEdendurance] = useState(''); // SelectEdendurance state variable and setSelectEdendurance function
    const handleEnduranceChange = (event) => { // Handle the endurance change
        setSelectEdendurance(event.target.value);
    };
    const endurance = [ // Define the endurance array
        'A - professional',
        'B - advanced',
        'C - family friendly',
        'D - easy',
        'E - accessible',
    ];
    const [budget, setBudget] = useState();  // Add the budget state variable

    const handleSubmit = (event) => { // Define the handleSubmit function
        event.preventDefault(); // Prevent the default form submission
        // Add valid check to dates 
        const today = new Date();
        if (startDate <= today || endDate <= today) {
            alert('Please select a date after today.');
            return;
        }        if (selectedPurpose && selectedPreferences.length > 0 && keywords.length > 0 && startDate && endDate &&
            selectEdendurance &&  budget
         ) { // Check if all fields are filled in
            if (budget < 1000) {
                alert('Budget must be at least 1000');
                return;
            }
          const formData = { // Create the form data object
            selectedPurpose, // Add the selected purpose
            selectedPreferences, // Add the selected preferences
            keywords, // Add the keywords
            startDate,
            endDate,
            selectEdendurance,
            budget
          };
          console.log(formData); // Log the form data
          navigate('/home'); // Navigate to the home page
        } else {
          alert('Please fill in all fields before submitting the form.');
        }
      };
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Preferences Questionnaire
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField 
                    label="Budget" 
                    type='number' 
                    value={budget} 
                    onChange={(event) => setBudget(event.target.value)} 
                    fullWidth 
                    margin="normal" 
                />
                <Typography variant="subtitle1">You may choose 3 labels:</Typography>
                <Grid container spacing={2}>
                    {preferences.map((preference, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value={preference}
                                        onChange={handleCheckboxChange}
                                        disabled={!selectedPreferences.includes(preference) && selectedPreferences.length >= 3}
                                    />
                                }
                                label={preference}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <TextField
                            label="Add Destination: city, country"
                            value={keywordInput}
                            onChange={handleKeywordChange}
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddKeyword}
                            disabled={keywords.length >= 1}
                        >
                            Add destination
                        </Button>
                        {keywords.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle1">Destination:</Typography>
                                <ul>
                                    {keywords.map((keyword, index) => (
                                        <li key={index}>
                                            {keyword}
                                            <IconButton
                                                aria-label="delete"
                                                size="small"
                                                onClick={() => handleDelete(index)}
                                            >
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </li>
                                    ))}
                                </ul>
                            </Box>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <DatePicker
                                        label="Start Date"
                                        inputFormat="DD/MM/YYYY"
                                        value={startDate}
                                        
                                        onChange={(newValue) => setStartDate(newValue)}
                                        minDate={dayjs()}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <DatePicker
                                        label="End Date"
                                        inputFormat="DD/MM/YYYY"
                                        value={endDate}
                                        onChange={(newValue) => setEndDate(newValue)}
                                        minDate={dayjs()}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </Grid>
                            </Grid>
                        </LocalizationProvider>
                        {endDate && startDate && (
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Your trip from {startDate.format('DD/MM/YYYY')} till {endDate.format('DD/MM/YYYY')} will last for {endDate.diff(startDate, 'days')} days.
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Purpose of Trip:</FormLabel>
                            <RadioGroup value={selectedPurpose} onChange={handlePurposeChange}>
                                {purposes.map((purpose, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={purpose}
                                        control={<Radio />}
                                        label={purpose}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Endurance</FormLabel>
                            <RadioGroup value={selectEdendurance} onChange={handleEnduranceChange}>
                                {endurance.map((endurance, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={endurance}
                                        control={<Radio />}
                                        label={endurance}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
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
