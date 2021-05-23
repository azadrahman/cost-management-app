import React from "react";
import "./index.css"
import Header from "./components/layouts/header";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  CssBaseline
} from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./pages/HomeView/Home"
import UsersInfo from "./pages/UserInfo/Users"
import CostsView from "./pages/CostManager/CostsView"
import Error from "./pages/Error"
import SideMenu from "./components/layouts/SideMenu"
import EachCostDetail from "./pages/EachCostDetails/eachCostDetail"

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
    paddingLeft: "220px",
    width: "100%"
  },
});

export default function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
    <Router>
    <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route exact path="/costs/:id" component={EachCostDetail} />
          <Route path="/users" component={UsersInfo} />
          <Route path="/costs" component={CostsView} />
          <Route component={Error} />
        </Switch>
      </div>
      <CssBaseline />
    </ThemeProvider>
    </Router>
    </React.Fragment>
  );
}
