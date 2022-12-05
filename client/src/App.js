import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { CookiesProvider } from "react-cookie";
import theme from "./theme";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import { Box } from "@mui/system";
import Groups from "./pages/groups/Groups";
import PrivateRoute from "./PrivateRoute";
import CreateGroup from "./pages/groups/CreateGroup";
import Settings from "./pages/settings/Settings";
import CreateGame from "./pages/games/CreateGame";
import EditGame from "./pages/games/EditGame";
import Notifications from "./pages/notifications/Notifications";
import GamePage from "./pages/games/GamePage";
import Profile from "./pages/profile/Profile";
import Games from "./pages/games/Games";
import Search from "./pages/search/Search";
import Group from "./pages/groups/Group";
import Explore from "./pages/explore/Explore";

function App() {
  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Box sx={{ backgroundColor: theme.palette.background.main }}>
            <Navbar />
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route
                  path="settings/*"
                  element={
                    <PrivateRoute>
                      <Settings />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="profile/:id"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route path="games">
                  <Route
                    index
                    element={
                      <PrivateRoute>
                        <Games />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="create"
                    element={
                      <PrivateRoute>
                        <CreateGame />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path=":id/*"
                    element={
                      <PrivateRoute>
                        <GamePage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="edit/:id"
                    element={
                      <PrivateRoute>
                        <EditGame />
                      </PrivateRoute>
                    }
                  />
                </Route>
                <Route path="groups">
                  <Route index element={<Groups />} />
                  <Route
                    path="create"
                    element={
                      <PrivateRoute>
                        <CreateGroup />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path=":title"
                    element={
                      <PrivateRoute>
                        <Group />
                      </PrivateRoute>
                    }
                  />
                </Route>
                <Route
                  path="search"
                  element={
                    <PrivateRoute>
                      <Search />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="explore"
                  element={
                    <PrivateRoute>
                      <Explore />
                    </PrivateRoute>
                  }
                />
                <Route path="notifications">
                  <Route
                    index
                    element={
                      <PrivateRoute>
                        <Notifications />
                      </PrivateRoute>
                    }
                  />
                </Route>
              </Route>
            </Routes>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
