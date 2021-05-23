import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/layouts/useForm";
import SaveIcon from '@material-ui/icons/Save';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

const initialFieldsValue = {
    id: 0,
    name: "",
    email: "",
    phone: "",
    password: "",
};

export default function UserForm(props) {
    const { updateRecords, updateForEdit } = props

    // form validation
    const validate = (fieldValues = fields) => {
        let temp = { ...errors }
        if ('name' in fieldValues) {
            temp.name = fieldValues.name ? "" : "This field is required"
        }
        if ('email' in fieldValues) {
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email format is not valid"
        }
        if ('phone' in fieldValues) {
            temp.phone = fieldValues.phone.length === 11 ? "" : "Number must be 11 digits"
        }
        if ('password' in fieldValues) {
            temp.password = fieldValues.password.length >= 8 ? "" : "Maximum 8 character required"
        }
        setErrors({
            ...temp
        })
        if (fieldValues === fields) {
            return Object.values(temp).every(x => x === "")
        }
    }

    const { fields, setFields, handleInputChange, errors, setErrors, resetForm } = useForm(initialFieldsValue, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            updateForEdit(fields, resetForm)
        }
    }

    useEffect(() => {
        if (updateRecords !== null) {
            setFields({
                ...updateRecords
            })
        }
    }, [updateRecords])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="name"
                        value={fields.name}
                        label="Full Name"
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Input
                        name="email"
                        value={fields.email}
                        label="Email"
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        name="phone"
                        value={fields.phone}
                        label="Mobile No"
                        onChange={handleInputChange}
                        error={errors.phone}
                    />
                    <Controls.Input
                        name="password"
                        value={fields.password}
                        label="Password"
                        type="password"
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                    <div style={{ marginTop: '1rem' }}>
                        <Controls.Button
                            type="submit"
                            text="Save"
                            startIcon={<SaveIcon />}
                            size="medium"
                        />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            size="medium"
                            startIcon={<RotateLeftIcon />}
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    );
}
