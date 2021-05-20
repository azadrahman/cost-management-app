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
import tableHead from "../../services/tableHeadData";
import ActionButton from "../../components/controls/ActionButton";
import Controls from "../../components/controls/Controls";
import Popup from "../../components/modals/Popup";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import Notification from "../../components/notifications/Notification";
import DeletePopup from "../../components/modals/DeletePopup";
import UserForm from "./UserForm"
import axios from "axios"

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
      backgroundColor: "#ddd",
      cursor: "pointer"
    }
  },
  searchInput: {
    marginBottom: "0.8rem",
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

const url = 'http://35.222.145.11/users'

export default function UserTable() {
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
  const [records, setRecords] = useState([]);

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
  const [updateRecords, setUpdateRecords] = useState(null)

  // get all users from api
  const fetchUsers = async () => {
    const res = await axios.get(url)
    return res.data
  }

  useEffect(() => {
    const getUsers  = async () => {
      const allUsers = await fetchUsers()
      setRecords(allUsers.data)
    }
    getUsers()
  }, [])

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

  const handleSearch = e => {
    let target = e.target;
    setSearchItem({
      fn: items => {
        if (target.value === "") return items;
        else {
          return items.filter(
            x =>
              x.name.toLowerCase().indexOf(target.value.toLowerCase()) >= 0
          );
        }
      }
    });
  };

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
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


 // addUser to the server
 const addUser = async (userFields) => {
   const req = {
     id: userFields.id,
     ...userFields
   }
   const res = await axios.post(url, req)
   setRecords([...records, res.data])
 }

// update users to the server
// const updateUser = (data) => {

//  }

 // delete user from the server
 const deleteUser = async (id) => {
    await axios.delete(`${url}/${id}`)
    const newUserList = records.filter(list => {
      return list.id !== id
    })
    setRecords(newUserList)
 }

  // insertion and updating handle
  const updateForEdit = (user, resetForm) => {
    if (user.id === 0) {
      addUser(user)
      setNotify({
        isOpen: true,
        message: 'New user added successfully',
        type: 'success'
      })
    }
    // else {
    //   userUtility.updateUser(user)
    //   setNotify({
    //     isOpen: true,
    //     message: 'Record Updated Successfully',
    //     type: 'success'
    //   })
    //}
    resetForm()
    setUpdateRecords(null)
    setOpenPopup(false)
    setRecords(records)
  }

  // update records for edit handle
  const updateHandle = (record) => {
    setUpdateRecords(record)
    setOpenPopup(true)
  }

  // onDelete handle
  const onDelete = id => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    });
    deleteUser(id);
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error"
    });
  };

  // render pagging, sorting and search filtering
  const recordsAfterPagingAndSorting = () => {
    return SortFn(searchItem.fn(records), getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };

  return (
    <>
      <Toolbar>
        <Controls.Input
          label="Search User"
          variant="standard"
          className={classes.searchInput}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <Controls.Button
          text="Add User"
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
            {tableHead.map(theadTitle => (
              <TableCell
                key={theadTitle.id}
                sortDirection={orderBy === theadTitle.id ? order : false}
              >
                {theadTitle.disableSorting ? (
                  theadTitle.label
                ) : (
                  <TableSortLabel
                    active={orderBy === theadTitle.id}
                    direction={orderBy === theadTitle.id ? order : "asc"}
                    onClick={() => {
                      handleSortRequest(theadTitle.id);
                    }}
                  >
                    {theadTitle.label}
                  </TableSortLabel>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {recordsAfterPagingAndSorting().map(record => (
            <TableRow key={record.id}>
              <TableCell>{record.name}</TableCell>
              <TableCell>{record.email}</TableCell>
              <TableCell>{record.phone}</TableCell>
              <TableCell>
                <ActionButton
                  color="primary"
                  onClick={() => updateHandle(record)}
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
                        onDelete(record.id);
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
        title="User Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UserForm
          updateForEdit={updateForEdit}
          updateRecords={updateRecords}
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
