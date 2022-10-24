import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Box } from "@mui/system";

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
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
