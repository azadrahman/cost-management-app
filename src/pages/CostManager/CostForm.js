import React, {useEffect} from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useCostForm, Form } from "./useCostForm";
import SaveIcon from '@material-ui/icons/Save';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

const initialCostFields = {
  id: 0,
  costTitle: "",
  quantity: 0,
  cost: 0,
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
    if('quantity' in costFieldValues){
      temp.quantity = costFieldValues.quantity ? "" : "Quantity is required"
    }
    if('cost' in costFieldValues) {
      temp.cost = costFieldValues.cost ? "" : "Amount is required"
    }
    setErrors({
      ...temp
    })
    if(costFieldValues == costFields){
      return Object.values(temp).every(x => x == "")
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
            name="costTitle"
            value={costFields.costTitle}
            label="Cost Title"
            onChange={handleCostInputChange}
            error={errors.costTitle}
          />
          <Controls.Input
            name="quantity"
            value={costFields.quantity}
            label="Quantity"
            type="Number"
            onChange={handleCostInputChange}
            error={errors.quantity}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            name="cost"
            value={costFields.cost}
            label="Cost Amount"
            type="Number"
            onChange={handleCostInputChange}
            error={errors.cost}
          />
          <Controls.Input
            name="date"
            value={costFields.date}
            label="Cost Date"
            type="Date"
            onChange={handleCostInputChange}
            error={errors.date}
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
