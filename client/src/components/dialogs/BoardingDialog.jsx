import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const BoardingDialog = ({ handleClose, open }) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ready to Play!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You've followed enough groups to get started! Check out your home
            feed for games that you might be interested in. Click the preference
            button to sort or filter your games out even more!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BoardingDialog;
