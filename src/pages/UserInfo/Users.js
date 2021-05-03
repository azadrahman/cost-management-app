import React, { useState } from "react";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import PageHeader from "../../components/layouts/PageHeader";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import UserTable from "./UserTable";

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(2.5),
    padding: theme.spacing(1)
  }
}));

export default function UsersInfo() {
  const classes = useStyles();

  return (
    <>
      <PageHeader
        title="Users Table"
        subTitle="Details of each user"
        icon={<PeopleAltIcon />}
      />
      <Paper className={classes.pageContent}>
        <UserTable />
      </Paper>
    </>
  );
}
