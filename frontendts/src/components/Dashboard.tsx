import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import AddTradeForm from './AddTradeForm';
import TotalHoldingsCard from './TotalHoldingsCard';
import PieChart from './PieChart';

import * as Interface from '../interfaces/interfaces'

import { useSelector, useDispatch } from 'react-redux';
import {
  selectSelectedPortfolio,
  selectHoldings,
  selectPortfolioReturn,
  loadHoldings,
  addTrade
} from '../features/portfolio/portfolioSlice';
import { AppDispatch } from '../app/store';

export default function Dashboard() {
  const matches = useMediaQuery('(min-width:920px)');
  const margin = matches ? 5 : 0;
  const dispatch = useDispatch<AppDispatch>();
  const selectedPortfolio = useSelector(selectSelectedPortfolio);
  const holdings = useSelector(selectHoldings);
  const portfolioReturn = useSelector(selectPortfolioReturn);

  const handleAddTrade: Interface.handleAddTrade = (formInput) => {
    if (selectedPortfolio.name === "") {
      alert("Please select a Portfolio to add a new trade")
    } else {
      const newTrade = {
        portfolio: selectedPortfolio.pk,
        shares: formInput.shares,
        ticker: formInput.ticker
      }
      dispatch(addTrade(newTrade))
        .unwrap()
        .then(() => {
          dispatch(loadHoldings(selectedPortfolio.holdings_url));
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError)
        })
    }
  }

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
          handleAddTrade={handleAddTrade}
          />
        </Grid>
        { holdings.length > 0 &&
          <>
            <Grid item xs>
              <TotalHoldingsCard
              selectedPortfolio={selectedPortfolio}
              portfolioReturn={portfolioReturn}
              />
            </Grid>
            <Grid item xs>
              <PieChart
              holdings={holdings}
              />
            </Grid>
          </>
        }
      </Grid>
    </Box>
  )
}
