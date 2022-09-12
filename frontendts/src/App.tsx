import React from 'react';
import Box from '@mui/material/Box';

import UpperBar from './components/UpperBar';
import Holdings from './containers/Holdings';
import { PortfolioInterface } from './interfaces/interfaces';

import './App.css';

export const drawerWidth = 240;

function App() {
  // eslint-disable-next-line
  const [portfolios, SetPortfolios] = React.useState([
    {
      pk:'1',
      name:'usa'
    },
    {
      pk:'2',
      name:'stocks2'
    },
    {
      pk:'3',
      name:'asia'
    },
  ]);

  const [selectedPortfolio, setSelectedPortfolio] = React.useState({
    pk: '',
    name: ''
  })

  const handleSelectPortfolio: (portfolio: PortfolioInterface) => void = (portfolio) => {
    //setDisplay('holdings')

    if (selectedPortfolio.pk !== '') {
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
      <UpperBar
      handleSideBarToogle={handleSideBarToogle}
      />

      <Holdings
      sideBarOpen={sideBarOpen}
      handleSideBarToogle={handleSideBarToogle}
      portfolios={portfolios}
      />
    </Box>
  );
}

export default App;
