import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import AddTradeForm from '../Components/AddTradeForm';
import TotalHoldingsCard from '../Components/TotalHoldingsCard';
import PieChart from '../Components/PieChart';

export default function Dashboard(props) {
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
          handleAddTrade={props.handleAddTrade}
          />
        </Grid>
        { props.holdings.length > 0 &&
          <React.Fragment >
            <Grid item xs>
              <TotalHoldingsCard
              selectedPortfolio={props.selectedPortfolio}
              totalHoldings={props.totalHoldings}
              totalPercentChange={props.totalPercentChange}
              totalChange={props.totalChange}
              />
            </Grid>
            <Grid item xs>
              <PieChart
              holdings={props.holdings}
              />
            </Grid>
          </React.Fragment>
        }
      </Grid>
    </Box>
  )
}
