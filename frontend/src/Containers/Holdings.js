import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';

import SideBar from '../Components/SideBar';
import NavTabs from '../Components/NavTabs';
import HoldingsGrid from '../Components/HoldingsGrid';
import TradesTable from '../Components/TradesTable';
import CircularIndeterminate from '../Components/CircularIndeterminate';
import Dashboard from '../Components/Dashboard';
import AlertsGrid from '../Components/AlertsGrid';

export default function Holdings(props) {
  const [tab, setTab] = useState(0);
  const [holdings, setHoldings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [trades, setTrades] = useState([])
  const [tasks, setTasks] = React.useState([]);
  const [totalHoldings, setTotalHoldings] = useState(null)
  const [totalPercentChange, setTotalPercentChange] = useState(null)
  const [totalChange, setTotalChange] = useState(null)
  const [selectedAlert, setSelectedAlert] = useState([]);

  const updateHoldings = useCallback(async () => {
    setIsLoading(true);
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
    if (JSON.stringify(props.selectedPortfolio) !== "{}" && props.selectedPortfolio !== undefined) {
      updateHoldings();
    }
  }, [props.selectedPortfolio, updateHoldings] )

  useEffect(() => {
    if (JSON.stringify(props.selectedPortfolio) !== "{}" && props.selectedPortfolio !== undefined) {
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

  const updateAlert = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch(props.selectedPortfolio.alerts_url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.status === 200) {
      const tasks = await response.json();
      setTasks(tasks);
    } else {
      const json = await response.json();
      console.log(JSON.stringify(json));
    }
    setIsLoading(false);
  }, [props.selectedPortfolio])

  useEffect(() => {
    if (JSON.stringify(props.selectedPortfolio) !== "{}" && props.selectedPortfolio !== undefined) {
      updateAlert();
    }
  }, [props.selectedPortfolio, updateAlert])

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

  const handleAddAlert = (event, data) => {
    event.preventDefault();
    const addAlert = async () => {
      const response = await fetch('/api/tasks/', {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (response.status === 201) {
        const alert = await response.json();
        setTasks([alert, ...tasks]);
      } else {
        const json = await response.json();
        console.log(JSON.stringify(json));
      }
    }
    addAlert();
  }

  const handleSelectedAlert = (newSelectedAlert) => {
    setSelectedAlert(newSelectedAlert);
  }

  const handleDeleteAlert = (event) => {
    event.preventDefault();
    if (selectedAlert.length > 0) {
      const alert_pk = selectedAlert[0];
      const deleteAlert = async (pk) => {
        const response = await fetch(`/api/tasks/${pk}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
        if (response.status === 204) {
          const filtered_tasks = tasks.filter(task => task.pk !== pk)
          setTasks(filtered_tasks)
        } else {
          const json = await response.json();
          console.log(JSON.stringify(json));
        }
      }
      deleteAlert(alert_pk);
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
      userPk={props.userPk}
      handleAddAlert={handleAddAlert}
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
            {
              (tab === 2 && JSON.stringify(props.selectedPortfolio) !== "{}") &&
              <AlertsGrid
              tasks={tasks}
              handleSelectedAlert={handleSelectedAlert}
              selectedAlert={selectedAlert}
              handleDeleteAlert={handleDeleteAlert}
              />
            }
          </>
        }
      </Box>

    </React.Fragment>
  )
}
