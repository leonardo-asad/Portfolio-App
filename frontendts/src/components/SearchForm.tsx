import * as React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function SearchForm() {
  const [keyword, setKeyword] = React.useState('');

  return (
    <>
      <Typography variant="h5" gutterBottom>Search Stock</Typography>
      <Typography variant="body1" gutterBottom>The Search Endpoint returns the best-matching symbols and market information based on keywords of your choice</Typography>
      <Box
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        console.log(keyword);
      }}
      sx={{
        display: 'flex',
        '& > :not(style)': { my: 2, mr: 2, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      >
        <TextField
        id="keyword"
        label="Keyword"
        variant="outlined"
        value={keyword}
        onChange={({target}) => setKeyword(target.value)}
        size="small"
        />


        <Button
        variant="contained"
        type="submit"
        >
          Search
        </Button>
      </Box>
    </>
  )
}
