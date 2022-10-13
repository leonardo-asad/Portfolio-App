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
        To begin, please select a portfolio to view your holdings, or create a new portfolio if you haven't one.
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
            Search information about your prefered Stocks and watch the latest news in the market.
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
