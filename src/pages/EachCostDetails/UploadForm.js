import React, { useState } from 'react';
import { Grid, makeStyles } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { Form } from "../../components/layouts/useForm";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ProgressBar from './ProgressBar';
import Notification from "../../components/notifications/Notification";
import axios from "axios"

const useStyles = makeStyles({
    input: {
        backgroundColor: 'transparent',
    },
    btn: {
        backgroundColor: '#003366',
        marginTop: '0.4rem',
        transition: 'all 0.3 ease',
        "&:hover": {
            backgroundColor: '#001e3d'
        }
    }
})

const UploadForm = () => {
    const classes = useStyles()

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: ""
    });
    const [uploadPercentage, setUploadPercentage] = useState(0);


    const handleUploadChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };
    const uploadUrl = 'http://35.222.145.11/uploads'

    const handleUploadSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post(uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }
            });
            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 10000);

            setNotify({
                isOpen: true,
                message: 'file uploaded successfully',
                type: 'success'
            })
        } catch (err) {
            if (err.response.status === 500) {
                setNotify({
                    isOpen: true,
                    message: "There is a problem with the server",
                    type: "error"
                });
            } else {
                setNotify({
                    isOpen: true,
                    message: "Bad request try again!",
                    type: "error"
                });
            }
            setUploadPercentage(0)
        }
    };

    return (
        <>
            <Form onSubmit={handleUploadSubmit}>
                <Grid container>
                    <Grid item xs={8}>
                        <Controls.Input
                            className={classes.input}
                            name="uploadFile"
                            variant="standard"
                            type="file"
                            onChange={handleUploadChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <div>
                            <Controls.Button
                                className={classes.btn}
                                type="submit"
                                text="Upload file"
                                startIcon={<CloudUploadIcon />}
                                size="small"
                            />
                        </div>
                    </Grid>
                    <ProgressBar percentage={uploadPercentage}/>
                </Grid>
            </Form>
            <Notification notify={notify} setNotify={setNotify} />
        </>
    );
};

export default UploadForm;