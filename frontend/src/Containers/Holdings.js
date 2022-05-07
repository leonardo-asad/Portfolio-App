import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

import SideBar from '../Components/SideBar';
import NavTabs from '../Components/NavTabs';
import HoldingsTable from '../Components/HoldingsTable';
import TradesTable from '../Components/TradesTable';

export default function Holdings(props) {
  const [tab, setTab] = useState(0);
  const [holdings, setHoldings] = useState([])
  const [trades, setTrades] = useState([])

  useEffect(() => {
    if (JSON.stringify(props.selectedPortfolio) !== "{}") {
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

  return (
    <React.Fragment>
      <SideBar
      portfolios={props.portfolios}
      onClick={props.handleSelectPortfolio}
      />
      <Box component="div" sx={{ flexGrow: 1, p: 3 }} >
        <NavTabs
        tab={tab}
        onClick={handleChange}
        />
        { tab === 0 &&
          <HoldingsTable
          holdings={holdings}
          handleAddTrade={handleAddTrade}
          />
        }

        { tab === 1 &&
          <TradesTable
          trades={trades}
          />


        }


      </Box>
    </React.Fragment>
  )
}
