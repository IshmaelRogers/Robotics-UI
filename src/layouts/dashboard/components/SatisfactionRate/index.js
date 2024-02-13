import React, { useState } from 'react';
import { Card, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import { IoHappy } from 'react-icons/io5';
import colors from 'assets/theme/base/colors';
import linearGradient from 'assets/theme/functions/linearGradient';
import CircularProgress from '@mui/material/CircularProgress';

const SatisfactionRate = (props) => {
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [swimSpeed, setSwimSpeed] = useState('');
  const [departureWindow, setDepartureWindow] = useState('');
  const [routeAlgorithm, setRouteAlgorithm] = useState('');

  const handleAlgorithmChange = (event) => {
    setRouteAlgorithm(event.target.value);
  };

  // Dummy function for demonstration
  const sendApiRequest = () => {
	console.log({
		
			startDate: props.startDate,
			startTime: props.startTime,
			swimSpeed: props.swimSpeed,
			departureWindow: props.departureWindow,
			routeAlgorithm: props.routeAlgorithm
		});
		if (props.onSubmit) {
			props.onSubmit({
				startDate: props.startDate,
				startTime: props.startTime,
				swimSpeed: props.swimSpeed,
				departureWindow: props.departureWindow,
				routeAlgorithm: props.routeAlgorithm
			});
		}
	 // Assuming onSubmit is the prop function provided by Dashboard
  };

  const handleSubmit = () => {
	// Assuming date is in the format 'YYYY-MM-DD' and time is in the format 'HH:MM'
	const isoTimeStart = `${date}T${time}:00`; // Concatenate date and time to form the ISO string
  
	// Now you can pass isoTimeStart to your API request function
	props.onSubmit({
	  isoTimeStart: isoTimeStart,
	  // Include other parameters here as needed
	});
  };

  return (
    <Card sx={{ height: 'auto', padding: '20px' }}>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="h6" fontWeight="bold" mb="12px" sx={{ fontSize: '1rem' }}>
          Dive Parameters
        </VuiTypography>
        
        <TextField
          label="Start Date (dd/mm/yyyy)"
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          sx={{
			marginBottom: '20px',
			'& .MuiInputBase-root': {
			  marginTop: '8px', // Adjust this value to increase the space between the label and the input box
			},
		  }}
  		InputLabelProps={{
    	shrink: true,
    	sx: {
      	fontSize: '1rem', // Adjust the font size of the label as needed
    	}
  }}
        />

        <TextField
          label="Start Time (HH:MM:SS)"
          type="time"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
          sx={{
			marginBottom: '20px',
			'& .MuiInputBase-root': {
			  marginTop: '8px', // Adjust this value to increase the space between the label and the input box
			},
		  }}
  		InputLabelProps={{
    	shrink: true,
    	sx: {
      	fontSize: '1rem', // Adjust the font size of the label as needed
    	}
  }}
        />

        <TextField
          label="Dive Speed (knots)"
          type="number"
          value={swimSpeed}
          onChange={e => setSwimSpeed(e.target.value)}
          sx={{
			marginBottom: '20px',
			'& .MuiInputBase-root': {
			  marginTop: '8px', // Adjust this value to increase the space between the label and the input box
			},
		  }}
  		InputLabelProps={{
    	shrink: true,
    	sx: {
      	fontSize: '1rem', // Adjust the font size of the label as needed
    	}
  }}
        />

        <TextField
          label="Departure Window Hours"
          type="number"
          value={departureWindow}
          onChange={e => setDepartureWindow(e.target.value)}
          sx={{
			marginBottom: '20px',
			'& .MuiInputBase-root': {
			  marginTop: '8px', // Adjust this value to increase the space between the label and the input box
			},
		  }}
  		InputLabelProps={{
    	shrink: true,
    	sx: {
      	fontSize: '1rem', // Adjust the font size of the label as needed
    	}
  }}
        />

<FormControl fullWidth sx={{ marginBottom: '30px' }}>
  <InputLabel 
    sx={{ 
      fontSize: '0.75rem', // Adjust the font size of the label
      '&.Mui-focused': { // Optional: Adjust the font size when the label is focused
        fontSize: '0.75rem',
      }
    }}
  >
    Route Algorithm
  </InputLabel>
  <Select
    value={routeAlgorithm}
    label="Route Algorithm"
    onChange={handleAlgorithmChange}
    sx={{
      marginTop: '8px', // Adjust this value to increase space between the label and the Select input
      '.MuiSelect-select': { // Adjust the Select input text size if needed
        fontSize: '0.875rem',
      },
    }}
  >
    <MenuItem value="current-aware">Current-Aware</MenuItem>
    <MenuItem value="current-unaware">Current-Unaware</MenuItem>
    <MenuItem value="location-unaware">Location-Unaware</MenuItem>
  </Select>
</FormControl>
		<Button variant="contained" color="primary" onClick={sendApiRequest} sx={{ mt: '20px' }}>
          Execute Dive
        </Button>
      </VuiBox>
    </Card>
  );
};


export default SatisfactionRate;
