import * as React from 'react';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function PortfolioUpperBar(props) {
  const matches = useMediaQuery('(min-width:600px)');
  const titleFontSize = matches ? 28 : 14;
  const buttonsFontSize = matches ? 14 : 10;

  const loggedOut = (
    <Box>
      <Button
        onClick={(event) => props.handleDisplay(event, 'login')}
        color="inherit"
        sx={{ fontSize: buttonsFontSize }}
      >
      Log In
      </Button>
      <Button
        onClick={(event) => props.handleDisplay(event, 'signup')}
        color="inherit"
        sx={{ fontSize: buttonsFontSize }}
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
      sx={{ fontSize: buttonsFontSize }}
      >
      Log Out
      </Button>
    </Box>
  )

  const username = (
    <Typography
    variant="string"
    noWrap component="div"
    sx={{ fontSize: buttonsFontSize }}
    >
      {props.username}
    </Typography>
  )

  return (
    <AppBar
      position="fixed"
      open={props.sideBarOpen}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1
        }}
    >
      <Toolbar>
        <Box
        display='flex'
        flexGrow={1}
        flexDirection= 'row'
        >
          {props.isLoggedIn &&
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={props.handleSideBarOpen}
              edge="start"
              sx={{ mr: 2, ...(props.sideBarOpen && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          }
          <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          >
            <Typography sx={{ fontSize: titleFontSize }} noWrap component="div">
              Portfolio Manager
            </Typography>
          </Box>
        </Box>
        { props.isLoggedIn &&
          <Stack direction="row" spacing={1}>
            <Chip icon={<FaceIcon style={{color: 'white'}} />} label={username} variant="outlined" style={{ color: 'white' }} />
          </Stack>
        }
        { props.isLoggedIn ? loggedIn : loggedOut}
      </Toolbar>
    </AppBar>
  )
}
