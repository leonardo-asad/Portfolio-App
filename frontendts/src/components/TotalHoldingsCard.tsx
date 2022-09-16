import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import * as Interface from '../interfaces/interfaces'

interface Props {
  selectedPortfolio: Interface.Portfolio
  portfolioReturn: Interface.Return
}

export default function TotalHoldingsCard(props: Props) {

  const color = typeof props.portfolioReturn.totalPercentChange === 'undefined' ?
                "black"
                :
                props.portfolioReturn.totalPercentChange > 0 ? 'green' : 'red'

  const card = (
    <>
    {
      (typeof props.portfolioReturn.totalHoldings !== 'undefined' || typeof props.portfolioReturn.totalChange !== 'undefined' || typeof props.portfolioReturn.totalPercentChange !== 'undefined') &&
        <>
          <Box>
            <Typography sx={{ mt: 2 }} variant="h4" align='center'>
              {props.selectedPortfolio.name}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" align='center'>
              Total Worth
            </Typography>
          </Box>
          <Box>
            <Typography variant="h4" component="div" align='center'>
              $ {props.portfolioReturn.totalHoldings?.toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ mb: 2, fontSize: 16, color: {color} }} align='center'>
              {props.portfolioReturn.totalPercentChange?.toFixed(2)} % ({props.portfolioReturn.totalChange?.toFixed(2)})
            </Typography>
          </Box>
        </>
      }
    </>
  )

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
      {card}
    </Box>
  );
}
