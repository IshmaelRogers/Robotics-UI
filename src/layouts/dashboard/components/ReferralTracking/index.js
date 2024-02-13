import React from 'react';
import { Card, Stack, Box } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import colors from 'assets/theme/base/colors';
import { FaEllipsisH } from 'react-icons/fa';
import linearGradient from 'assets/theme/functions/linearGradient';
import CircularProgress from '@mui/material/CircularProgress';

function ReferralTracking({ apiData }) {
  const { info, gradients } = colors;
  const { cardContent } = gradients;

  // Determine if apiData is available and has the 'current-aware' property
  const hasData = apiData && apiData['current-aware'];

  return (
    <Card
      sx={{
        height: '100%',
        background: linearGradient(gradients.cardDark.main, gradients.cardDark.state, gradients.cardDark.deg)
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
        
        {/* Conditionally render the API data if available */}
        {hasData ? (
          <VuiBox
            display='flex'
            flexDirection='column'
            gap='20px'
            justifyContent='center'
            alignItems='center'
            sx={{ maxWidth: '100%' }}>
            {/* Example: Display the duration for a specific time */}
            <VuiTypography color='text' variant='h6' fontWeight='regular'>
              Duration for 2024-02-10T02:00:00: {apiData['current-aware'].durations['2024-02-10T02:00:00']} seconds
            </VuiTypography>
            {/* More details from apiData can be rendered here */}
          </VuiBox>
        ) : (
          <VuiTypography color='text' variant='h6' fontWeight='regular'>
            No data available
          </VuiTypography>
        )}
      </VuiBox>
    </Card>
  );
}

export default ReferralTracking;
