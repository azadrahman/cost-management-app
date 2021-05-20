import React, {useEffect} from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useCostForm, Form } from "./useCostForm";
import SaveIcon from '@material-ui/icons/Save';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

const initialCostFields = {
  id: 0,
  title: "",
  description: "",
  amount: 0,
  date: new Date()
};


export default function CostForm(props) {
  const {updateCostRecords, costUpdateForEdit} = props

  // form validation
  const costValidate = (costFieldValues = costFields) => {
    let temp = {...errors}
    if('title' in costFieldValues){
      temp.title = costFieldValues.title ? "" : "This field is required"
    }
    if('description' in costFieldValues){
      temp.description = costFieldValues.description ? "" : "Description is required"
    }
    if('amount' in costFieldValues) {
      temp.amount = costFieldValues.amount ? "" : "Amount is required"
    }
    setErrors({
      ...temp
    })
    if(costFieldValues === costFields){
      return Object.values(temp).every(x => x === "")
    }
  }

  const { costFields, setCostFields, handleCostInputChange, errors, setErrors, costResetForm } = useCostForm(initialCostFields, true, costValidate);

  const handleSubmit = e => {
    e.preventDefault()
    if(costValidate()){
      costUpdateForEdit(costFields, costResetForm)
    }
  }

  useEffect(() => {
    if(updateCostRecords != null) {
      setCostFields({
        ...updateCostRecords
      })
    }
  }, [updateCostRecords])

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="title"
            value={costFields.title}
            label="Cost Title"
            onChange={handleCostInputChange}
            error={errors.title}
          />
          <Controls.Input
            name="description"
            value={costFields.description}
            label="Description"
            type="text"
            onChange={handleCostInputChange}
            error={errors.description}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            name="amount"
            value={costFields.amount}
            label="Cost Amount"
            type="Number"
            onChange={handleCostInputChange}
            error={errors.amount}
          />
          <Controls.Input
            name="date"
            value={costFields.date}
            label="Cost Date"
            type="Date"
            onChange={handleCostInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div style={{marginTop: '1rem'}}>
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
              onClick={costResetForm}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
