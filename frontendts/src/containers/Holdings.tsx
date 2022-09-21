import React, { useState, useEffect, useCallback } from 'react';
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

interface Props {
  sideBarOpen: Interface.SideBarOpen,
  portfolios: Interface.Portfolios,
  selectedPortfolio: Interface.Portfolio,
  updatePortfolioList: Interface.UpdatePortfolioList,
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
  const [portfolioReturn, setPortfolioReturn] = useState<Interface.Return>({
    'totalHoldings': undefined,
    'totalChange': undefined,
    'totalPercentChange': undefined
  });

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

  const updatePortfolioReturn: Interface.UpdatePortfolioReturn = useCallback((totalHoldings, totalChange, totalPercentChange) => {
    setPortfolioReturn({
      'totalHoldings': totalHoldings,
      'totalChange': totalChange,
      'totalPercentChange': totalPercentChange
    })
  }, [])

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

  const handleCreatePortfolio: Interface.HandleCreatePortfolio = (event, name) => {
    event.preventDefault();
    const createPortfolio = async (name: string) => {
      const response = await fetch('/api/portfolio/', {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'name': name})
      })
      if (response.status === 201) {
        const portfolio = await response.json();
        props.updatePortfolioList();
        props.handleSelectPortfolio(portfolio);
      } else {
        const json = await response.json();
        console.log(JSON.stringify(json));
      }
    }
    createPortfolio(name)
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
        props.updatePortfolioList()
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
        props.updatePortfolioList();
        setHoldings([]);
        setTrades([]);
        props.handleSelectPortfolio({
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
    if (props.selectedPortfolio.name === "") {
      alert("Please select a Portfolio to add a new trade")
    } else {
      const data = {
        ...formInput,
        'portfolio': props.selectedPortfolio.pk
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
        handleCreatePortfolio={handleCreatePortfolio}
        handleEditPortfolio={handleEditPortfolio}
        handleDeletePortfolio={handleDeletePortfolio}
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
                  selectedPortfolio={props.selectedPortfolio}
                  portfolioReturn={portfolioReturn}
                  handleAddTrade={handleAddTrade}
                  holdings={holdings}
                  />
                  <HoldingsGrid
                  holdings={holdings}
                  updatePortfolioReturn={updatePortfolioReturn}
                  />
                </>
              }
              { tab === 1 && props.selectedPortfolio.name !== '' &&
                <TradesGrid
                trades={trades}
                />
              }
              { props.selectedPortfolio.name === '' &&
                <AlertNoPortfolioSelected />
              }
            </>
        }
      </Box>
    </>
  )
}
