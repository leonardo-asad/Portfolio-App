import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { Collapse } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreatePortfolioDialog from './CreatePortfolioDialog';
import EditPortfolioDialog from './EditPortfolioDialog';
import DeletePortfolioDialog from './DeletePortfolioDIalog';

import { drawerWidth } from '../App';
import * as Interface from '../interfaces/interfaces'

interface Props {
  portfolios: Interface.Portfolios,
  sideBarOpen: Interface.SideBarOpen,
  window?: () => Window,
  handleSideBarToogle: Interface.HandleSideBarToogle,
  handleCreatePortfolio: Interface.HandleCreatePortfolio,
  handleEditPortfolio: Interface.HandleEditPortfolio,
  handleSelectPortfolio: Interface.HandleSelectPortfolio,
  handleDeletePortfolio: Interface.HandleDeletePortfolio
}

export default function SideBar(props: Props) {
  const { window } = props;

  const [accordionOpen, setAccordionOpen] = React.useState(false)

  React.useEffect(() => {
    if (props.portfolios.length > 0) {
      setAccordionOpen(true);
    } else {
      setAccordionOpen(false);
    }
  }, [props.portfolios] )

  const handleAccordionOpen: () => void = () => {
    setAccordionOpen(!accordionOpen);
  }

  const drawer = (
    <div>
      <List>
        <ListItem button onClick={handleAccordionOpen}>
          <ListItemIcon>
            <ShowChartIcon />
          </ListItemIcon>
          <ListItemText primary="My Portfolios" />
          {accordionOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={accordionOpen} timeout="auto" unmountOnExit>
        <Divider />
        {props.portfolios.length > 0 &&
          <List component="div" disablePadding>
          {props.portfolios.map((portfolio, index) => (
            <ListItem
              button
              key={portfolio.pk}
              onClick={(event) => {
                props.handleSelectPortfolio({
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
              <EditPortfolioDialog
              selectedPortfolio={portfolio}
              handleEditPortfolio={props.handleEditPortfolio}
              />
              <DeletePortfolioDialog
              selectedPortfolio={portfolio}
              handleDeletePortfolio={props.handleDeletePortfolio}
              />
            </ListItem>
            ))}
          </List>
        }
        </Collapse>
        <Divider />
        <CreatePortfolioDialog
        handleCreatePortfolio={props.handleCreatePortfolio}
        />
      </List>
    </div>
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
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}