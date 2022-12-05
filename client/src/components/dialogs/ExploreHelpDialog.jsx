import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Paper,
  DialogTitle,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import theme from "../../theme";

const ExploreHelpDialog = ({ open, handleClose, checkbox, handleCheck }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Explore Different Games Around You!</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              height: "130px",
              width: "130px",
            }}
          >
            <RoomIcon
              sx={{
                height: "84px",
                width: "84px",
                color: theme.palette.error.light,
              }}
            />
          </Paper>
        </Box>
        <DialogContentText sx={{ color: theme.palette.text.primary }}>
          Search for the red markers around the map and click on them to view
          different games around your area! This feature encourages you to meet
          new people and try out new sports that you may enjoy.
        </DialogContentText>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheck}
                checked={checkbox}
                color="tertiary"
              />
            }
            label="Don't show again."
            sx={{ color: theme.palette.text.secondary }}
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExploreHelpDialog;
