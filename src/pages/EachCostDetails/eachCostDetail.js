import React, { useState, useEffect } from 'react';
import { makeStyles, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import Controls from "../../components/controls/Controls"
import Popup from "../../components/modals/Popup";
import UploadForm from "./UploadForm"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { convertToyyyyMMdd } from "../../services/function"

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "transparent",
        margin: "0.8rem",
        marginLeft: "0.4rem",
        boxShadow: "2px 0px 6px 2px #ccc",
    },
    title: {
        fontSize: '14px',
        padding: '12px',
        letterSpacing: '2px',
        fontFamily: 'sans-serif',
        textTransform: 'uppercase',
        fontWeight: '400',
        borderBottom: '2px solid grey',
        borderTop: '2px solid grey'
    },
    btn: {
        marginTop: '1rem',
        marginLeft: '0.8rem',
        border: '1px solid grey',
        padding: '3px 16px',
        fontSize: '12px',
        letterSpacing: '0.7px',
        fontFamily: 'sans-serif',
        textTransform: 'uppercase',
        transition: 'all 0.3s ease-in-out',
        "&:hover": {
            boxShadow: '2px 0px 6px 2px #ccc',
            borderLeft: '6px solid #ff5719',
        }
    },
    link: {
        "&:hover": {
            color: '#ff5719',
            textDecoration: 'none',
        }
    },
    table: {
        marginTop: '1rem',
    },
    headStyle: {
        backgroundColor: '#e5eaef',
        borderTop: '4px solid grey',
        borderLeft: '10px solid grey',
    },
    uploadBtn: {
        marginTop: '2rem',
        backgroundColor: '#003366',
        position: 'absolute',
        right: '10px',
        transition: 'all 0.3 ease',
        "&:hover": {
            backgroundColor: '#194775',
        }
    }
}));

const thTitle = [
    { id: 'title', label: 'Title' },
    { id: 'description', label: 'Description' },
    { id: 'amount', label: 'Cost Amount' },
    { id: 'date', label: 'Entry Date' },
    { id: 'total', label: 'Total' }
]


export default function EachCostDetail() {
    const classes = useStyles();

    const { id } = useParams()
    const url = `http://35.222.145.11/costs/${id}`

    const [openUpload, setOpenUpload] = useState(false)
    const [lists, setLists] = useState([])

    // get each cost id records from api
    const fetchCostRecords = async () => {
        const res = await axios.get(url)
        return res.data
    }

    useEffect(() => {
        const getCostRecords = async () => {
            const allCostList = await fetchCostRecords()
            setLists(allCostList.data)
        }
        getCostRecords()
    }, [])

    const handleUploadPopup = () => {
        setOpenUpload(!openUpload)
    }

    if (lists) {
        return (
            <div className={classes.root}>
                <h3 className={classes.title}>Cost details</h3>
                <button className={classes.btn}>
                    <Link className={classes.link} to="/costs" >Back to cost table</Link>
                </button>
                <Table className={classes.table}>
                    <TableHead className={classes.headStyle}>
                        <TableRow>
                            {thTitle.map(thead => (
                                <TableCell
                                    key={thead.id}
                                >
                                    {thead.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={lists.ID}>
                            <TableCell>{lists.Title}</TableCell>
                            <TableCell>{lists.Description}</TableCell>
                            <TableCell>{lists.Amount}</TableCell>
                            <TableCell>{convertToyyyyMMdd(lists.Date)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Controls.Button
                    className={classes.uploadBtn}
                    text="Upload Attachment"
                    onClick={handleUploadPopup}
                />
                <Popup
                    title="File Upload"
                    openPopup={openUpload}
                    setOpenPopup={setOpenUpload}
                >
                    <UploadForm />
                </Popup>
            </div>
        );
    }
    return (
        <div></div>
    )
}