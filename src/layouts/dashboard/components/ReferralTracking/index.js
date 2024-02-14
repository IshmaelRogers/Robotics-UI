import React from 'react';
import { Card, Stack, Box, CircularProgress } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import colors from 'assets/theme/base/colors';
import { FaEllipsisH } from 'react-icons/fa';
import linearGradient from 'assets/theme/functions/linearGradient';
//import CircularProgress from '@mui/material/CircularProgress';

function ReferralTracking({ apiData, loading}) {
	console.log('Loading:', loading);
    console.log('API Data:', apiData);
  const { info, gradients } = colors;
  const { cardContent } = gradients;

  // Function to calculate duration between two timestamps in minutes
  const calculateDurationMinutes = (startTime, endTime) => {
	const start = new Date(startTime);
	const end = new Date(endTime);
	const durationMs = end - start; // Difference in milliseconds
	const durationMinutes = Math.round(durationMs / 1000 / 60); // Convert to minutes
	return durationMinutes;
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
	const R = 6371e3; // Earth's radius in meters
	const φ1 = lat1 * Math.PI/180; // φ, λ in radians
	const φ2 = lat2 * Math.PI/180;
	const Δφ = (lat2-lat1) * Math.PI/180;
	const Δλ = (lon2-lon1) * Math.PI/180;
  
	const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
			Math.cos(φ1) * Math.cos(φ2) *
			Math.sin(Δλ/2) * Math.sin(Δλ/2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
	const distance = R * c; // in meters
	return distance;
  };

  const generateSwimInstructions = (missionData) => {
	if (!missionData || !missionData.swim_heading || !missionData.time || missionData.time.length < 2) {
	  return ["No swim instructions available."];
	}
  
	// Ensure lastDuration is properly defined before reuse
	let lastDuration = 0;
  
	const instructions = missionData.swim_heading.map((heading, index) => {
	  let instruction = `Instruction ${index + 1}: Swim ${Math.round(heading)} degrees`;
  
	  if (index < missionData.time.length - 1) {
		// Calculate duration for all but the last heading
		const duration = calculateDurationMinutes(missionData.time[index], missionData.time[index + 1]);
		lastDuration = duration; // Update lastDuration with the current calculated duration
		instruction += ` for ${duration} minutes`;
	  } else {
		// For the last heading, reuse the last calculated duration
		instruction += ` for ${lastDuration} minutes`;
	  }
  
	  // Calculate the distance for each segment
	  if (index < missionData.lat.length - 1) {
		const distance = calculateDistance(
		  missionData.lat[index], missionData.lon[index], 
		  missionData.lat[index + 1], missionData.lon[index + 1]
		);
		instruction += `, covering ${Math.round(distance)} meters.`;
	  } else if (index === missionData.lat.length - 1 && missionData.lat.length > 1) {
		// For the last point, calculate distance from the second-to-last to the last point
		const distance = calculateDistance(
		  missionData.lat[missionData.lat.length - 2], missionData.lon[missionData.lon.length - 2], 
		  missionData.lat[missionData.lat.length - 1], missionData.lon[missionData.lon.length - 1]
		);
		instruction += `, covering ${Math.round(distance)} meters.`;
	  }
  
	  return instruction;
	});
  
	return instructions;
  };
  
  

  // Determine if apiData is available and has the 'current-aware' property
  if (loading) {
    // Show loading indicator while data is being fetched
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress color="info" />
      </Box>
    );
  } 
  const hasData = apiData && apiData['current-aware'];

  
  const swimInstructions = hasData ? generateSwimInstructions(apiData['current-aware'].mission_data) : [];


  return (
    <Card
      sx={{
        height: '100%',
        background: linearGradient(gradients.cardDark.main, gradients.cardDark.state, gradients.cardDark.deg),
      }}>
      <VuiBox sx={{ width: '100%' }}>
        {/* Card Header */}
        <VuiBox
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          sx={{ width: '100%' }}
          mb='40px'>
          <VuiTypography variant='lg' color='white' mr='auto' fontWeight='bold'>
            Swim Instructions
          </VuiTypography>
          <VuiBox
            display='flex'
            justifyContent='center'
            alignItems='center'
            bgColor='#22234B'
            sx={{ width: '37px', height: '37px', cursor: 'pointer', borderRadius: '12px' }}>
            <FaEllipsisH color={info.main} size='18px' />
          </VuiBox>
        </VuiBox>

        {/* Loading state */}
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress color="info" />
          </Box>
        )}

        {/* Swim Instructions */}
        {!loading && swimInstructions.length > 0 && (
          swimInstructions.map((instruction, index) => (
            <VuiTypography key={index} color='text' variant='h6' fontWeight='regular' mb={2}>
              {instruction}
            </VuiTypography>
          ))
        )}

        {/* No data available */}
        {!loading && swimInstructions.length === 0 && (
          <VuiTypography color='text' variant='h6' fontWeight='regular'>
            No swim instructions available.
          </VuiTypography>
        )}
      </VuiBox>
    </Card>
  );
}

export default ReferralTracking;
