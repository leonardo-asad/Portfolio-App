import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import SideBar from '../components/SideBar';
import HoldingsGrid from '../components/HoldingsGrid';
import Dashboard from '../components/Dashboard';
import { drawerWidth } from '../App';
import { PortfolioInterface } from '../interfaces/interfaces'

interface Props {
  sideBarOpen: boolean,
  portfolios: PortfolioInterface[]
  handleSideBarToogle: () => void,
  handleSelectPortfolio: (portfolio: PortfolioInterface) => void
}

export default function Holdings(props: Props) {
  return (
    <React.Fragment>
      <SideBar
        sideBarOpen={props.sideBarOpen}
        portfolios={props.portfolios}
        handleSideBarToogle={props.handleSideBarToogle}
        handleSelectPortfolio={props.handleSelectPortfolio}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Dashboard />
        <HoldingsGrid />
      </Box>
    </React.Fragment>
  )
}
