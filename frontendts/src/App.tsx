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
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(() => {
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

  const handleSignIn: Interface.HandleSignIn = (event) => {
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

  const handleSignUp: Interface.HandleSignUp = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      'username': formData.get('username'),
      'email' : formData.get('email'),
      'password': formData.get('password')
    }
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/api/create_user/', {
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

  const [display, setDisplay] = React.useState<Interface.Display>(() => {
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

  const [portfolios, SetPortfolios] = React.useState<Interface.Portfolios>([]);

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

  const updatePortfolioList: Interface.UpdatePortfolioList = async () => {
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

  const [selectedPortfolio, setSelectedPortfolio] = React.useState<Interface.Portfolio>({
    pk: '',
    name: '',
    holdings_url: '',
    purchases_url: '',
    alerts_url: ''
  })

  const handleSelectPortfolio: Interface.HandleSelectPortfolio = (portfolio) => {
    if (display !== 'holdings') {
      setDisplay('holdings')
    }

    if (selectedPortfolio.name !== '') {
      if (selectedPortfolio.name === portfolio.name) {
        return;
      }
    }

    setSelectedPortfolio(portfolio);
  }

  const [sideBarOpen, setSideBarOpen] = React.useState<Interface.SideBarOpen>(false);

  const handleSideBarToogle: Interface.HandleSideBarToogle = () => {
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
          selectedPortfolio={selectedPortfolio}
          updatePortfolioList={updatePortfolioList}
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
        <SignUp
        handleSignUp={handleSignUp}
        handleDisplay={handleDisplay}
        />
      }

    </Box>
  );
}

export default App;
