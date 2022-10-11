import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';

import { drawerWidth } from '../app/App';

import { selectIsLoggedIn } from '../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const matches = useMediaQuery('(min-width:800px)');
  const titleFontSize = matches ? 20 : 10;
  const buttonFontSize = matches ? 15 : 10;

  const handleLogOut:(event: React.MouseEvent<HTMLElement>) => void = () => {
    setAnchorEl(null);
    dispatch({type: 'user/removeUser'});
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                    alt="Logo"
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
              {
                isLoggedIn
                ?
                <>
                  <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                  </Menu>
                </>
                :
                <>
                  <Grid
                  container
                  direction="row"
                  alignItems="center"
                  wrap='nowrap'
                  >
                    <Grid item>
                      <Button
                      color="inherit"
                      onClick={() => navigate("login")}
                      sx={{ fontSize: buttonFontSize }}
                      >
                        Login
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                      color="inherit"
                      onClick={() => navigate("signup")}
                      sx={{ fontSize: buttonFontSize }}
                      >
                        Signup
                      </Button>
                    </Grid>
                  </Grid>
                </>
              }
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
