import React from 'react';
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

      <Holdings
      sideBarOpen={sideBarOpen}
      handleSideBarOpen={handleSideBarOpen}
      handleSideBarClose={handleSideBarClose}
      portfolios={portfolios}
      />
    </div>
  );
}

export default App;
