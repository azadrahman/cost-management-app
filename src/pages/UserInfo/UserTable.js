import React, { useState } from "react";
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
import userDB from "../../services/userData";
import tableHead from "../../services/tableHeadData";
import Input from "../../components/controls/Input";
import ActionButton from "../../components/controls/ActionButton";
import Controls from "../../components/controls/Controls";
import Popup from "../../components/modals/Popup";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import Notification from "../../components/notifications/Notification";
import { deleteUser } from "../../services/userData";
import DeletePopup from "../../components/modals/DeletePopup";

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
    marginBottom: "0.6rem",
    width: "70%",
    color: "#000"
  },
  btnStyle: {
    position: "absolute",
    right: "4px",
    backgroundColor: "#3d9"
  }
}));

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
  const [records, setRecords] = useState(userDB);

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
        if (target.value == "") return items;
        else {
          return items.filter(
            x =>
              x.fullname.toLowerCase().indexOf(target.value.toLowerCase()) >= 0
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

  // onDelete handle
  const onDelete = id => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    });
    deleteUser(id);
    setRecords(userDB);
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
        <Input
          label="Search User"
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
              <TableCell>{record.fullname}</TableCell>
              <TableCell>{record.email}</TableCell>
              <TableCell>{record.mobile}</TableCell>
              <TableCell>
                <ActionButton color="primary">
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
      />
      <Notification notify={notify} setNotify={setNotify} />
      <DeletePopup
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
