import React, {useEffect} from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useCostForm, Form } from "./useCostForm";
import SaveIcon from '@material-ui/icons/Save';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { convertToyyyyMMdd } from "../../services/function"

const initialCostFields = {
  ID: 0,
  Title: "",
  Description: "",
  Amount: 0,
  date: convertToyyyyMMdd(new Date())
};


export default function CostForm(props) {
  const {updateCostRecords, costUpdateForEdit} = props

  // form validation
  const costValidate = (costFieldValues = costFields) => {
    let temp = {...costErrors}
    if('Title' in costFieldValues){
      temp.Title = costFieldValues.Title ? "" : "Title is required"
    }
    if('Description' in costFieldValues){
      temp.Description = costFieldValues.Description ? "" : "Description is required"
    }
    if('Amount' in costFieldValues) {
      temp.Amount = costFieldValues.Amount ? "" : "Amount is required"
    }
    setCostErrors({
      ...temp
    })
    if(costFieldValues === costFields){
      return Object.values(temp).every(x => x === "")
    }
  }

  const { costFields, setCostFields, handleCostInputChange, costErrors, setCostErrors, costResetForm } = useCostForm(initialCostFields, true, costValidate);

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
            name="Title"
            value={costFields.Title}
            label="Cost Title"
            onChange={handleCostInputChange}
            error={costErrors.Title}
          />
          <Controls.Input
            name="Description"
            value={costFields.Description}
            label="Description"
            onChange={handleCostInputChange}
            error={costErrors.Description}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            name="Amount"
            value={costFields.Amount}
            label="Cost Amount"
            type="number"
            onChange={handleCostInputChange}
            error={costErrors.Amount}
          />
          <Controls.Input
            name="date"
            value={costFields.date || ''}
            label="Cost Date"
            type="date"
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
