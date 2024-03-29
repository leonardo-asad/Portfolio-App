import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import * as Types from '../types/types'

interface Props {
  selectedPortfolio: Types.Portfolio,
  handleDeletePortfolio: Types.HandleDeletePortfolio
}

export default function DeletePortfolioDialog(props: Props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    props.handleDeletePortfolio(event, props.selectedPortfolio.pk)
    handleClose()
  }

  return (
    <>
      <Tooltip title="Delete">
        <IconButton
        onClick={handleClickOpen}
        edge="end"
        aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Delete Portfolio?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
