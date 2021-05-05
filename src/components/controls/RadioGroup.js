import React from "react";
import {
    RadioGroup as RadioButton,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel
} from "@material-ui/core";

export default function RadioGroup(props) {
    const { name, label, value, onChange, items } = props;
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <RadioButton row value={value} name={name} onChange={onChange}>
                {items.map(item => (
                    <FormControlLabel
                        key={item.id}
                        value={item.id}
                        control={<Radio />}
                        label={item.title}
                    />
                ))}
            </RadioButton>
        </FormControl>
    );
}
