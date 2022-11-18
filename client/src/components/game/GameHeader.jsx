import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import GameCardMenu from "../gamecard/GameCardMenu";
import { useSelector } from "react-redux";

const GameHeader = ({
  group,
  post,
  handleRequest,
  handleCancelRequest,
  handleDelete,
  handleComplete,
}) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Box
      sx={{
        height: { xs: "200px", md: "200px" },
        width: "100%",
        position: "relative",
        background: "#000",
        borderRadius: "5px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,2,1) 100%), url('${post?.image}')`,
      }}
    >
      <Box
        sx={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 100 }}
      >
        <GameCardMenu handleDelete={handleDelete} post={post} color="#FFF" />
      </Box>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          zIndex: "10",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Grid
          container
          sx={{
            height: "100%",
            width: "100%",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              alignSelf: "flex-end",
              width: "100%",
              padding: "1rem",
            }}
          >
            <Box sx={{ display: "flex", marginRight: "auto" }}>
              <Avatar
                component={RouterLink}
                to={`/groups/${group?.title}`}
                src={group?.avatar}
                variant="square"
                sx={{
                  height: { xs: "80px", md: "140px" },
                  width: { xs: "80px", md: "140px" },
                  boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                }}
              />
              <Typography
                component={RouterLink}
                to={`/groups/${group?.title}`}
                sx={{
                  marginTop: "auto",
                  fontWeight: "600",
                  color: "#fff",
                  marginLeft: "1rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textDecoration: "none",
                  textOverflow: "ellipsis",
                  maxWidth: { xs: "200px", md: "700px" },
                }}
                variant="h4"
              >
                {post?.title}
              </Typography>
            </Box>
            <Box
              sx={{
                alignSelf: "flex-end",
              }}
            >
              {currentUser?._id === post?.userId ? (
                <>
                  {post?.isCompleted ? (
                    <Button variant="contained" color="success" disabled>
                      Completed
                    </Button>
                  ) : (
                    <Button
                      onClick={handleComplete}
                      variant="contained"
                      color="success"
                    >
                      Complete
                    </Button>
                  )}
                </>
              ) : (
                <>
                  {currentUser ? (
                    <>
                      {post?.pendingUsers.includes(currentUser._id) ? (
                        <Button
                          variant="contained"
                          color="inherit"
                          onClick={handleCancelRequest}
                        >
                          Cancel Request
                        </Button>
                      ) : post?.isMatched.includes(currentUser._id) ? (
                        <Button
                          component={RouterLink}
                          to={`/games/${post?._id}/chat`}
                          variant="contained"
                          color="success"
                        >
                          Chat
                        </Button>
                      ) : !post?.joinable ? (
                        <Button
                          component={RouterLink}
                          to={`/games/${post?._id}/overview`}
                          variant="contained"
                          disabled
                        >
                          Not Joinable
                        </Button>
                      ) : (
                        <Button
                          onClick={handleRequest}
                          variant="contained"
                          color="tertiary"
                        >
                          Request
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button
                      component={RouterLink}
                      to="/login"
                      variant="contained"
                      color="tertiary"
                    >
                      Request
                    </Button>
                  )}
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default GameHeader;
