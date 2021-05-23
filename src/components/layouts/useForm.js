import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

export function useForm(initialFieldsValue, validateOnChange = false, validate) {
    const [fields, setFields] = useState(initialFieldsValue);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFields({
            ...fields,
            [name]: value
        })
        if (validateOnChange) {
            validate({ [name]: value })
        }
    };

    const resetForm = () => {
        setFields(initialFieldsValue)
        setErrors({})
    }

    return {
        fields,
        setFields,
        handleInputChange,
        errors,
        setErrors,
        resetForm,
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
    const { children, ...other } = props
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    );
}
