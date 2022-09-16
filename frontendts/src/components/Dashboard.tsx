import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import AddTradeForm from './AddTradeForm';
import TotalHoldingsCard from './TotalHoldingsCard';
//import PieChart from '../Components/PieChart';

import * as Interface from '../interfaces/interfaces'

interface Props {
  selectedPortfolio: Interface.Portfolio
  portfolioReturn: Interface.Return
  handleAddTrade: Interface.handleAddTrade
  holdings: Interface.Holdings
}

export default function Dashboard(props: Props) {
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
          <>
            <Grid item xs>
              <TotalHoldingsCard
              selectedPortfolio={props.selectedPortfolio}
              portfolioReturn={props.portfolioReturn}
              />
            </Grid>
          </>
        }
      </Grid>
    </Box>
  )
}
