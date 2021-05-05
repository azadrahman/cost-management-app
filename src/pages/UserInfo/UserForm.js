import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/layouts/useForm";
import SaveIcon from '@material-ui/icons/Save';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

const initialFieldsValue = {
    id: 0,
    fullname: "",
    email: "",
    mobile: "",
    gender: "male",
    address: "",
    userType: ""
};

const genderItems = [
    { id: "male", title: "Male" },
    { id: "female", title: "Female" },
    { id: "other", title: "Other" }
];

const userTypeOptions = [
    { id: "1", title: "Beginner" },
    { id: "2", title: "Advance" },
    { id: "3", title: "Pro" }
];

export default function UserForm(props) {
    const { updateRecords, updateForEdit } = props

    // form validation
    const validate = (fieldValues = fields) => {
        let temp = { ...errors }
        if ('fullname' in fieldValues) {
            temp.fullname = fieldValues.fullname ? "" : "This field is required"
        }
        if ('email' in fieldValues) {
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email format is not valid"
        }
        if ('mobile' in fieldValues) {
            temp.mobile = fieldValues.mobile.length === 11 ? "" : "Number must be 11 digits"
        }
        setErrors({
            ...temp
        })
        if (fieldValues == fields) {
            return Object.values(temp).every(x => x == "")
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
        if (updateRecords != null) {
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
                        name="fullname"
                        value={fields.fullname}
                        label="Full Name"
                        onChange={handleInputChange}
                        error={errors.fullname}
                    />
                    <Controls.Input
                        name="email"
                        value={fields.email}
                        label="Email"
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        name="mobile"
                        value={fields.mobile}
                        label="Mobile No"
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
                    <Controls.Input
                        name="address"
                        value={fields.address}
                        label="Address"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        label="Gender"
                        value={fields.gender}
                        name="gender"
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    <Controls.SelectBox
                        value={fields.userType}
                        name="userType"
                        label="User Type"
                        onChange={handleInputChange}
                        options={userTypeOptions}
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
