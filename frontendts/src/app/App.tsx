import React from 'react';
import Box from '@mui/material/Box';

import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn } from '../features/authenticate/userSlice';
import { loadUser, authenticateUser, createUser } from '../features/authenticate/userSlice';
import { changeDisplay, selectDisplay } from '../features/display/displaySlice';
import { selectPortfolios, selectSelectedPortfolio, addPortfolios, selectPortfolio, fetchPortfolios } from '../features/portfolio/portfolioSlice';
import { AppDispatch } from './store';

import UpperBar from '../components/UpperBar';
import Holdings from '../containers/Holdings';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import * as Interface from '../interfaces/interfaces';

import '../App.css';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme'

export const drawerWidth = 240;

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const display = useSelector(selectDisplay);
  const portfolios = useSelector(selectPortfolios);
  const selectedPortfolio = useSelector(selectSelectedPortfolio);

  React.useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadUser())
      dispatch(changeDisplay('holdings'))
      dispatch(fetchPortfolios())
    } else {
      dispatch(changeDisplay('login'))
      dispatch(addPortfolios([]));
      dispatch(selectPortfolio({
        pk: '',
        name: '',
        holdings_url: '',
        purchases_url: '',
        alerts_url: ''
      }));
    }
  }, [isLoggedIn, dispatch])

  const handleDisplay: Interface.HandleDisplay = (event, display) => {
    event.preventDefault();
    if (display === 'signup') {
      dispatch(changeDisplay('signup'))
    } else if (display === 'login') {
      dispatch(changeDisplay('login'))
    }
  }

  const handleSignIn: Interface.HandleSignIn = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username')
    const password = formData.get('password')

    if (typeof username === 'string' && typeof password === 'string') {
      dispatch(authenticateUser({
        username: username,
        password: password
      }))
    }
  };

  const handleSignUp: Interface.HandleSignUp = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');
    const email = formData.get('email');

    if (
      typeof username === 'string' &&
      typeof password === 'string' &&
      (typeof email === 'string' || typeof email === 'undefined')
      ) {
        dispatch(createUser({
          username: username,
          email: email,
          password: password
        }))
      }
  };

  const handleSelectPortfolio: Interface.HandleSelectPortfolio = (portfolio) => {
    if (display !== 'holdings') {
      dispatch(changeDisplay('holdings'))
    }

    if (selectedPortfolio.name !== '') {
      if (selectedPortfolio.name === portfolio.name) {
        return;
      }
    }
    dispatch(selectPortfolio(portfolio));
  }

  const [sideBarOpen, setSideBarOpen] = React.useState<Interface.SideBarOpen>(false);

  const handleSideBarToogle: Interface.HandleSideBarToogle = () => {
    setSideBarOpen(!sideBarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        { display === 'holdings' &&
          <React.Fragment>
            <UpperBar
            handleSideBarToogle={handleSideBarToogle}
            />
            <Holdings
            sideBarOpen={sideBarOpen}
            portfolios={portfolios}
            selectedPortfolio={selectedPortfolio}
            handleSideBarToogle={handleSideBarToogle}
            handleSelectPortfolio={handleSelectPortfolio}
            />
          </React.Fragment>
        }

        { display === 'login' &&
          <SignIn
          handleSignIn={handleSignIn}
          handleDisplay={handleDisplay}
          />
        }

        { display === 'signup' &&
          <SignUp
          handleSignUp={handleSignUp}
          handleDisplay={handleDisplay}
          />
        }
      </Box>
    </ThemeProvider>
  );
}

export default App;
