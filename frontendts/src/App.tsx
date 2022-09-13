import React from 'react';
import Box from '@mui/material/Box';

import UpperBar from './components/UpperBar';
import Holdings from './containers/Holdings';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import * as Interface from './interfaces/interfaces';

import './App.css';

export const drawerWidth = 240;

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    return localStorage.getItem('token') ? true : false
  });

  const [username, setUsername] = React.useState<Interface.Username>('');

  React.useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async() => {
        const response = await fetch('http://localhost:8000/api/user/', {
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
    }
  }, [isLoggedIn])

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {username: formData.get('username'), password: formData.get('password')}
    const fetchData = async () => {
      // Get token from the API
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:  JSON.stringify(data)
      })
      if (response.status === 200) {
        const json = await response.json();
        localStorage.setItem('token', json.access);
        setIsLoggedIn(true);
        setDisplay('holdings');

        const username: FormDataEntryValue | null = formData.get('username')
        if (typeof username === 'string') {
          setUsername(username);
        }
      } else {
        const json = await response.json();
        console.log(JSON.stringify(json));
      }
    }
    // Call the function
    fetchData()
  };

  const handleLogOut:(event: React.MouseEvent<HTMLButtonElement>) => void = () => {
    localStorage.removeItem('token');
    setUsername('');
    SetPortfolios([]);
    setSelectedPortfolio({
      pk: '',
      name: '',
      holdings_url: '',
      purchases_url: '',
      alerts_url: ''
    });
    setIsLoggedIn(false);
    setDisplay('login');
  }

  const [display, setDisplay] = React.useState(() => {
    if (!isLoggedIn) {
      return 'login'
    } else {
      return 'holdings'
    }
  })

  const handleDisplay: Interface.HandleDisplay = (event, display) => {
    event.preventDefault();
    if (display === 'signup') {
      setDisplay('signup')
    } else if (display === 'login') {
      setDisplay('login')
    }
  }

  const [portfolios, SetPortfolios] = React.useState([]);

  React.useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        const response = await fetch('http://localhost:8000/api/portfolio/', {
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

  const [selectedPortfolio, setSelectedPortfolio] = React.useState({
    pk: '',
    name: '',
    holdings_url: '',
    purchases_url: '',
    alerts_url: ''
  })

  const handleSelectPortfolio: (portfolio: Interface.PortfolioInterface) => void = (portfolio) => {
    //setDisplay('holdings')

    if (selectedPortfolio.name !== '') {
      if (selectedPortfolio.name === portfolio.name) {
        return;
      }
    }

    setSelectedPortfolio(portfolio);
  }

  const [sideBarOpen, setSideBarOpen] = React.useState(false);

  const handleSideBarToogle: () => void = () => {
    setSideBarOpen(!sideBarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      { display === 'holdings' &&
        <React.Fragment>
          <UpperBar
          username={username}
          selectedPortfolio={selectedPortfolio}
          isLoggedIn={isLoggedIn}
          handleSideBarToogle={handleSideBarToogle}
          handleDisplay={handleDisplay}
          handleLogOut={handleLogOut}
          />
          <Holdings
          sideBarOpen={sideBarOpen}
          portfolios={portfolios}
          handleSideBarToogle={handleSideBarToogle}
          handleSelectPortfolio={handleSelectPortfolio}
          />
        </React.Fragment>
      }

      { display === 'login' &&
        <SignIn
        handleSignIn={handleSignIn}
        handleDisplay={handleDisplay}
        />
      }

      { display === 'signup' &&
        <SignUp />
      }

    </Box>
  );
}

export default App;
