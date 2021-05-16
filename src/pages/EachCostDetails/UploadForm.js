import React, { useState } from 'react';
import { Grid, makeStyles } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { Form } from "../../components/layouts/useForm";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ProgressBar from './ProgressBar';
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

    const handleUploadChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const handleUploadSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        console.log(filename)
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
                    <ProgressBar />
                </Grid>
            </Form>
        </>
    );
};

export default UploadForm;