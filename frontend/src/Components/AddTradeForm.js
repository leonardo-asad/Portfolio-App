import React, { useReducer } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AddTradeForm(props) {

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      ticker: "",
      shares: ""
    }
  );

  const handleChange = (e) => {
    e.preventDefault();
    const target = e.target
    const name = target.name;
    const value = target.value;
    setFormInput({ [name]: value });
  }

  const handleSubmit = (event, order, formInput) => {
    const shares = parseInt(formInput.shares)
    if (shares <= 0) {
      alert("Invalid shares Input")
    } else {
      if (order === "buy") {
        props.handleAddTrade(event, formInput);
      } else {
        formInput.shares = -shares
        props.handleAddTrade(event, formInput);
      }
    }
    setFormInput({
      ticker: '',
      shares: ""
    })
  }

  return (
      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          '& > :not(style)': { m: 2 },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          size='small'
          required
          name="ticker"
          id="outlined-basic"
          label="Ticker"
          variant="outlined"
          value={formInput.ticker}
          onChange={handleChange}

        />
        <TextField
          type="number"
          size='small'
          required
          name="shares"
          id="outlined-basic"
          label="Shares"
          variant="outlined"
          value={formInput.shares}
          onChange={handleChange}
        />
        <Button
          variant='contained'
          color='success'
          className='classes.button'
          onClick={(e) => handleSubmit(e, "buy", formInput)}
        >
          Buy
        </Button>
        <Button
          variant='contained'
          color='error'
          className='classes.button'
          onClick={(e) => handleSubmit(e, "sell", formInput)}
        >
          Sell
        </Button>
      </Box>
  )
}
