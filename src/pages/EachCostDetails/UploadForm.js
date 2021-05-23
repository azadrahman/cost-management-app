import React, { useState } from 'react';
import { Grid, makeStyles } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { Form } from "../../components/layouts/useForm";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ProgressBar from '../../components/controls/ProgressBar';
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
    },
    imgBox: {
        padding: '8px 16px', 
        border: '1px solid #e2e0d4', 
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
    },
    image: {
        width: '80px',
        height: '80px',
        objectFit: 'cover',
        borderRadius: '50%'
    }
})

const UploadForm = () => {
    const classes = useStyles()

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: ""
    });
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [success, setSuccess] = useState(false)


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

            const { destination, type } = res.data;

            setUploadedFile({ destination, type });

            setNotify({
                isOpen: true,
                message: 'file uploaded successfully',
                type: 'success'
            })
            setSuccess(true)
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
                    <ProgressBar percentage={uploadPercentage} />
                </Grid>
            </Form>
            <Notification notify={notify} setNotify={setNotify} />
            {success ? (
                <div style={{marginTop: '1.5rem', marginLeft: '0.6rem'}}>
                    {uploadedFile.type == ('image/png' || 'image/jpeg') ?
                    <div className={classes.imgBox}>
                        <div>
                            <img
                                className={classes.image}
                                src={`http://35.222.145.11/${uploadedFile.destination}`}
                            />
                        </div>
                        <p style={{fontWeight: 'bold', marginLeft: '0.5rem', marginTop: '0.5rem' }}>{uploadedFile.destination.slice(19, 100)}</p>
                    </div> : 
                    <div className={classes.imgBox}>
                        <div>
                            <img
                                className={classes.image}
                                src="https://png.pngtree.com/png-vector/20190628/ourlarge/pngtree-file-icon-for-your-project-png-image_1521170.jpg" alt='file'
                            />
                        </div>
                        <p style={{fontWeight: 'bold', marginLeft: '0.5rem', marginTop: '0.5rem' }}>{uploadedFile.destination.slice(19, uploadedFile.destination.length)}</p>
                    </div> }
                </div>
            ) : null}
        </>
    );
};

export default UploadForm;