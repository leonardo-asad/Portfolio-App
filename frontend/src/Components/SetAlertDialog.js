import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SetAlertForm from './SetAlertForm'

export default function SetAlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ListItem
        button
        key="setAlert"
        onClick={handleClickOpen}
      >
        <ListItemIcon>
          <AddAlertIcon />
        </ListItemIcon>
        <ListItemText primary="Set Alert" />
      </ListItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Set Alert</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To set an alert, yo have to select which asset do you want to add and the
            desired threshold, if the daily percentual loss happens to be larger you will receive
            an email notification.
          </DialogContentText>
          <SetAlertForm
          holdings={props.holdings}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
