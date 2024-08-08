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

import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Import the DatePicker component
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Import the AdapterDayjs component
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // Import the LocalizationProvider component
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs from 'dayjs'; // Import the dayjs library

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
    // const [keywords, setKeywords] = useState([]);
    // const [keywordInput, setKeywordInput] = useState(''); 
    const navigate = useNavigate(); // Add the useNavigate hook to navigate to the new article form
    const [startDate, setStartDate] = useState(dayjs()); // Add the startDate state variable
    const [endDate, setEndDate] = useState(dayjs()); // Add the endDate state variable
    const formattedStartDate = startDate ? startDate.toLocaleDateString : '';
    const formattedEndDate = endDate ? endDate.toLocaleDateString : '';

    const handleCheckboxChange = (event) => { // Define the handleCheckboxChange function
        const { value } = event.target;
        setSelectedPreferences((prev) =>
            prev.includes(value)
                ? prev.filter((pref) => pref !== value)
                : [...prev, value]
        );
    };

    function Label({ componentName, valueType, isProOnly }) {
        const content = (
            <span>
                <strong>{componentName}</strong> for {valueType} editing
            </span>
        );
    }

    // const handleKeywordChange = (event) => {
    //     setKeywordInput(event.target.value);
    // };

    // const handleAddKeyword = () => { 
    //     if (keywords.length < 10 && keywordInput) { // Add the keyword to the keywords array
    //         setKeywords((prev) => [...prev, keywordInput]); // Add the keyword to the keywords array
    //         setKeywordInput(''); // Clear the keyword input field
    //     }
    // };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        const formData = { // Create the form data object
            selectedPreferences, // Add the selected preferences
            // keywords // Add the keywords
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
                    {/* {<Grid item xs={12}>
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
                    </Grid>} */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                            components={[
                                'DatePicker',
                                // 'TimePicker',
                                // 'DateTimePicker',
                                'DateRangePicker',
                                // 'DateTimeRangePicker',
                            ]}
                        >
                            <DemoItem label={<Label componentName="DatePicker" valueType="date" />}>
                                <DatePicker inputFormat="MM/dd/yyyy" value={startDate} onChange={(newValue) => setStartDate(newValue)} />
                                <DatePicker inputFormat="MM/dd/yyyy" value={endDate} onChange={(newValue) => setEndDate(newValue)} />
                                {/* <DateRangePicker
                                    localeText={{
                                        start: '',
                                        end: '',
                                    }}
                                /> */}

                            </DemoItem>
                            {endDate && startDate && (TextDecoderStream = endDate.diff(startDate, 'days'))
                            &&
                            `Your Trip from ${startDate.toLocaleDateString}
                            till ${endDate.toLocaleDateString} will last for ${TextDecoderStream} days`}


                            {endDate && startDate && (
                                <Typography variant="subtitle1">
                                    Your Trip from ${formattedStartDate} till ${formattedEndDate} will last for {TextDecoderStream} days
                                </Typography>
                            )}
                            

                            {/* <DemoItem label={<Label componentName="TimePicker" valueType="time" />}>
                                <TimePicker />
                            </DemoItem> */}

                            {/* <DemoItem label={<Label componentName="DatePicker" valueType="date" />}
                            >
                                <DateTimePicker />
                            </DemoItem> */}



                            {/* <DemoItem
                                label={
                                    <Label
                                        componentName="DateRangePicker"
                                        valueType="date range"
                                        isProOnly
                                    />
                                }
                                component="DateRangePicker"
                            >
                                <DateRangePicker
                                    localeText={{
                                        start: '',
                                        end: '',
                                    }}
                                />
                            </DemoItem> */}

                        </DemoContainer>
                    </LocalizationProvider>
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
