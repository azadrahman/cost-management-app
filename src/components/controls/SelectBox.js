import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";


export default function SelectBox(props) {
    const { value, label, name, onChange, options } = props;

    return (
        <FormControl variant="outlined">
            <InputLabel>{label}</InputLabel>
            <Select label={label} name={name} value={value} onChange={onChange}>
                <MenuItem value="None">None</MenuItem>
                {options.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.title}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
