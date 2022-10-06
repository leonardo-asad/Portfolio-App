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

import { drawerWidth } from '../app/App';

import { selectUsername } from '../features/authenticate/userSlice'
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store'

interface AppBarProps extends MuiAppBarProps {
  open?: boolean,
}

interface UpperBarProps {
  handleSideBarToogle: () => void,
};

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
  const dispatch = useDispatch<AppDispatch>();
  const username = useSelector(selectUsername);

  const handleLogOut:(event: React.MouseEvent<HTMLButtonElement>) => void = () => {
    dispatch({type: 'user/removeUser'});
  }

  const matches = useMediaQuery('(min-width:800px)');
  const titleFontSize = matches ? 20 : 12;
  const buttonsFontSize = matches ? 10 : 7;

  const usernameComponent = (
    <Typography
    noWrap component="div"
    sx={{ fontSize: buttonsFontSize }}
    >
      { username }
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
                  <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  >
                    <Box
                    component="img"
                    sx={{
                    height: 36,
                    mr: 2
                    }}
                    alt="App Logo"
                    src={"iconMarket.png"}
                    />
                    <Typography
                      sx={{
                        mr: 2,
                        fontSize: titleFontSize,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                    >
                      SMART INVESTMENTS
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid >
            <Grid item>
              <Grid
              container
              direction="row"
              alignItems="center"
              wrap='nowrap'
              >
                <Grid item>
                  <Stack direction="row" spacing={1}>
                    <Chip icon={<FaceIcon style={{color: 'white'}} />} label={usernameComponent} size= 'small' variant="outlined" style={{ color: 'white' }} />
                  </Stack>
                </Grid>
                <Grid item>
                <Box>
                  <Button
                  onClick={handleLogOut}
                  color="inherit"
                  sx={{ fontSize: buttonsFontSize }}
                  >
                  Log Out
                  </Button>
                </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
