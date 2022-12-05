import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import ListingCard from "../profile/ListingCard";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ExploreDialog = ({ post, handleClose, open }) => {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="explore-dialog"
      >
        <ListingCard post={post} />
      </Dialog>
    </div>
  );
};

export default ExploreDialog;
