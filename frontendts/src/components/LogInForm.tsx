import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';

import * as Types from '../types/types';

const theme = createTheme();

interface Props {
  handleSignIn: Types.HandleSignIn
  handleDisplay: Types.HandleDisplay
}

export default function LogInForm(props: Props) {
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:900px)');

  return (
    <ThemeProvider theme={theme}>
      <Grid
      container
      direction="row"
      justifyContent="center"
      component="main"
      sx={{ height: '100vh' }}
      >
        <CssBaseline />
        {
          matches &&
          <Grid
            item
            xs={false}
            sm={4}
            md={6}
            maxHeight= "700px"
            sx={{
              backgroundImage: 'url(exchange03.jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        }
        <Grid
        item
        xs={11}
        sm={11}
        md={6}
        maxHeight= "700px"
        component={Paper}
        elevation={0}
        square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <Box component="form" onSubmit={props.handleSignIn} noValidate sx={{ mt: 1 }}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="center">
                <Grid item onClick={() => navigate("/signup")}>
                  <Link variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
