import {
  Box,
  ListItemIcon,
  ListItemText,
  Menu,
  Link,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link as RouterLink } from "react-router-dom";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useSelector } from "react-redux";

const GameCardMenu = ({ post, color, handleDelete }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <MoreVertOutlinedIcon
        onClick={handleClick}
        sx={{ cursor: "pointer", color: color }}
        fontSize="small"
        color="text.secondary"
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {currentUser?._id === post?.userId && (
          <MenuItem
            onClick={handleClose}
            component={RouterLink}
            to={`/games/edit/${post?._id}`}
          >
            <ListItemIcon>
              <EditOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
        )}
        {handleDelete && currentUser?._id === post?.userId && (
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        )}
        <MenuItem
          onClick={handleClose}
          component={Link}
          target="_blank"
          href={`https://api.whatsapp.com/send?text=https://sportify-test.netlify.app/games/${post?._id}`}
        >
          <ListItemIcon>
            <MapsUgcOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default GameCardMenu;
