import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';

export default function EditPortfolioDialog(props) {
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState(props.portfolio.name)

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
    props.handleEditPortfolio(e, props.portfolio.pk, name)
    setName(name)
  }

  return (
    <div>
      <Tooltip title="Edit">
        <IconButton onClick={handleClickOpen}>
          <EditIcon color='primary'/>
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Portfolio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change the name of your portfolio
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
          <Button onClick={handleSubmit}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
