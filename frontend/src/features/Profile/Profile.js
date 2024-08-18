import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button} from '@mui/material';

const Profile = () => {
    const navigate = useNavigate(); 

    const handleQuestionnaireClick = () => {
        navigate('/questionnaire');
    };

    return (
        <div>
            <h1>Profile Component</h1>
            {/* Add your profile content here */}
            <Button variant="contained" color="primary" onClick={handleQuestionnaireClick}>
                Go to Questionnaire
            </Button>
        </div>
    );
};

export default Profile;

// // Import necessary dependencies
// import React, { useState } from 'react';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { TextField, Typography } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';

// function DateRangeSelector() {
//   // State management for start and end dates
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   // Function to calculate the difference between the two dates
//   const getDateDifference = () => {
//     if (startDate && endDate) {
//       const diffInMilliseconds = dayjs(endDate).diff(dayjs(startDate));
//       const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
//       return Math.ceil(diffInDays); // Round up to the nearest day
//     }
//     return 0;
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
//         <DatePicker
//           label="Start Date"
//           value={startDate}
//           onChange={(newValue) => setStartDate(newValue)}
//           renderInput={(params) => <TextField {...params} />}
//         />
//         <DatePicker
//           label="End Date"
//           value={endDate}
//           onChange={(newValue) => setEndDate(newValue)}
//           renderInput={(params) => <TextField {...params} />}
//         />
//         <Typography variant="h6">
//           {startDate && endDate
//             ? `The difference between the selected dates is ${getDateDifference()} days.`
//             : 'Select both dates to see the difference.'}
//         </Typography>
//       </div>
//     </LocalizationProvider>
//   );
// }

// export default DateRangeSelector;
