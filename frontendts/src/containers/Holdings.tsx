import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import SideBar from '../components/SideBar';
import HoldingsGrid from '../components/HoldingsGrid';
import Dashboard from '../components/Dashboard';
import CircularIndeterminate from '../components/CircularIndeterminate';
import { drawerWidth } from '../App';
import * as Interface from '../interfaces/interfaces'

interface Props {
  sideBarOpen: Interface.SideBarOpen,
  portfolios: Interface.Portfolios,
  selectedPortfolio: Interface.Portfolio,
  handleSideBarToogle: Interface.HandleSideBarToogle,
  handleSelectPortfolio: Interface.HandleSelectPortfolio
}

export default function Holdings(props: Props) {
  const [isLoadingHoldings, setIsLoadingHoldings] = useState(false)
  const [holdings, setHoldings] = useState([])

  const updateHoldings = useCallback(async () => {
    setIsLoadingHoldings(true);
    const response = await fetch(props.selectedPortfolio.holdings_url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.status === 200) {
      const holdings = await response.json();
      setHoldings(holdings);
    } else {
      const json = await response.json();
      console.log(json);
    }
    setIsLoadingHoldings(false);
  }, [props.selectedPortfolio])

  useEffect(() => {
    if (props.selectedPortfolio.name !== "") {
      updateHoldings();
    }
  }, [props.selectedPortfolio, updateHoldings] )

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
        { isLoadingHoldings ?
            <CircularIndeterminate />
          :
            <React.Fragment>
              { props.selectedPortfolio.name !== '' &&
                <React.Fragment>
                  <Dashboard />
                  <HoldingsGrid
                  holdings={holdings}
                  />
                </React.Fragment>
              }
            </React.Fragment>
        }
      </Box>
    </React.Fragment>
  )
}
