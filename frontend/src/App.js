import React, { useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import './App.css';

import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import PortfolioUpperBar from './Components/PortfolioUpperBar';
import Holdings from './Containers/Holdings';

import { ThemeProvider } from '@mui/material/styles';

import { theme } from './theme'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('token') ? true : false
  });
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async() => {
        const response = await fetch('/api/user/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.status === 200) {
          const json = await response.json();
          setUsername(json.username);
        } else {
          const json = await response.json();
          console.log(JSON.stringify(json));
        }
      }
      // Call the function
      fetchData()
      // Catch any error
        .catch(console.error);
    }
  }, [isLoggedIn])

  const [display, setDisplay] = useState(() => {
    if (!isLoggedIn) {
      return 'login'
    } else {
      return 'holdings'
    }
  })
  const [portfolios, SetPortfolios] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        const response = await fetch('/api/portfolio/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.status === 200) {
          const portfolios = await response.json();
          SetPortfolios(portfolios);
          setSelectedPortfolio(portfolios[0]);
        } else {
          const json = await response.json();
          console.log(JSON.stringify(json));
        }
      }
      // Call the function
      fetchData()
      // Catch any error
        .catch(console.error);
    }
  }, [isLoggedIn] )

  const [selectedPortfolio, setSelectedPortfolio] = useState({})

  const updatePortfolioList = async () => {
    const response = await fetch('/api/portfolio/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.status === 200) {
      const portfolios = await response.json();
      SetPortfolios(portfolios);
    } else {
      const json = await response.json();
      console.log(JSON.stringify(json));
    }
  }

  const handleSelectPortfolio = (portfolio, event) => {
    setDisplay('holdings')
    if (selectedPortfolio.name === portfolio.name) {
      return;
    }
    setSelectedPortfolio(portfolio);
  }

  const handleDisplay = (event, display) => {
    event.preventDefault();
    if (display === 'signup') {
      setDisplay('signup')
    } else if (display === 'login') {
      setDisplay('login')
    }
  }

  const handleLogIn = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {'username': formData.get('username'), 'password': formData.get('password')}
    const fetchData = async () => {
      // Get token from the API
      const response = await fetch('/api/token/', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:  JSON.stringify(data)
      })
      if (response.status === 200) {
        const json = await response.json();
        localStorage.setItem('token', json.access);
        setUsername(data.username);
        setIsLoggedIn(true);
        setDisplay('holdings');
      } else {
        const json = await response.json();
        console.log(JSON.stringify(json));
      }
    }
    // Call the function
    fetchData()
    // Catch any error
      .catch(console.error);
  }


  const handleLogOut = () => {
    localStorage.removeItem('token');
    setUsername('');
    SetPortfolios([]);
    setSelectedPortfolio({});
    setIsLoggedIn(false);
    setDisplay('login');
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      'username': formData.get('username'),
      'email' : formData.get('email'),
      'password': formData.get('password')
    }
    const fetchData = async () => {
      const response = await fetch('/api/create_user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      if (response.status === 201) {
        const json = await response.json();
        localStorage.setItem('token', json.token)
        setIsLoggedIn(true);
        setUsername(json.username);
        setDisplay('holdings');
      } else {
        const json = await response.json()
        console.log(JSON.stringify(json))
      }
    }
    // Call the function
    fetchData()
    // Catch any error
      .catch(console.error);
  }


  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <PortfolioUpperBar
        username={username}
        isLoggedIn={isLoggedIn}
        handleLogOut={handleLogOut}
        handleDisplay={handleDisplay}
        />
        <Toolbar />

        <Box sx={{ display: 'flex' }}>
          { display === 'login' &&
            <LogIn
            handleLogIn={handleLogIn}
            handleDisplay={handleDisplay}
            />
          }
          {
            display === 'signup' &&
            <SignUp
            handleSignUp={handleSignUp}
            handleDisplay={handleDisplay}
            />
          }
          {
            display === 'holdings' &&
            <Holdings
            portfolios={portfolios}
            selectedPortfolio={selectedPortfolio}
            handleSelectPortfolio={handleSelectPortfolio}
            updatePortfolioList={updatePortfolioList}
            />
          }
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
