import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  Container,
  Rating,
  Tab,
  Tabs,
  useMediaQuery,
} from "@mui/material";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import theme from "../../theme";
import ProfileListings from "./ProfileListings";
import ProfileReviews from "./ProfileReviews";
import axios from "axios";
import { format } from "timeago.js";
import capitalize from "../../utils/capitalize";

function LinkTab(props) {
  return (
    <Tab
      sx={{
        textTransform: "none",
      }}
      value={props.value}
      iconPosition="start"
      {...props}
    />
  );
}

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[2];
  const { currentUser } = useSelector((state) => state.user);
  const tab = new URLSearchParams(useLocation().search).get("tab");
  console.log(tab);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [value, setValue] = useState(0);
  const [user, setUser] = useState();
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingsSort, setRatingsSort] = useState(-1);

  useEffect(() => {
    const getRatings = async () => {
      try {
        const res = await axios.get(
          `/ratings/user-received/${user?._id}?sort=${ratingsSort}`
        );
        setRatings(res.data);

        const averageRes = await axios.get(
          `/ratings/user-received-average/${user?._id}`
        );
        setAverageRating(averageRes.data);
      } catch (error) {
        console.log(error);
      }
    };

    getRatings();
  }, [user?._id, ratingsSort]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/users/${location}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [location]);

  useEffect(() => {
    switch (tab) {
      case "rating":
        setValue(1);
        break;
      default:
        setValue(0);
        break;
    }
  }, [tab]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
      <Container maxWidth="lg" sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <Avatar
              src={user?.avatar}
              sx={{ height: "128px", width: "128px", marginBottom: "1rem" }}
            />
            <Typography variant="h6" color="text.primary">
              {capitalize(user?.firstName)} {capitalize(user?.lastName)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              @{capitalize(user?.username)}
            </Typography>
            <Grid
              onClick={(e) => handleChange(e, 1)}
              container
              alignItems="center"
              sx={{
                gap: ".25rem",
                cursor: "pointer",
                width: "100%",
                margin: ".5rem 0",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Typography variant="text.secondary">{averageRating}</Typography>
              <Rating value={averageRating} readOnly precision={0.5} />
              <Typography>({ratings?.length})</Typography>
            </Grid>
            {/* Todo: Change location */}
            <Typography variant="body2">
              Kuala Lumpur ∙ Joined {format(user?.createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <Tabs
              sx={{
                borderRadius: "5px",
                background: "#fff",
                boxShadow:
                  "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
              }}
              value={value}
              onChange={handleChange}
              variant={isMatch ? "scrollable" : "standard"}
              indicatorColor="primary"
              textColor="secondary"
              aria-label="Game Tabs"
            >
              <LinkTab label="Games" />
              <LinkTab label="Reviews" />
            </Tabs>
            <Box sx={{ marginTop: "1rem" }}>
              {value === 0 && <ProfileListings />}
              {value === 1 && (
                <ProfileReviews
                  setRatingsSort={setRatingsSort}
                  ratings={ratings}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
