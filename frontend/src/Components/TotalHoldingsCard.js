import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function TotalHoldingsCard(props) {
  return (
    <Box
    sx={{
      display: 'flex',
      minWidth: '200px',
      width: 1,
      justifyContent: 'center',
      flexDirection: 'column',
      border: 1,
      borderRadius: 2,
      borderColor: 'grey.300'
      }}
    >
      <Box>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Total Worth
        </Typography>
      </Box>
      <Box>
        <Typography variant="h4" component="div">
          $ {props.totalHoldings}
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ fontSize: 16 }} color="text.secondary">
          {props.totalPercentChange} %
        </Typography>
      </Box>
    </Box>
  );
}
