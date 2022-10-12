import { Navigate, useOutlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
} from "../features/user/userSlice";
import {
  selectSelectedPortfolio
} from "../features/portfolio/portfolioSlice";
import { Toolbar } from "@mui/material";
import Box from '@mui/material/Box';
import { drawerWidth } from "../app/App";

export const ProtectedLayout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const selectedPortfolio = useSelector(selectSelectedPortfolio);
  const outlet = useOutlet();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Box
    component="main"
    sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    >
      <Toolbar />
      {
        selectedPortfolio.name !== '' &&
        <Toolbar
        variant="dense"
        />
      }
      {outlet}
    </Box>
  );
};
