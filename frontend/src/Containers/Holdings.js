import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';

import SideBar from '../Components/SideBar';
import NavTabs from '../Components/NavTabs';
import HoldingsGrid from '../Components/HoldingsGrid';
import TradesTable from '../Components/TradesTable';
import CircularIndeterminate from '../Components/CircularIndeterminate';
import Dashboard from '../Components/Dashboard';

export default function Holdings(props) {
  const [tab, setTab] = useState(0);
  const [holdings, setHoldings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [trades, setTrades] = useState([])
  const [totalHoldings, setTotalHoldings] = useState(null)
  const [totalPercentChange, setTotalPercentChange] = useState(null)
  const [totalChange, setTotalChange] = useState(null)

  const updateHoldings = useCallback(async () => {
    setIsLoading(true)
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
    setIsLoading(false);
  }, [props.selectedPortfolio])

  useEffect(() => {
    if (JSON.stringify(props.selectedPortfolio) !== "{}") {
      updateHoldings()
    }
  }, [props.selectedPortfolio, updateHoldings] )

  useEffect(() => {
    if (JSON.stringify(props.selectedPortfolio) !== "{}") {
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

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  const handleTotalHoldings = (totalHoldings) => {
    setTotalHoldings(totalHoldings);
  }

  const handleWorthChange = (totalPercentChange, totalChange) => {
    setTotalPercentChange(totalPercentChange);
    setTotalChange(totalChange);
  }



  const handleAddTrade = (event, formInput) => {
    event.preventDefault();
    if (JSON.stringify(props.selectedPortfolio) === "{}") {
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
          const trade = await response.json();
          setTrades([trade, ...trades]);
          updateHoldings();
        } else {
          const json = await response.json();
          console.log(JSON.stringify(json));
        }
      }
      // Call the function
      addTrade()
    }
  }

  const handleEditPortfolio = (event, pk, name) => {
    event.preventDefault();
    const editPortfolio = async (pk) => {
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

  const handleDeletePortfolio = (event, pk) => {
    event.preventDefault();
    const deletePortfolio = async (pk) => {
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
        setTotalHoldings(null);
        setTotalPercentChange(null);
        if (props.portfolios.length > 1) {
          props.handleSelectPortfolio(props.portfolios[props.portfolios.length - 2])
        } else {
          props.handleSelectPortfolio({})
        }
      } else {
        const json = await response.json();
        console.log(JSON.stringify(json));
      }
    }
    deletePortfolio(pk)
  }

  const handleCreatePortfolio = (event, name) => {
    event.preventDefault();
    const createPortfolio = async (name) => {
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

  return (
    <React.Fragment>
      <SideBar
      username={props.username}
      email={props.email}
      portfolios={props.portfolios}
      selectedPortfolio={props.selectedPortfolio}
      holdings={holdings}
      onClick={props.handleSelectPortfolio}
      handleEditPortfolio={handleEditPortfolio}
      handleDeletePortfolio={handleDeletePortfolio}
      handleCreatePortfolio={handleCreatePortfolio}
      />

      <Box
      component="div"
      sx={{ flexGrow: 1, p: 3 }}
      >
        <NavTabs
        tab={tab}
        onClick={handleChange}
        />

        { isLoading ?

          <CircularIndeterminate /> :

          <>
            { (tab === 0 && props.portfolios.length > 0 && JSON.stringify(props.selectedPortfolio) !== "{}") &&
              <React.Fragment>
                  <Dashboard
                  handleAddTrade={handleAddTrade}
                  selectedPortfolio={props.selectedPortfolio}
                  totalHoldings={totalHoldings}
                  totalPercentChange={totalPercentChange}
                  totalChange={totalChange}
                  holdings={holdings}
                  />

                  <HoldingsGrid
                    holdings={holdings}
                    handleTotalHoldings={handleTotalHoldings}
                    handleWorthChange={handleWorthChange}
                  />
              </React.Fragment>
            }

            { (tab === 1 && JSON.stringify(props.selectedPortfolio) !== "{}") &&
              <TradesTable
              trades={trades}
              />
            }
          </>
        }
      </Box>

    </React.Fragment>
  )
}
