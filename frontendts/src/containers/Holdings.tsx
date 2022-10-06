import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SideBar from '../components/SideBar';
import HoldingsGrid from '../components/HoldingsGrid';
import Dashboard from '../components/Dashboard';
import CircularIndeterminate from '../components/CircularIndeterminate';
import NavTabs from '../components/NavTabs';
import TradesGrid from '../components/TradesGrid';
import AlertNoPortfolioSelected from '../components/AlertNoPortfolioSelected';
import {
  selectSelectedPortfolio,
  loadHoldings,
  loadTrades,
  selectIsLoadingHoldings,
  selectIsLoadingTrades,
} from '../features/portfolio/portfolioSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../app/store'
import { drawerWidth } from '../app/App';
import * as Interface from '../interfaces/interfaces'

interface Props {
  sideBarOpen: Interface.SideBarOpen,
  handleSideBarToogle: Interface.HandleSideBarToogle,
}

export default function Holdings(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const selectedPortfolio = useSelector(selectSelectedPortfolio);
  const isLoadingHoldings = useSelector(selectIsLoadingHoldings);
  const isLoadingTrades = useSelector(selectIsLoadingTrades);
  const [tab, setTab] = useState<number>(0);

  useEffect(() => {
    if (selectedPortfolio.name !== "") {
      dispatch(loadHoldings(selectedPortfolio.holdings_url))
      dispatch(loadTrades(selectedPortfolio.purchases_url))
    }
  }, [selectedPortfolio, dispatch])

  const handleChangeTab: Interface.HandleChangeTab = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <>
      <SideBar
        sideBarOpen={props.sideBarOpen}
        handleSideBarToogle={props.handleSideBarToogle}
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
            { tab === 0 && selectedPortfolio.name !== '' &&
              <>
              { isLoadingHoldings ?
                <CircularIndeterminate />
                :
                <>
                  <Dashboard />
                  <HoldingsGrid />
                </>
              }
              </>
            }
            { tab === 1 && selectedPortfolio.name !== '' &&
              <>
              { isLoadingTrades ?
                <CircularIndeterminate />
                :
                <TradesGrid />
              }
              </>
            }
            { selectedPortfolio.name === '' &&
              <AlertNoPortfolioSelected />
            }
          </>
      </Box>
    </>
  )
}
