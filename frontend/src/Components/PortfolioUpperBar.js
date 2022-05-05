import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function PortfolioUpperBar(props) {
  const loggedOut = (
    <Box>
      <Button
      onClick={props.handleDisplayLogin}
      color="inherit"
      >
      Log In
      </Button>
      <Button
      onClick={props.handleDisplaySignUp}
      color="inherit"
      >
      Sign Up
      </Button>
    </Box>
  )

  const loggedIn = (
    <Box>
      <Button
      onClick={props.handleLogOut}
      color="inherit"
      >
      Log Out
      </Button>
    </Box>
  )

  const username = (
    <Typography variant="string" noWrap component="div">
      {props.username}
    </Typography>
  )

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Box display='flex' flexGrow={1}>
          <Typography variant="h6" noWrap component="div">
            Portfolio Manager
          </Typography>
        </Box>
        { props.isLoggedIn && username }
        { props.isLoggedIn ? loggedIn : loggedOut}
      </Toolbar>
    </AppBar>
  )
}
