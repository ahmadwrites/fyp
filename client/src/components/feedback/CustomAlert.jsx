import { Alert, Snackbar } from "@mui/material";
import React from "react";

const CustomAlert = ({ open, handleClose, severity, message }) => {
  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomAlert;
