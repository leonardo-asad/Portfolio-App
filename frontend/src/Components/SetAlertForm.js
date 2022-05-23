import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

export default function SetAlertForm(props) {
  return (
    <Box
    component="form"
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
          value={props.selected_holding}
          label="Asset"
          onChange={props.handleSetHolding}
        >
          {props.holdings.map((holding, index) => {
            return <MenuItem key={index} value={holding}>{holding.ticker}</MenuItem>
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ width: '25ch' }}>
      <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="type"
          id="type"
          value={props.type}
          onChange={props.handleChangeType}
          label="Type"
        >
          <MenuItem value={'Lower'}>Lower</MenuItem>
          <MenuItem value={'Upper'}>Upper</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: '25ch' }}>
        <TextField
          id="outlined-basic"
          value={props.threshold}
          onChange={props.handleChangeThreshold}
          type="number"
          label="Threshold"
          variant="outlined"
        />
      </FormControl>
    </Box>
  );
}
