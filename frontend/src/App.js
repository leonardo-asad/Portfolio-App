import React, { useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import './App.css';

import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import PortfolioUpperBar from './Components/PortfolioUpperBar';

import Holdings from './Containers/Holdings';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('token') ? true : false
  });
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (isLoggedIn) {
      fetch('http://localhost:8000/api/user/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          response.json()
          .then(json => {
            console.log(json)
            setUsername(json.username)
          })
        } else {
          console.log("Cannot fetch username")
        }
      })
    }
  }, [isLoggedIn])

  const [display, setDisplay] = useState(() => {
    if (!isLoggedIn) {
      return 'login'
    } else {
      return 'holdings'
    }
  })
  const [portfolios, SetPortfolios] = useState([])
  const [selectedPortfolio, setSelectedPortfolio] = useState({})

  useEffect(() => {
    if (isLoggedIn) {
      fetch('http://localhost:8000/api/portfolio/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          response.json()
          .then(data => {
            console.log("Set portfolio list")
            SetPortfolios(data)
          })
        }
      })
    }
  }, [isLoggedIn] )

  const updatePortfolioList = () => {
    fetch('http://localhost:8000/api/portfolio/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if (response.status === 200) {
        response.json()
        .then(data => {
          console.log("Set portfolio list")
          SetPortfolios(data)
        })
      }
    })
  }

  const handleSelectPortfolio = (portfolio, event) => {
    setDisplay('holdings')
    if (selectedPortfolio.name === portfolio.name) {
      console.log(`Portfolio already selected!`)
      return;
    }

    console.log(`Selected: ${portfolio.name}. Id: ${portfolio.pk}`)
    setSelectedPortfolio(portfolio)
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
    fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(data)
    })
    .then(response => {
      if (response.status === 200) {
        response.json()
        .then(json => {
          console.log(`${data.username} Logged In`)

          localStorage.setItem('token', json.access);

          setUsername(data.username)
          setIsLoggedIn(true)
          setDisplay('holdings')

        })
      } else {
        response.json()
        .then(json => alert(json.detail))
      }
    })
  };

  const handleLogOut = () => {
    localStorage.removeItem('token')
    setUsername('')
    SetPortfolios([])
    setSelectedPortfolio({})
    setIsLoggedIn(false)
    setDisplay('login')
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      'username': formData.get('username'),
      'email' : formData.get('email'),
      'password': formData.get('password')
    }
    fetch('http://localhost:8000/api/create_user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (response.status === 201) {
        response.json()
        .then(json => {
          localStorage.setItem('token', json.token)
          setIsLoggedIn(true)
          setUsername(json.username)
          setDisplay('holdings')
        })
      } else {
        response.json()
        .then(json => alert(json.username))
      }
    })
  };


  return (
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
  );
}

export default App;
