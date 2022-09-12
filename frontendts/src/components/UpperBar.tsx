import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { drawerWidth } from '../App';
import { PortfolioInterface } from '../interfaces/interfaces';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean,
}

interface UpperBarProps {
  selectedPortfolio: PortfolioInterface,
  handleSideBarToogle: () => void,
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
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


export default function UpperBar(props: UpperBarProps) {
  const matches = useMediaQuery('(min-width:700px)');
  const titleFontSize = matches ? 20 : 9;
  const buttonsFontSize = matches ? 10 : 7;

  const loggedOut = (
    <Box>
      <Button
        //onClick={(event) => props.handleDisplay(event, 'login')}
        color="inherit"
        sx={{ fontSize: buttonsFontSize }}
      >
      Log In
      </Button>
      <Button
        //onClick={(event) => props.handleDisplay(event, 'signup')}
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
      //onClick={props.handleLogOut}
      color="inherit"
      sx={{ fontSize: buttonsFontSize }}
      >
      Log Out
      </Button>
    </Box>
  )

  const username = (
    <Typography
    noWrap component="div"
    sx={{ fontSize: buttonsFontSize }}
    >
      Pepito
    </Typography>
  )

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
      >
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            wrap='nowrap'
          >
            <Grid item>
              <Grid
              container
              direction="row"
              alignItems="center"
              wrap='nowrap'
              >
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.handleSideBarToogle}
                    edge="start"
                    sx={{display: { sm: 'none' } }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography sx={{fontSize: titleFontSize}} component="div">
                    Portfolio App
                  </Typography>
                </Grid>
              </Grid>
            </Grid >
            <Grid item>
              { props.selectedPortfolio.name === '' ?
                <Typography sx={{fontSize: titleFontSize}} component="div">
                  No Selected Portfolio
                </Typography>
                :
                <Typography sx={{fontSize: titleFontSize}} component="div">
                  { props.selectedPortfolio.name }
                </Typography>
              }

            </Grid>
            <Grid item>
              <Grid
              container
              direction="row"
              alignItems="center"
              wrap='nowrap'
              >
                <Grid item>
                  { true &&
                    <Stack direction="row" spacing={1}>
                      <Chip icon={<FaceIcon style={{color: 'white'}} />} label={username} size= 'small' variant="outlined" style={{ color: 'white' }} />
                    </Stack>
                  }
                </Grid>
                <Grid item>
                  { true ? loggedIn : loggedOut}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
