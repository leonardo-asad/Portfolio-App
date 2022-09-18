import React, { useReducer } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import * as Interface from '../interfaces/interfaces'

interface Props {
  handleAddTrade: Interface.handleAddTrade
}

export default function AddTradeForm(props: Props) {

  const [formInput, setFormInput] = useReducer(
    (state: Interface.Stock, newState: Interface.Stock) => ({ ...state, ...newState }),
    {
      ticker: "",
      shares: ""
    }
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const ticker: string = event.target.name;
    const shares: string = event.target.value;
    setFormInput({ [ticker]: shares });
  }

  const handleSubmit: Interface.AddTradeForm = (event, order, formInput) => {
    event.preventDefault();
    const shares = parseInt(formInput.shares)
    if (shares <= 0) {
      alert("Invalid shares Input")
    } else {
      if (order === "buy") {
        props.handleAddTrade(formInput);
      } else {
        formInput.shares = `${-shares}`
        props.handleAddTrade(formInput);
      }
    }
    setFormInput({
      ticker: '',
      shares: ''
    })
  }

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
        <Typography sx={{ m: 2, textAlign: 'center' }} variant="h4" >
          Buy / Sell Stocks
        </Typography>
      </Box>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ mx: 4 }}
      >
        <Grid
        container
        direction="row"
        justifyContent="center"
        spacing={4}
        >
          <Grid item xs>
            <TextField
              fullWidth
              required
              name="ticker"
              id="outlined-basic"
              label="Ticker"
              variant="outlined"
              value={formInput.ticker}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs>
            <TextField
              type="number"
              fullWidth
              required
              name="shares"
              id="outlined-basic"
              label="Shares"
              variant="outlined"
              value={formInput.shares}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            '& > :not(style)': { m: 2 },
          }}
        >
          <Button
            variant='contained'
            color='success'
            className='classes.button'
            onClick={(event) => handleSubmit(event, "buy", formInput)}
          >
            Buy
          </Button>
          <Button
            variant='contained'
            color='error'
            className='classes.button'
            onClick={(event) => handleSubmit(event, "sell", formInput)}
          >
            Sell
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
