import React from 'react';
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
import * as Types from '../types/types'


interface Props {
  handleCreatePortfolio: Types.HandleCreatePortfolio
}

export default function CreatePortfolioDialog(props: Props) {
  const [open, setOpen] = React.useState<boolean>(false);

  const [name, setName] = React.useState<string>('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({target}) => {
    setName(target.value)
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    handleClose()
    props.handleCreatePortfolio(event, name)
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
