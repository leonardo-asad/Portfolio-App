import * as Types from '../types/types';
import React from 'react';
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';
import UpperBar from '../components/UpperBar';
import SideBar from '../components/SideBar';
import NavTabs from '../components/NavTabs';
import LogIn from '../features/user/LogIn';
import SignUp from '../features/user/SignUp';
import Holdings from '../features/portfolio/holdings';
import Trades from '../features/portfolio/trades';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn } from '../features/user/userSlice';
import { loadUser } from '../features/user/userSlice';
import { changeDisplay, selectDisplay } from '../features/display/displaySlice';
import {
  setPortfolios,
  selectPortfolio,
  loadPortfolios,
  loadHoldings,
  loadTrades,
  selectSelectedPortfolio,
} from '../features/portfolio/portfolioSlice';
import { AppDispatch } from './store';
import '../App.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme'

export const drawerWidth = 240;

function App() {
  const [sideBarOpen, setSideBarOpen] = React.useState<Types.SideBarOpen>(false);
  const [tab, setTab] = React.useState<number>(0);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const display = useSelector(selectDisplay);
  const selectedPortfolio = useSelector(selectSelectedPortfolio);
  const dispatch = useDispatch<AppDispatch>();

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

  React.useEffect(() => {
    if (selectedPortfolio.name !== "") {
      dispatch(loadHoldings(selectedPortfolio.holdings_url))
      dispatch(loadTrades(selectedPortfolio.purchases_url))
    }
  }, [selectedPortfolio, dispatch])

  const handleSideBarToogle: Types.HandleSideBarToogle = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const handleChangeTab: Types.HandleChangeTab = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        { display === 'holdings' &&
          <>
            <UpperBar
            handleSideBarToogle={handleSideBarToogle}
            />
            <SideBar
            sideBarOpen={sideBarOpen}
            handleSideBarToogle={handleSideBarToogle}
            />
            <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
              <Toolbar />
              <NavTabs
              tab={tab}
              handleChangeTab={handleChangeTab}
              />
              <>
                { tab === 0 &&
                  <Holdings />
                }
                { tab === 1 &&
                  <Trades />
                }
              </>
            </Box>
          </>
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
