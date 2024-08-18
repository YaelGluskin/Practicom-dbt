import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const PlaceSearch = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    setQuery(e.target.value);

    if (e.target.value.length > 2) {
      fetchPlaces(e.target.value);
    } else {
      setResults([]);
    }
  };

  const fetchPlaces = async (query) => {
    const apiKey = 'bd98d634906f4accba5f09ccf4456e0c'; // Replace with your geocoding API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&language=en`; // Add language parameter

    try {
      const response = await fetch(url);
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Error fetching place names:', error);
    }
  };

  const handleSelect = (place) => {
    onSelect(place.formatted); // Call the onSelect function passed as a prop
    setQuery(''); // Clear the search input
    setResults([]); // Clear the search results
  };

  return (
    <Box sx={{ width: 300, margin: 'auto' }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Search for a place"
        value={query}
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />

      {results.length > 0 && (
        <Paper elevation={3}>
          <List>
            {results.map((result, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleSelect(result)}
              >
                {result.formatted}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default PlaceSearch;
