import React from 'react';
import Box from '@mui/material/Box';
import SideBar from '../Components/SideBar';

export default function Holdings(props) {

  return (
    <React.Fragment>
      <SideBar
      portfolios={props.portfolios}
      onClick={props.handleSelectPortfolio}
      />
      <Box component="main" >
        <h1>{props.selectedPortfolio.name}</h1>
      </Box>
    </React.Fragment>
  )
}
