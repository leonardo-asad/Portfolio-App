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
import { AuthenticateLayout } from '../layouts/AuthenticateLayout'
import Home from '../components/Home';
import LogIn from "../features/user/LogIn";
import SignUp from "../features/user/SignUp";
import Holdings from "../features/portfolio/holdings";
import Trades from "../features/portfolio/trades";
import UpperBar from '../components/UpperBar';
import SideBar from '../components/SideBar';
import SearchStock from '../features/stock/SearchStock';
import UserProfile from '../components/UserProfile';

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
          <Routes>
            <Route element={<HomeLayout />}>
              <Route path="/" element={<Home />}/>
              <Route path="/quote" element={<SearchStock />}/>
            </Route>

            <Route element={<AuthenticateLayout />}>
              <Route path="/login" element={<LogIn />}/>
              <Route path="/signup" element={<SignUp />}/>
            </Route>

            <Route element={<ProtectedLayout />}>
              <Route path="/userProfile" element={<UserProfile />} />
            </Route>

            <Route path="/portfolio" element={<ProtectedLayout />}>
              <Route path="holdings" element={<Holdings />}/>
              <Route path="trades" element={<Trades />}/>
            </Route>
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
