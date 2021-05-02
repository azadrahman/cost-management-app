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
import SearchIcon from "@material-ui/icons/Search";

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
    width: "75%",
    color: "#000"
  }
}));

export default function UserTable() {
  const classes = useStyles();

  const [records, setRecords] = useState(userDB);
  const [searchItem, setSearchItem] = useState({
    fn: items => {
      return items;
    }
  });

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
          return items.filter(x =>
            x.fullname.toLowerCase().includes(target.value)
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TblPagination />
    </>
  );
}
