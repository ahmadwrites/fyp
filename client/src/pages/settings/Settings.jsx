import { Grid, Tabs, Typography, useMediaQuery } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Tab from "@mui/material/Tab";
import { Link as RouterLink } from "react-router-dom";
import EditProfile from "./EditProfile";
import Preferences from "./Preferences";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyIcon from "@mui/icons-material/Key";
import theme from "../../theme";

function LinkTab(props) {
  return (
    <Tab
      sx={{ textTransform: "none", marginRight: "auto" }}
      value={props.value}
      iconPosition="start"
      component={RouterLink}
      {...props}
    />
  );
}

const Settings = () => {
  const [value, setValue] = useState(0);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)" }}>
      <Container maxWidth="lg" sx={{ padding: { xs: ".5rem", md: "1rem" } }}>
        <Typography
          mb=".5rem"
          variant="h5"
          sx={{ fontWeight: 500 }}
          color="text.primary"
        >
          User Settings
        </Typography>

        <Grid container>
          <Grid item xs={12} md={2}>
            <Box
              sx={{
                borderRight: !isMatch ? 1 : 0,
                borderBottom: isMatch ? 1 : 0,
                borderColor: "#d7d7d7",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                orientation={isMatch ? "horizontal" : "vertical"}
                variant={isMatch ? "scrollable" : "standard"}
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="User Settings Tabs"
              >
                <LinkTab
                  icon={<PersonIcon />}
                  label="Profile"
                  to="/settings/profile"
                />
                <LinkTab
                  icon={<SettingsIcon />}
                  label="Preferences"
                  to="/settings/preferences"
                />
                <LinkTab
                  icon={<NotificationsNoneIcon />}
                  label="Notifications"
                  to="/settings/notifications"
                />
                <LinkTab
                  icon={<KeyIcon />}
                  label="Change Password"
                  to="/settings/change-password"
                />
              </Tabs>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={10}
            sx={{ padding: { xs: ".5rem 0", md: "0 1rem" } }}
          >
            <Routes>
              <Route path="profile" element={<EditProfile />} />
              <Route path="preferences" element={<Preferences />} />
              <Route path="notifications" element={<Preferences />} />
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Settings;
