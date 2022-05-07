import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function CreatePortfolioDialog(props) {
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = ({target}) => {
    setName(target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleClose()
    props.handleCreatePortfolio(e, name)
    setName('')
  }

  return (
    <div>
      <ListItem
        button
        key="createPortfolio"
        onClick={handleClickOpen}
      >
        <ListItemIcon>
          <AddCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Create Portfolio" />
      </ListItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Portfolio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of your portfolio
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="email"
            fullWidth
            variant="standard"
            value={name}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
