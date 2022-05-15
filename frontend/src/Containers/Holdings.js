import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (JSON.stringify(props.selectedPortfolio) !== "{}") {
      setIsLoading(true)
      fetch(props.selectedPortfolio.holdings_url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => response.json())
      .then(json => {
        setHoldings(json)
        setIsLoading(false)
      })
    }
  }, [props.selectedPortfolio] )

  useEffect(() => {
    if (JSON.stringify(props.selectedPortfolio) !== "{}") {
      fetch(props.selectedPortfolio.purchases_url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => response.json())
      .then(json => {
        setTrades(json)
      })
    }
  }, [props.selectedPortfolio] )

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  const handleTotalHoldings = (totalHoldings) => {
    setTotalHoldings(totalHoldings);
  }

  const handleTotalPercentChange = (totalPercentChange) => {
    setTotalPercentChange(totalPercentChange);
  }

  const updateHoldings = () => {
    fetch(props.selectedPortfolio.holdings_url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(json => {
      setHoldings(json)
    })
  }

  const handleAddTrade = (event, formInput) => {
    event.preventDefault();
    if (JSON.stringify(props.selectedPortfolio) === "{}") {
      alert("Please select a Portfolio to submit a new trade")
    } else {
      const data = {
        ...formInput,
        'portfolio': props.selectedPortfolio.pk
      }
      fetch('/api/portfolio/purchases/', {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.status === 201) {
          response.json()
          .then(trade => setTrades([trade, ...trades]))
          .then(() => updateHoldings())
        } else {
          response.json()
          .then(json => alert(json.detail))
        }
      })
    }
  }

  const handleEditPortfolio = (e, pk, name) => {
    e.preventDefault()
    fetch(`/api/portfolio/${pk}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'name': name})
    })
    .then(response => {
      if (response.status === 200) {
        props.updatePortfolioList()
      } else {
        response.json()
        .then(json => console.log(json.detail))
      }
    })
  }

  const handleDeletePortfolio = (e, pk) => {
    e.preventDefault()
    fetch(`/api/portfolio/${pk}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 204) {
        props.updatePortfolioList()
        setHoldings([])
        setTrades([])
        setTotalHoldings(null)
        setTotalPercentChange(null)
      } else {
        response.json()
        .then(json => console.log(json.detail))
      }
    })
    .then(() => {
      if (props.portfolios.length > 1) {
        props.handleSelectPortfolio(props.portfolios[0])
      } else {
        props.handleSelectPortfolio({})
      }
    })
  }

  const handleCreatePortfolio = (e, name) => {
    fetch('/api/portfolio/', {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'name': name})
    })
    .then(response => {
      if (response.status === 201) {
        props.updatePortfolioList()
      } else {
        response.json()
        .then(json => console.log(json.detail))
      }
    })
  }

  return (
    <React.Fragment>
      <SideBar
      portfolios={props.portfolios}
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
                  holdings={holdings}
                  />

                  <HoldingsGrid
                    holdings={holdings}
                    handleTotalHoldings={handleTotalHoldings}
                    handleTotalPercentChange={handleTotalPercentChange}
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
