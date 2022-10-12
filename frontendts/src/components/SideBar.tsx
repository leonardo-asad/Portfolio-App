import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { Collapse, Toolbar } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import CreatePortfolioDialog from './CreatePortfolioDialog';
import EditPortfolioDialog from './EditPortfolioDialog';
import DeletePortfolioDialog from './DeletePortfolioDIalog';

import { drawerWidth } from '../app/App';
import * as Types from '../types/types'

import { AppDispatch } from '../app/store';
import { useSelector, useDispatch } from 'react-redux'
import {
  selectPortfolios,
  selectSelectedPortfolio,
  selectPortfolio,
  editPortfolio,
  deletePortfolio,
  createPortfolio,
} from '../features/portfolio/portfolioSlice'
import { selectIsLoggedIn } from '../features/user/userSlice';

import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  sideBarOpen: Types.SideBarOpen,
  window?: () => Window,
  handleSideBarToogle: Types.HandleSideBarToogle,
}

export default function SideBar(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { window } = props;
  const [accordionOpen, setAccordionOpen] = React.useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const portfolios = useSelector(selectPortfolios);
  const selectedPortfolio = useSelector(selectSelectedPortfolio);
  const { pathname } = useLocation();


  React.useEffect(() => {
    if (portfolios.length > 0) {
      setAccordionOpen(true);
    } else {
      setAccordionOpen(false);
    }
  }, [portfolios] )

  const handleAccordionOpen: () => void = () => {
    setAccordionOpen(!accordionOpen);
  }

  const handleSelectPortfolio: Types.HandleSelectPortfolio = (portfolio) => {

    if (pathname !== '/portfolio/holdings') {
      navigate("/portfolio/holdings")
    }

    if (selectedPortfolio.name !== '') {
      if (selectedPortfolio.name === portfolio.name) {
        return;
      }
    }
    dispatch(selectPortfolio(portfolio));
  }

  const handleEditPortfolio: Types.HandleEditPortfolio = (event, pk, name) => {
    event.preventDefault();
    dispatch(editPortfolio({
      pk: pk,
      name: name
    }))
  }

  const handleDeletePortfolio: Types.HandleDeletePortfolio = (event, pk) => {
    event.preventDefault();
    dispatch(deletePortfolio(pk));
  }

  const handleCreatePortfolio: Types.HandleCreatePortfolio = async (event, name) => {
    event.preventDefault();
    dispatch(createPortfolio(name));
  }

  const styleSelectedItem = (selectedPortfolio: Types.Portfolio, portfolio: Types.Portfolio) => {
    return selectedPortfolio.pk === portfolio.pk;
  }

  const portfolioList = (
    <>
      <ListItem button onClick={handleAccordionOpen}>
        <ListItemIcon>
          <ShowChartIcon />
        </ListItemIcon>
        <ListItemText primary="My Portfolios" />
        {accordionOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={accordionOpen} timeout="auto" unmountOnExit>
      <Divider />
      {portfolios.length > 0 &&
      <List component="div" disablePadding>
        {portfolios.map((portfolio, index) => (
          <ListItem
            button
            key={portfolio.pk}
            secondaryAction={
              <>
                <EditPortfolioDialog
                selectedPortfolio={portfolio}
                handleEditPortfolio={handleEditPortfolio}
                />
                <DeletePortfolioDialog
                selectedPortfolio={portfolio}
                handleDeletePortfolio={handleDeletePortfolio}
                />
              </>

            }
            selected={styleSelectedItem(selectedPortfolio, portfolio)}
            onClick={(event) => {
              handleSelectPortfolio({
                'pk': portfolio.pk,
                'name': portfolio.name,
                "holdings_url": portfolio.holdings_url,
                "purchases_url": portfolio.purchases_url,
                "alerts_url": portfolio.alerts_url
              })
            }}
          >
            <ListItemText
            primary={portfolio.name}
            sx={{ display: 'flex', justifyContent: 'left' }}
            />
          </ListItem>
        ))}
      </List>
      }
      </Collapse>
      <Divider />
    </>
  )

  const drawerLoggedIn = (
    <>
     {
      portfolios.length > 0 &&
      <>
        {portfolioList}
      </>
     }
      <CreatePortfolioDialog
      handleCreatePortfolio={handleCreatePortfolio}
      />
    </>
  )

  const drawerNotLoggedIn = (
    <>
      <ListItem
      onClick={() => navigate("/")}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText
        primary="Home"
        sx={{ display: 'flex', justifyContent: 'left' }}
        />
      </ListItem>
      <ListItem
      onClick={() => navigate("/quote")}
      >
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText
        primary="Make a Quote"
        sx={{ display: 'flex', justifyContent: 'left' }}
        />
      </ListItem>
    </>
  )

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
    component="nav"
    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    aria-label="Portfolios Menu"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={props.sideBarOpen}
        onClose={props.handleSideBarToogle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {
            isLoggedIn &&
            <>
              {drawerLoggedIn}
            </>
          }
          {drawerNotLoggedIn}
        </List>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        <Toolbar />
        <Divider />
        <List>
          {
            isLoggedIn &&
            <>
              {drawerLoggedIn}
            </>
          }
          {drawerNotLoggedIn}
        </List>
      </Drawer>
    </Box>
  )
}
