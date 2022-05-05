import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import './App.css';

import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import PortfolioUpperBar from './Components/PortfolioUpperBar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('')
  const [display, setDisplay] = useState(() => {
    if (!isLoggedIn) {
      return 'login'
    } else {
      return 'holdings'
    }
  })

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
      <PortfolioUpperBar />
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
      </Box>

    </div>
  );
}

export default App;
