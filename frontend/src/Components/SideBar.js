import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';

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
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import EditPortfolioDialog from './EditPortfolioDialog';
import DeletePortfolioDialog from './DeletePortfolioDIalog';
import CreatePortfolioDialog from './CreatePortfolioDialog';
import SetAlertDialog from './SetAlertDialog';

const sideBarWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function SideBar(props) {
  const theme = useTheme();
  const [accordionOpen, setAccordionOpen] = useState(false)

  useEffect(() => {
    if (props.portfolios.length > 0) {
      setAccordionOpen(true);
    } else {
      setAccordionOpen(false);
    }
  }, [props.portfolios] )

  const [selectedIndex, setSelectedIndex] = useState(null)

  useEffect(() => {
    if (JSON.stringify(props.selectedPortfolio) !== "{}") {
      setSelectedIndex(props.selectedPortfolio.pk);
    }
  }, [props.selectedPortfolio])

  const portfolios = props.portfolios;

  const handleClick = () => {
    setAccordionOpen(!accordionOpen);
  }

  const handleSelectItem = (index, object, event) => {
    setSelectedIndex(object.pk)
    props.onClick(object, event)
  }

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={props.sideBarOpen}
      sx={{
        width: sideBarWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: sideBarWidth, boxSizing: 'border-box' },
      }}
    >

    <DrawerHeader>
      <IconButton onClick={props.handleSideBarClose}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </DrawerHeader>
    <Divider />
      <List>
        <ListItem button onClick={handleClick}>
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
                  'purchases_url': object.purchases_url,
                  'alerts_url': object.alerts_url
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
          }
        </Collapse>
        <Divider />
        <CreatePortfolioDialog
        handleCreatePortfolio={props.handleCreatePortfolio}
        />
        <SetAlertDialog
        handleAddAlert={props.handleAddAlert}
        username={props.username}
        email={props.email}
        userPk={props.userPk}
        selectedPortfolio={props.selectedPortfolio}
        holdings={props.holdings}
        />
      </List>

    </Drawer>
  );
};
