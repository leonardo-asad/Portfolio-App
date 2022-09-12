import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import AddTradeForm from './AddTradeForm';
//import TotalHoldingsCard from '../Components/TotalHoldingsCard';
//import PieChart from '../Components/PieChart';

export default function Dashboard() {
  const matches = useMediaQuery('(min-width:920px)');
  const margin = matches ? 5 : 0;

  return (
    <Box sx={{ flexGrow: 1, m: margin, my: 5 }}>
      <Grid
      container
      direction="row"
      spacing={5}
      alignItems="stretch"
      >
        <Grid item xs>
          <AddTradeForm
          />
        </Grid>
      </Grid>
    </Box>
  )
}
