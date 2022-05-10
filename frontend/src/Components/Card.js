import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function OutlinedCard(props) {
  return (
    <Box
    sx={{
      minWidth: '350px',
      width: 1,
      display: 'flex',
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
    </Box>
  );
}
