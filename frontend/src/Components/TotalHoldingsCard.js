import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function TotalHoldingsCard(props) {
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: 1,
      padding: 1,
      borderRadius: 3,
      boxShadow: 3
      }}
    >
       <Box>
        <Typography sx={{ m: 1 }} variant="h4">
          {props.selectedPortfolio.name}
        </Typography>
      </Box>
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
