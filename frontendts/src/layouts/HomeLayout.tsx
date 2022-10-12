import { useOutlet } from "react-router-dom";
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';
import { drawerWidth } from "../app/App";

export const HomeLayout = () => {
  const outlet = useOutlet();

  return (
    <Box
    component="main"
    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    >
      <Toolbar />
      {outlet}
    </Box>
  );
};
