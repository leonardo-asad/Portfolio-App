import React from 'react';
import Box from '@mui/material/Box';

import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn } from '../features/user/userSlice';
import { loadUser } from '../features/user/userSlice';
import { changeDisplay, selectDisplay } from '../features/display/displaySlice';
import { setPortfolios, selectPortfolio, loadPortfolios } from '../features/portfolio/portfolioSlice';
import { AppDispatch } from './store';

import UpperBar from '../components/UpperBar';
import Holdings from '../containers/Holdings';
import LogIn from '../features/user/LogIn';
import SignUp from '../features/user/SignUp';
import * as Interface from '../types/types';

import '../App.css';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme'

export const drawerWidth = 240;

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const display = useSelector(selectDisplay);
  const [sideBarOpen, setSideBarOpen] = React.useState<Interface.SideBarOpen>(false);

  React.useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadUser())
      dispatch(changeDisplay('holdings'))
      dispatch(loadPortfolios())
    } else {
      dispatch(changeDisplay('login'))
      dispatch(setPortfolios([]));
      dispatch(selectPortfolio({
        pk: '',
        name: '',
        holdings_url: '',
        purchases_url: '',
        alerts_url: ''
      }));
    }
  }, [isLoggedIn, dispatch])

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
            handleSideBarToogle={handleSideBarToogle}
            />
          </React.Fragment>
        }

        { display === 'login' &&
          <LogIn />
        }

        { display === 'signup' &&
          <SignUp />
        }
      </Box>
    </ThemeProvider>
  );
}

export default App;
