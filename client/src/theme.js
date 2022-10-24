import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const PRIMARY = "#FF6633";
const PRIMARY_LIGHT = "#ff845b";
const SECONDARY = "#0c2340";
const TERTIARY = "#1769d4";

let theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY,
      light: PRIMARY_LIGHT,
    },
    secondary: {
      main: SECONDARY,
    },
    background: {
      main: "#f0f2f5",
    },
    white: {
      main: "#FFF",
    },
    tertiary: {
      main: TERTIARY,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        containedPrimary: {
          color: "#FFF",
        },
        containedTertiary: {
          color: "#FFF",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);

export default theme;
