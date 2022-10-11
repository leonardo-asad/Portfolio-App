import * as React from 'react';
import * as Types from '../types/types';
import { AppDispatch } from '../app/store';
import { Navigate, useOutlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UpperBar from "../components/UpperBar";
import SideBar from "../components/SideBar";
import { Box } from "@mui/material";
import { Toolbar } from '@mui/material';
import NavTabs from "../components/NavTabs";
import {
  selectIsLoggedIn,
  loadUser
} from "../features/user/userSlice";
import {
  selectSelectedPortfolio,
  loadPortfolios,
  selectPortfolio,
  setPortfolios,
  loadHoldings,
  loadTrades,
} from '../features/portfolio/portfolioSlice';

export const drawerWidth = 240;

export const ProtectedLayout = () => {
  const [sideBarOpen, setSideBarOpen] = React.useState<Types.SideBarOpen>(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const selectedPortfolio = useSelector(selectSelectedPortfolio);
  const dispatch = useDispatch<AppDispatch>();
  const outlet = useOutlet();

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

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
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
      <NavTabs />
      <>
        {outlet}
      </>
    </Box>
  </>
  );
};
