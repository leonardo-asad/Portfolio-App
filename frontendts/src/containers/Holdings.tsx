import React from 'react';
import { styled, useTheme } from '@mui/material/styles';

import SideBar from '../components/SideBar';
import HoldingsGrid from '../components/HoldingsGrid';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface SideBarProps {
  sideBarOpen: boolean,
  handleSideBarOpen: () => void,
  handleSideBarClose: () => void,
  portfolios: {pk: number, name: string}[]
}

export default function Holdings(props: SideBarProps) {
  return (
    <React.Fragment>
      <SideBar
      sideBarOpen={props.sideBarOpen}
      handleSideBarOpen={props.handleSideBarOpen}
      handleSideBarClose={props.handleSideBarClose}
      portfolios={props.portfolios}
      />
      <Main open={props.sideBarOpen}>
        
        <HoldingsGrid />

      </Main>

    </React.Fragment>
  )
}
