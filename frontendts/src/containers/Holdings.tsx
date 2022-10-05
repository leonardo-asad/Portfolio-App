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
import { drawerWidth } from '../app/App';
import * as Interface from '../interfaces/interfaces'

import {
  loadPortfolios,
  addPortfolio,
  selectSelectedPortfolio,
  selectPortfolios,
  selectPortfolio,
  selectHoldings,
  selectIsLoadingHoldings,
  loadHoldings,
  setHoldings,
  loadTrades,
  setTrades,
  selectIsLoadingTrades,
  selectTrades,
  selectPortfolioReturn,
  createPortfolio
} from '../features/portfolio/portfolioSlice'
import { changeDisplay, selectDisplay } from '../features/display/displaySlice';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../app/store'

interface Props {
  sideBarOpen: Interface.SideBarOpen,
  handleSideBarToogle: Interface.HandleSideBarToogle,
}

export default function Holdings(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const display = useSelector(selectDisplay);
  const selectedPortfolio = useSelector(selectSelectedPortfolio);
  const portfolios = useSelector(selectPortfolios);
  const isLoadingHoldings = useSelector(selectIsLoadingHoldings);
  const holdings = useSelector(selectHoldings);
  const trades = useSelector(selectTrades);
  const isLoadingTrades = useSelector(selectIsLoadingTrades);
  const portfolioReturn = useSelector(selectPortfolioReturn);

  const [tab, setTab] = useState<number>(0);

  useEffect(() => {
    if (selectedPortfolio.name !== "") {
      dispatch(loadHoldings(selectedPortfolio.holdings_url))
    }
  }, [selectedPortfolio, dispatch])

  useEffect(() => {
    if (selectedPortfolio.name !== "") {
      dispatch(loadTrades(selectedPortfolio.purchases_url))
    }
  }, [selectedPortfolio, dispatch] )

  const handleChangeTab: Interface.HandleChangeTab = (event, newTab) => {
    setTab(newTab);
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

  const handleCreatePortfolio: Interface.HandleCreatePortfolio = async (event, name) => {
    event.preventDefault();
    try {
      const newPortfolio = await dispatch(createPortfolio(name)).unwrap();
      // If action is fulfilled
      dispatch(addPortfolio(newPortfolio));
      handleSelectPortfolio(newPortfolio);
    } catch (rejectedValue) {
      // If action is rejected
      console.log(rejectedValue);
    }
  }

  const handleEditPortfolio: Interface.HandleEditPortfolio = (event, pk, name) => {
    event.preventDefault();
    const editPortfolio = async (pk: string) => {
      const response = await fetch(`/api/portfolio/${pk}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'name': name})
      })
      if (response.status === 200) {
        dispatch(loadPortfolios);
      } else {
        const json = await response.json();
        console.log(JSON.stringify(json));
      }
    }
    editPortfolio(pk)
  }

  const handleDeletePortfolio: Interface.HandleDeletePortfolio = (event, pk) => {
    event.preventDefault();
    const deletePortfolio = async (pk: string) => {
      const response = await fetch(`/api/portfolio/${pk}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 204) {
        dispatch(loadPortfolios())
        dispatch(setHoldings([]));
        setTrades([]);
        handleSelectPortfolio({
          pk: '',
          name: '',
          holdings_url: '',
          purchases_url: '',
          alerts_url: ''
        })
        //setTotalHoldings(null);
        //setTotalPercentChange(null);
      } else {
        const json = await response.json();
        console.log(JSON.stringify(json));
      }
    }
    deletePortfolio(pk)
  }

  const handleAddTrade: Interface.handleAddTrade = (formInput) => {
    if (selectedPortfolio.name === "") {
      alert("Please select a Portfolio to add a new trade")
    } else {
      const data = {
        ...formInput,
        'portfolio': selectedPortfolio.pk
      }
      const addTrade = async () => {
        const response = await fetch('/api/portfolio/purchases/', {
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
          dispatch(loadHoldings(selectedPortfolio.holdings_url));
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
        portfolios={portfolios}
        handleSideBarToogle={props.handleSideBarToogle}
        handleCreatePortfolio={handleCreatePortfolio}
        handleEditPortfolio={handleEditPortfolio}
        handleDeletePortfolio={handleDeletePortfolio}
        handleSelectPortfolio={handleSelectPortfolio}
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
                  <Dashboard
                  selectedPortfolio={selectedPortfolio}
                  portfolioReturn={portfolioReturn}
                  handleAddTrade={handleAddTrade}
                  holdings={holdings}
                  />
                  <HoldingsGrid
                  holdings={holdings}
                  />
                </>
              }
              </>
            }
            { tab === 1 && selectedPortfolio.name !== '' &&
              <>
              { isLoadingTrades ?
                <CircularIndeterminate />
                :
                <TradesGrid
                trades={trades}
                />
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
