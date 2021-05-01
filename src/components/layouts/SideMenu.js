import React from 'react'
import { makeStyles } from "@material-ui/core";

// withStyles & makeStyles

const useStyle = makeStyles({
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '320px',
        height: '100%',
        backgroundColor: '#253053'
    }
})

export default function SideMenu() {
  const classes = useStyle()
    return (
        <div className={classes.sideMenu}>
          
        </div>
    )
}
