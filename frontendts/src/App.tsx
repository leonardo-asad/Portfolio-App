import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import UpperBar from './components/UpperBar';
import Holdings from './containers/Holdings';

import './App.css';

function App() {
  const [portfolios, SetPortfolios] = React.useState([
    {
      pk:1,
      name:'usa'
    },
    {
      pk:1,
      name:'stocks2'
    },
    {
      pk:1,
      name:'asia'
    },
  ]);

  const [sideBarOpen, setSideBarOpen] = React.useState(false);

  const handleSideBarOpen: () => void = () => {
    setSideBarOpen(true);
  };

  const handleSideBarClose = () => {
    setSideBarOpen(false);
  };

  return (
    <div className="App">
      <UpperBar
      sideBarOpen={sideBarOpen}
      handleSideBarOpen={handleSideBarOpen}
      handleSideBarClose={handleSideBarClose}
      />
      <Toolbar />

      <Box sx={{ display: 'flex' }}>
        <Holdings
        sideBarOpen={sideBarOpen}
        handleSideBarOpen={handleSideBarOpen}
        handleSideBarClose={handleSideBarClose}
        portfolios={portfolios}
        />
      </Box>

    </div>
  );
}

export default App;
