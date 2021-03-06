import React from 'react';
import {makeStyles} from "@material-ui/core"
import {DateRangePickerComponent} from "@syncfusion/ej2-react-calendars"

const useStyle = makeStyles({
  dateStyle: {
    width: '60%'
  }
})

export default function DateRange(props) {
  const {startValue, endValue, onChange} = props
  const classes = useStyle()

  return (
    <div className={classes.dateStyle}>
      <DateRangePickerComponent
        placeholder="Start date - End date"
        separator='to'
        format="dd-MMM-yy"
        startDate={startValue}
        endDate={endValue}
        change={onChange}
      />
    </div>
  )
}