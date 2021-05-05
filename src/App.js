import React from "react";
import Header from "./components/layouts/header";
import UsersInfo from "./pages/UserInfo/Users";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  CssBaseline
} from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333",
      light: "#3d9"
    },
    secondary: {
      main: "#f83245",
      light: "#f8324546"
    },
    background: {
      default: "#f4f5fd"
    }
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)"
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  }
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "0px",
    width: "100%"
  }
});

export default function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.appMain}>
        <Header />
        <UsersInfo />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}
