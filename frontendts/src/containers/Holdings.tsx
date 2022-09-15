import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import SideBar from '../components/SideBar';
import HoldingsGrid from '../components/HoldingsGrid';
import Dashboard from '../components/Dashboard';
import CircularIndeterminate from '../components/CircularIndeterminate';
import NavTabs from '../components/NavTabs';
import TradesGrid from '../components/TradesGrid';
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
  const [tab, setTab] = useState<number>(0);

  const handleChangeTab: Interface.HandleChangeTab = (event, newTab) => {
    setTab(newTab);
  };

  const [isLoadingHoldings, setIsLoadingHoldings] = useState<boolean>(false)
  const [holdings, setHoldings] = useState<Interface.Holdings>([])
  const [trades, setTrades] = useState<Interface.Trades>([])

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

  useEffect(() => {
    if (props.selectedPortfolio.name !== "") {
      const fetchData = async () => {
        const response = await fetch(props.selectedPortfolio.purchases_url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.status === 200) {
          const trades = await response.json();
          setTrades(trades);
        } else {
          const json = await response.json();
          console.log(json);
        }
      }
      // Call the function
      fetchData()
    }
  }, [props.selectedPortfolio] )

  const handleAddTrade: Interface.handleAddTrade = (formInput) => {
    if (props.selectedPortfolio.name === "") {
      alert("Please select a Portfolio to add a new trade")
    } else {
      const data = {
        ...formInput,
        'portfolio': props.selectedPortfolio.pk
      }
      const addTrade = async () => {
        const response = await fetch('http://localhost:8000/api/portfolio/purchases/', {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        if (response.status === 201) {
          const trade: Interface.Trade = await response.json();
          setTrades([trade, ...trades]);
          updateHoldings();
        } else if (response.status === 400) {
          const json = await response.json();
          alert(json.detail);
        } else {
          const json = await response.json();
          console.log(JSON.stringify(json));
        }
      }
      // Call the function
      addTrade()
    }
  }

  return (
    <>
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

        <NavTabs
        tab={tab}
        handleChangeTab={handleChangeTab}
        />

        { isLoadingHoldings ?
            <CircularIndeterminate />
          :
            <>
              { tab === 0 && props.selectedPortfolio.name !== '' &&
                <>
                  <Dashboard
                  handleAddTrade={handleAddTrade}
                  />
                  <HoldingsGrid
                  holdings={holdings}
                  />
                </>
              }
              { tab === 1 && props.selectedPortfolio.name !== '' &&
                <TradesGrid
                trades={trades}
                />
              }
            </>
        }
      </Box>
    </>
  )
}
