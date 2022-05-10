import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

import SideBar from '../Components/SideBar';
import NavTabs from '../Components/NavTabs';
import HoldingsTable from '../Components/HoldingsTable';
import HoldingsGrid from '../Components/HoldingsGrid';
import TradesTable from '../Components/TradesTable';
import CircularIndeterminate from '../Components/CircularIndeterminate';
import OutlinedCard from '../Components/Card';
import AddTradeForm2 from '../Components/AddTradeForm2';
import TotalHoldingsCard from '../Components/TotalHoldingsCard';
import BarChart from '../Components/PieChart';

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
      console.log(`Fetching to :${props.selectedPortfolio.holdings_url}`)
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
      console.log(`Fetching to :${props.selectedPortfolio.purchases_url}`)
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
    console.log(`Fetching to :${props.selectedPortfolio.holdings_url}`)
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
      console.log( data );
      fetch('http://localhost:8000/api/portfolio/purchases/', {
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
          console.log("Added new trade")
        } else {
          response.json()
          .then(json => alert(json.detail))
        }
      })
    }
  }

  const handleEditPortfolio = (e, pk, name) => {
    e.preventDefault()
    fetch(`http://localhost:8000/api/portfolio/${pk}`, {
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
        console.log(`Portfolio Edited succesfully`)
      } else {
        response.json()
        .then(json => console.log(json.detail))
      }
    })
  }

  const handleDeletePortfolio = (e, pk) => {
    e.preventDefault()
    fetch(`http://localhost:8000/api/portfolio/${pk}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 204) {
        props.updatePortfolioList()
        console.log("Portfolio Deleted Succesfully")
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
    fetch('http://localhost:8000/api/portfolio/', {
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
        console.log(`Portfolio Created succesfully`)
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
      onClick={props.handleSelectPortfolio}
      handleEditPortfolio={handleEditPortfolio}
      handleDeletePortfolio={handleDeletePortfolio}
      handleCreatePortfolio={handleCreatePortfolio}
      />
      <Box component="div" sx={{ flexGrow: 1, p: 3 }} >
        <NavTabs
        tab={tab}
        onClick={handleChange}
        />

        { isLoading ?

          <CircularIndeterminate /> :

          <>
            { (tab === 3 && JSON.stringify(props.selectedPortfolio) !== "{}") &&
              <HoldingsTable
              holdings={holdings}
              handleAddTrade={handleAddTrade}
              />
            }
            { (tab === 0 && JSON.stringify(props.selectedPortfolio) !== "{}") &&
              <>
                <Box
                sx={{
                  m: 5,
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 5,
                }}
                >
                  <AddTradeForm2
                  handleAddTrade={handleAddTrade}
                  />
                  <TotalHoldingsCard
                  totalHoldings={totalHoldings}
                  totalPercentChange={totalPercentChange}
                  />
                  <BarChart />
                </Box>

                <HoldingsGrid
                  holdings={holdings}
                  handleTotalHoldings={handleTotalHoldings}
                  handleTotalPercentChange={handleTotalPercentChange}
                />
              </>
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
