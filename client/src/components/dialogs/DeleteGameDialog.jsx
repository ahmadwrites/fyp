import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DeleteGameDialog = ({ post, handleDelete, handleClose, open }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Confirm Delete Game
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the game {post?.title}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            variant="contained"
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            autoFocus
            variant="contained"
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteGameDialog;
