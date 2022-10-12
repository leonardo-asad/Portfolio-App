import { Navigate, useOutlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
} from "../features/user/userSlice";
import {
  selectSelectedPortfolio
} from "../features/portfolio/portfolioSlice";
import { Toolbar } from "@mui/material";

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
        selectedPortfolio.name !== '' &&
        <Toolbar
        variant="dense"
        />
      }
      {outlet}
    </>
  );
};
