import * as React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUsername } from '../features/user/userSlice';

export default function Home() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const username = useSelector(selectUsername);

  const HomeLoggedIn = (
    <>
      <Typography variant="h5" gutterBottom>
        Hello {username} !!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Search Information of Stocks, ETFs and Mutual Funds. In addition, you can track your Portfolio/s and their composition.
      </Typography>
    </>
  )

  return (
    <Box sx={{ width: '100%' }}>
      {
        !isLoggedIn ?
        <>
          <Typography variant="h5" gutterBottom>
            Welcome to Smart Investments!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Search information about your prefered Stocks or Create a new Account to track your investments in Stocks and ETFs.
          </Typography>
          <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>
        </>
        :
        <>
        {HomeLoggedIn}
        </>
      }
    </Box>
  )
}
