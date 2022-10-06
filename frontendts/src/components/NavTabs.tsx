import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import * as Interface from '../interfaces/interfaces'

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

interface Props {
  tab: number
  handleChangeTab: Interface.HandleChangeTab
}

export default function NavTabs(props: Props) {
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
      value={props.tab}
      onChange={props.handleChangeTab}
      aria-label="nav tabs"
      variant="fullWidth"
      >
        <LinkTab label="Dashboard" />
        <LinkTab label="Historical Trades" />
      </Tabs>
    </Box>
  );
}
