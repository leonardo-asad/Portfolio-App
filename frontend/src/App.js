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
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userPk, setUserPk] = useState('');
  const [sideBarOpen, setSideBarOpen] = useState(false)

  const handleSideBarOpen = () => {
    setSideBarOpen(true);
  };

  const handleSideBarClose = () => {
    setSideBarOpen(false);
  };

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
          setEmail(json.email);
          setUserPk(json.pk);
        } else {
          const json = await response.json();
          console.log(JSON.stringify(json));
        }
      }
      // Call the function
      fetchData()
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
          if (portfolios.length > 0) {
            setSelectedPortfolio(portfolios[0]);
          }
        } else {
          const json = await response.json();
          console.log(JSON.stringify(json));
        }
      }
      // Call the function
      fetchData()
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

  const handleSelectPortfolio = (portfolio) => {
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
        setSideBarOpen(true);
      } else {
        const json = await response.json();
        console.log(JSON.stringify(json));
      }
    }
    // Call the function
    fetchData()
  }


  const handleLogOut = () => {
    localStorage.removeItem('token');
    setUsername('');
    SetPortfolios([]);
    setSelectedPortfolio({});
    setIsLoggedIn(false);
    setDisplay('login');
    setSideBarOpen(false);
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
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <PortfolioUpperBar
        username={username}
        isLoggedIn={isLoggedIn}
        handleLogOut={handleLogOut}
        handleDisplay={handleDisplay}
        sideBarOpen={sideBarOpen}
        handleSideBarOpen={handleSideBarOpen}
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
            username={username}
            email={email}
            userPk={userPk}
            portfolios={portfolios}
            selectedPortfolio={selectedPortfolio}
            handleSelectPortfolio={handleSelectPortfolio}
            updatePortfolioList={updatePortfolioList}
            sideBarOpen={sideBarOpen}
            handleSideBarClose={handleSideBarClose}
            />
          }
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
