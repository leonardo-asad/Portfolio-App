import React from 'react';
import SideBar from '../components/SideBar';

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
    </React.Fragment>
  )
}
