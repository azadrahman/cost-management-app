import React, {useState} from 'react'
import { Table, TableBody, TableRow, TableCell, makeStyles, TableHead } from '@material-ui/core'
import userDB from "../../services/userData"

const useStyles = makeStyles(theme => ({
    table: {
        marginLeft: theme.spacing(0),
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        '& thead th': {
            fontWeight: '600',
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light,
        },
        '& tbody td': {
            fontWeight: '400',
        },
        '& tbody tr:hover': {
            backgroundColor: '#ddd',
            cursor: 'pointer',
        },
    },
}))

export default function CostTable() {
  const classes = useStyles();

  const [records, setRecords] = useState(userDB)

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Fullname</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Mobile No</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {records.map(record => (
          <TableRow key={record.id}>
            <TableCell>
              {record.fullname}
            </TableCell>
            <TableCell>
              {record.email}
            </TableCell>
            <TableCell>
              {record.mobile}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
