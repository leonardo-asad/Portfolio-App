import * as React from 'react';
import { Navigate, useOutlet } from "react-router-dom";
import { useSelector } from "react-redux";
import NavTabs from "../components/NavTabs";
import {
  selectIsLoggedIn,
} from "../features/user/userSlice";
import { selectSelectedPortfolio } from '../features/portfolio/portfolioSlice';

export const drawerWidth = 240;

export const ProtectedLayout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const selectedPortfolio = useSelector(selectSelectedPortfolio);
  const outlet = useOutlet();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {
        selectedPortfolio.name !== "" &&
        <>
          <NavTabs />
        </>
      }
      <>
        {outlet}
      </>
    </>
  );
};
