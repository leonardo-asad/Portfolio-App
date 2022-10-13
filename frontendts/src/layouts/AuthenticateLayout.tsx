import { Navigate, useOutlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../features/user/userSlice";
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';
import { drawerWidth } from "../app/App";

export const AuthenticateLayout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const outlet = useOutlet();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box
    component="main"
    sx={{ flexGrow: 1, p: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    >
      <Toolbar />
      {outlet}
    </Box>
  );
};
