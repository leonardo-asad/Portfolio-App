import React, { useReducer } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
      <Box
        sx={{
          display: 'flex',
          width: 1,
          justifyContent: 'center',
          m: 2
        }}
      >
        <Typography variant="h4" >
          Add Trade
        </Typography>
      </Box>

      <Box
        component="form"
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            '& > :not(style)': { m: 1 },
          }}
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
        </Box>
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

      </Box>
    </Box>
  )
}
