import React, { useState } from 'react';
import Box from '@mui/material/Box';

import SideBar from '../Components/SideBar';
import NavTabs from '../Components/NavTabs';

export default function Holdings(props) {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <React.Fragment>
      <SideBar
      portfolios={props.portfolios}
      onClick={props.handleSelectPortfolio}
      />
      <Box component="div" >
        <NavTabs
        tab={tab}
        onClick={handleChange}
        />
        <h1>{props.selectedPortfolio.name}</h1>
        <h1>{tab}</h1>
      </Box>
    </React.Fragment>
  )
}
