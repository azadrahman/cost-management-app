import React from "react";
import Header from "./components/layouts/header";
import PageHeader from "./components/layouts/PageHeader";
import UserTable from "./components/layouts/UserTable";
import SideMenu from "./components/layouts/SideMenu";
import { makeStyles } from "@material-ui/core";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "0px",
    width: "100%"
  },
  userTbl: {
    margin: "1rem",
    boxShadow: "4px 0px 6px 2px #ccc"
  }
});

export default function App() {
  const classes = useStyles();
  return (
    <>
      {/* <SideMenu /> */}
      <div className={classes.appMain}>
        <Header />
        <PageHeader
          title="Users Table"
          subTitle="Cost details of each user"
          icon={<PeopleAltIcon fontSize="medium" />}
        />
        <div className={classes.userTbl}>
          <UserTable />
        </div>
      </div>
    </>
  );
}
