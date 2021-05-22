import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

export function useCostForm(initialCostFields, validateOnChange = false, costValidate) {
  const [costFields, setCostFields] = useState(initialCostFields);
  const [costErrors, setCostErrors] = useState({});

  const handleCostInputChange = e => {
    const { name, value } = e.target;
    setCostFields({
      ...costFields,
      [name]: value
    })
    if (validateOnChange) {
      costValidate({ [name]: value })
    }
  };

  const costResetForm = () => {
    setCostFields(initialCostFields)
    setCostErrors({})
  }

  return {
    costFields,
    setCostFields,
    handleCostInputChange,
    costErrors,
    setCostErrors,
    costResetForm,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1)
    }
  }
}));

export function Form(props) {
  const classes = useStyles();
  const {children, ...other} = props
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {children}
    </form>
  );
}
