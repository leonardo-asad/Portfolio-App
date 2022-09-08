import React from 'react'
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { Collapse } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled, useTheme } from '@mui/material/styles';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface SideBarProps {
  sideBarOpen: boolean,
  handleSideBarOpen: () => void,
  handleSideBarClose: () => void,
  portfolios: {pk: number, name: string}[],
}

export default function SideBar(props: SideBarProps) {
  const theme = useTheme();

  const [accordionOpen, setAccordionOpen] = React.useState(false)

  const handleAccordionOpen: () => void = () => {
    setAccordionOpen(!accordionOpen);
  }

  return (
    <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={props.sideBarOpen}
      >
        <DrawerHeader>
          <IconButton onClick={props.handleSideBarClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
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
            {props.portfolios.map((object, index) => (
              <ListItem
                button
                key={object.pk}
                >
                  <ListItemText
                  primary={object.name}
                  sx={{ display: 'flex', justifyContent: 'left' }}
                  />
                </ListItem>
              ))}
            </List>
          }
        </Collapse>
        <Divider />

        </List>


      </Drawer>
  )
}
