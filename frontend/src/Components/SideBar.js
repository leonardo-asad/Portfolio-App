import React, { useState } from 'react';
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


export default function SideBar(props) {
  const [open, setOpen] = useState(false)

  const portfolios = props.portfolios;

  const drawerWidth = 240;

  const handleClick = () => {
    setOpen(!open);
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

    <Box sx={{ overflow: 'auto' }}>
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
              key={object.pk}
              onClick={(event) => props.onClick({
                'pk':object.pk,
                'name':object.name,
                'holdingss_url': object.holdingss_url,
                'purchases_url': object.purchases_url},
                event)}
              >
                <ListItemText primary={object.name} />


              </ListItem>
            ))}
          </List>
          <Divider />

        </Collapse>


      </List>
    </Box>

    </Drawer>
  );
};
