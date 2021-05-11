import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  TableHead,
  TablePagination,
  TableSortLabel,
  Toolbar,
  InputAdornment
} from "@material-ui/core";

import {costTableHead} from "../../services/costUtility/costService";
import * as costUtility from "../../services/costUtility/costService";
import ActionButton from "../../components/controls/ActionButton";
import Controls from "../../components/controls/Controls";
import Popup from "../../components/modals/Popup";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from "@material-ui/icons/Delete";
import Notification from "../../components/notifications/Notification";
import DeletePopup from "../../components/modals/DeletePopup";
import CostForm from "./CostForm"

const useStyles = makeStyles(theme => ({
  table: {
    margin: theme.spacing(0),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light
    },
    "& tbody td": {
      fontWeight: "400"
    },
    "& tbody tr:hover": {
      backgroundColor: "#d9d9d9",
      cursor: "pointer"
    }
  },
  searchInput: {
    marginBottom: "0.6rem",
    width: "70%",
    color: "#000",
  },
  btnStyle: {
    position: "absolute",
    right: "4px",
    padding: '6px 14px',
    backgroundColor: "#3d9",
  }
}));

export default function CostTable() {
  const classes = useStyles();

  // notification state
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: ""
  });

  // delete Popup state
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: ""
  });

  // user data state
  const [costRecords, setCostRecords] = useState(costUtility.getAllCosts());

  // search filter state
  const [searchItem, setSearchItem] = useState({
    fn: items => {
      return items;
    }
  });

  // popup state
  const [openPopup, setOpenPopup] = useState(false);

  // manage pagination
  const pages = [5, 10, 20];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  // manage sorting
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  // update records state 
  const [updateCostRecords, setUpdateCostRecords] = useState(null)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortRequest = cellId => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };

//   const handleSearch = e => {
//     let target = e.target;
//     setSearchItem({
//       fn: items => {
//         if (target.value == "") return items;
//         else {
//           return items.filter(
//             x =>
//               x.costTitle.toLowerCase().indexOf(target.value.toLowerCase()) >= 0
//           );
//         }
//       }
//     });
//   };

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={costRecords.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );

  // manage sorting 'asc' and 'desc'
  function SortFn(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  // insertion and updating handle
  const costUpdateForEdit = (cost, costResetForm) => {
    if (cost.id == 0){
      costUtility.addCost(cost)
      setNotify({
        isOpen: true,
        message: 'New cost entry added successfully',
        type: 'success'
    })
    }
    else {
      costUtility.updateCost(cost)
      setNotify({
        isOpen: true,
        message: 'Entry updated successfully',
        type: 'success'
    })
    }
    costResetForm()
    setUpdateCostRecords(null)
    setOpenPopup(false)
    setCostRecords(costUtility.getAllCosts())
  }

  // cost view handle
  const costViewHandle = id =>{
    setUpdateCostRecords(id)
    setOpenPopup(true)
  }

  // update cost records for edit handle
  const updateHandle = record =>{
    setUpdateCostRecords(record)
    setOpenPopup(true)
  }

  // onDelete handle
  const onDelete = id => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    });
    costUtility.deleteCost(id);
    setCostRecords(costUtility.getAllCosts());
    setNotify({
      isOpen: true,
      message: "Cost record deleted Successfully",
      type: "error"
    });
  };

  // render pagging, sorting and search filtering
  const costRecordsAfterPagingAndSorting = () => {
    return SortFn(costRecords, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };

  return (
    <>
      <Toolbar>
        {/* { input from date and to date from date picker} */}
        <Controls.Button
          text="Add Cost"
          variant="outlined"
          startIcon={<AddIcon />}
          className={classes.btnStyle}
          onClick={() => {
            setOpenPopup(true);
          }}
        />
      </Toolbar>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {costTableHead.map(costThead => (
              <TableCell
                key={costThead.id}
                sortDirection={orderBy === costThead.id ? order : false}
              >
                {costThead.disableSorting ? (
                  costThead.label
                ) : (
                  <TableSortLabel
                    active={orderBy === costThead.id}
                    direction={orderBy === costThead.id ? order : "asc"}
                    onClick={() => {
                      handleSortRequest(costThead.id);
                    }}
                  >
                    {costThead.label}
                  </TableSortLabel>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {costRecordsAfterPagingAndSorting().map(costRecord => (
            <TableRow key={costRecord.id}>
              <TableCell>{costRecord.costTitle}</TableCell>
              <TableCell>{costRecord.quantity}</TableCell>
              <TableCell>{costRecord.cost}</TableCell>
              <TableCell>{costRecord.date}</TableCell>
              <TableCell>
                <ActionButton 
                  color="default"
                  onClick={() => costViewHandle(costRecord)}
                >
                  <VisibilityIcon fontSize="small" />
                </ActionButton>
                <ActionButton 
                  color="primary"
                  onClick={() => updateHandle(costRecord)}
                >
                  <EditOutlinedIcon fontSize="small" />
                </ActionButton>
                <ActionButton
                  color="secondary"
                  onClick={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: "Are you sure?",
                      subTitle: "Do you really want to delete this record?",
                      onConfirm: () => {
                        onDelete(costRecord.id);
                      }
                    });
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TblPagination />
      <Popup
        title="Cost Entry"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
       <CostForm 
        updateCostRecords={updateCostRecords}
        costUpdateForEdit={costUpdateForEdit}
       />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <DeletePopup
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
