import * as React from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  selectUsername,
} from '../features/user/userSlice';

export default function UserProfile() {
  const username = useSelector(selectUsername);

  return (
    <Box
    sx={{ m: 2 }}
    >
      <Typography variant="h5" gutterBottom sx={{ my:1 }}>USER PROFILE:</Typography>
      <Typography sx={{ my:1 }}>Username: {username}</Typography>

    </Box>
  )
}
