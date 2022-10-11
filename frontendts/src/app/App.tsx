import {
  Routes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import Box from '@mui/material/Box';
import { HomeLayout } from "../layouts/HomeLayout";
import { ProtectedLayout } from "../layouts/ProtectedLayout";
import LogIn from "../features/user/LogIn";
import SignUp from "../features/user/SignUp";
import Holdings from "../features/portfolio/holdings";
import Trades from "../features/portfolio/trades";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme'
import '../App.css';

export const drawerWidth = 240;

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Router>
          <Routes>
            <Route element={<HomeLayout />}>
              <Route path="/login" element={<LogIn />}/>
              <Route path="/signup" element={<SignUp />}/>
            </Route>

            <Route path="/portfolio" element={<ProtectedLayout />}>
              <Route path="holdings" element={<Holdings />}/>
              <Route path="trades" element={<Trades />}/>
            </Route>
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
