import * as React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        Welcome to Smart Investments!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Search information about your prefered Stocks and watch the latest news in the market. Sign Up and track your stocks portfolios.
      </Typography>
      <Button
      variant="contained"
      sx={{ mt: 2 }}
      onClick={() => navigate("/signup")}
      >
        Get Started
      </Button>
    </Box>
  )
}
