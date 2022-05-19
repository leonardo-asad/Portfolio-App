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
  const [holding, setHolding] = React.useState('');
  const [type, setType] = React.useState('Lower');
  const [threshold, setThreshold] = React.useState('');

  const handleSetHolding = (event) => {
    setHolding(event.target.value);
  }

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeThreshold = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    setThreshold(onlyNums);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubscribe = () => {
    if (props.email === "") {
      alert("You must set your email to add alerts")
    } else if (type === 'Lower' && threshold > holding.price) {
      alert("Threshold must be lower than current price")
    } else if (type === 'Upper' && threshold < holding.price) {
      alert("Threshold must be greater than current price")
    } else {
      const ticker = holding.ticker;
      const data = {
        'args': [props.username, props.email, ticker, type, threshold],
      }
      console.log(data)
    }
  }

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
            To set an alert, select the asset and add the threshold you want to config. The price is verified once per day on market close.
          </DialogContentText>
          <DialogContentText>
            Current price is: ${holding.price}
          </DialogContentText>
          <SetAlertForm
          holdings={props.holdings}
          selected_holding={holding}
          handleSetHolding={handleSetHolding}
          handleChangeType={handleChangeType}
          type={type}
          handleChangeThreshold={handleChangeThreshold}
          threshold={threshold}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubscribe}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
