import React, { useState, useEffect } from 'react';


import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Collapse } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

import EditPortfolioDialog from './EditPortfolioDialog';
import DeletePortfolioDialog from './DeletePortfolioDIalog';
import CreatePortfolioDialog from './CreatePortfolioDialog';
import SetAlertDialog from './SetAlertDialog';

export default function SideBar(props) {
  const [open, setOpen] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(null)

  useEffect(() => {
    setSelectedIndex(props.selectedPortfolio.pk);
  }, [props.selectedPortfolio])

  const portfolios = props.portfolios;

  const drawerWidth = 280;

  const handleClick = () => {
    setOpen(!open);
  }

  const handleSelectItem = (index, object, event) => {
    setSelectedIndex(object.pk)
    props.onClick(object, event)
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >

    <Toolbar />

    <Box
    sx={{ overflow: 'auto' }}
    >
      <List>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <ShowChartIcon />
          </ListItemIcon>
          <ListItemText primary="My Portfolios" />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Divider />
          <List component="div" disablePadding>
            {portfolios.map((object, index) => (
              <ListItem
              button
              selected={selectedIndex === object.pk}
              key={object.pk}
              onClick={(event) => handleSelectItem(
                index,
                {
                'pk':object.pk,
                'name':object.name,
                'holdings_url': object.holdings_url,
                'purchases_url': object.purchases_url
                },
                event
                )}
              >
                <ListItemText
                primary={object.name}
                sx={{ display: 'flex', justifyContent: 'left' }}
                />
                <EditPortfolioDialog
                portfolio={object}
                handleEditPortfolio={props.handleEditPortfolio}
                />
                <DeletePortfolioDialog
                portfolio={object}
                handleDeletePortfolio={props.handleDeletePortfolio}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <Divider />
        <CreatePortfolioDialog
        handleCreatePortfolio={props.handleCreatePortfolio}
        />
        <SetAlertDialog
        username={props.username}
        email={props.email}
        holdings={props.holdings}
        />
      </List>
    </Box>

    </Drawer>
  );
};
