import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Box } from "@mui/system";
import Groups from "./pages/Groups";
import PrivateRoute from "./PrivateRoute";
import CreateGroup from "./pages/CreateGroup";
import Settings from "./pages/settings/Settings";

function App() {
  return (
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
              </Route>
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
