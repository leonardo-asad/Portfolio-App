import * as React from 'react';
import {
  Routes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, loadUser } from '../features/user/userSlice';
import {
  selectSelectedPortfolio,
  loadPortfolios,
  setPortfolios,
  selectPortfolio,
  loadHoldings,
  loadTrades,
} from '../features/portfolio/portfolioSlice';

import Box from '@mui/material/Box';
import { HomeLayout } from "../layouts/HomeLayout";
import { ProtectedLayout } from "../layouts/ProtectedLayout";
import LogIn from "../features/user/LogIn";
import SignUp from "../features/user/SignUp";
import Holdings from "../features/portfolio/holdings";
import Trades from "../features/portfolio/trades";
import UpperBar from '../components/UpperBar';
import SideBar from '../components/SideBar';
import { Toolbar } from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme'
import '../App.css';
import * as Types from '../types/types'
import { AppDispatch } from './store';

export const drawerWidth = 240;

function App() {

  const [sideBarOpen, setSideBarOpen] = React.useState<Types.SideBarOpen>(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const selectedPortfolio = useSelector(selectSelectedPortfolio);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadUser())
      dispatch(loadPortfolios())
    } else {
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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Router>
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
            <Routes>
              <Route element={<HomeLayout />}>
                <Route path="/" element={<div>Home Page</div>}/>
                <Route path="/login" element={<LogIn />}/>
                <Route path="/signup" element={<SignUp />}/>
              </Route>

              <Route path="/portfolio" element={<ProtectedLayout />}>
                <Route path="holdings" element={<Holdings />}/>
                <Route path="trades" element={<Trades />}/>
              </Route>
            </Routes>
          </Box>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
