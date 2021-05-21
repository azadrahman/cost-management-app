import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
        marginLeft: '0.5rem',
        width: '100%',
    },
});


function LinearProgressWithLabel({value}) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress
                    style={{ width: `${value}%` }}
                    variant="determinate"
                    {...value}
                />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{value}%</Typography>
            </Box>
        </Box>
    );
}

export default function ProgressBar({percentage}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <LinearProgressWithLabel value={percentage} />
        </div>
    );
}
