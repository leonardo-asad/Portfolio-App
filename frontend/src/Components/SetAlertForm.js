import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

export default function SetAlertForm(props) {
  const [ticker, setTicker] = React.useState('');
  const [threshold, setThreshold] = React.useState('');

  const handleChangeTicker = (event) => {
    setTicker(event.target.value);
  };


  const handleChangeThreshold = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    setThreshold(onlyNums);
}


  return (
    <Box
    sx={{
      display:'flex',
      gap: 2,
      minWidth: 120,
      m: 2
      }}
    >
      <FormControl sx={{ width: '25ch' }}>
        <InputLabel id="demo-simple-select-label">Asset</InputLabel>
        <Select
          labelId="asset"
          id="asset"
          value={ticker}
          label="Asset"
          onChange={handleChangeTicker}
        >
          {props.holdings.map((holding) => {
            return <MenuItem value={holding.ticker}>{holding.ticker}</MenuItem>
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ width: '25ch' }}>
        <TextField
          id="outlined-basic"
          value={threshold}
          onChange={handleChangeThreshold}
          label="Threshold"
          variant="outlined"
        />
      </FormControl>
    </Box>
  );
}
