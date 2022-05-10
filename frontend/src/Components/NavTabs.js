import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function NavTabs(props) {

  return (
    <Tabs value={props.tab} onChange={props.onClick}>
      <LinkTab label="Dashboard" />
      <LinkTab label="History" />
    </Tabs>
  )
}
