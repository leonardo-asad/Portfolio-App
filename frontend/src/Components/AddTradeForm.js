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

  const handleSubmit = (event) => {
    props.handleAddTrade(event, formInput);
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
        onSubmit={handleSubmit}
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
          type="submit"
          variant='contained'
          color='primary'
          className='classes.button'
        >
          Add Trade
        </Button>
      </Box>
  )
}
