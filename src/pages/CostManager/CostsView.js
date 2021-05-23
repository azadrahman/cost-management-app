import React from "react";
import {
  Paper,
  makeStyles,
} from "@material-ui/core";
import PageHeader from "../../components/layouts/PageHeader";
import VisibilityIcon from '@material-ui/icons/Visibility';
import CostTable from "./CostTable";

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(2.5),
    padding: theme.spacing(1)
  }
}));

export default function CostsView() {
  const classes = useStyles();

  return (
    <>
      <PageHeader
        title="Costs Table"
        subTitle="Details of your costs"
        icon={<VisibilityIcon />}
      />
      <Paper className={classes.pageContent}>
        <CostTable />
      </Paper>
    </>
  );
}
