import React from 'react'
import { makeStyles } from "@material-ui/core";
import {Link} from "react-router-dom"
import PersonIcon from '@material-ui/icons/Person';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// withStyles & makeStyles

const useStyle = makeStyles({
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '220px',
        height: '100vh',
        backgroundColor: '#2B2B2B',
    },
    userProfile: {
      display: 'flex',
      marginTop: '65px',
      marginLeft: '12px',
      paddingBottom: '10px',
      borderBottom: '1px solid #5C5C5C',
      "& h5": {
        fontSize: '16px',
        color: '#E3E3E3'
      }
    },
    menuContainer: {
      width: '100%',
      margin: '3rem 0.7rem',
      fontSize: '14px'
    },
    menuItem: {
      padding: '4px 8px',
      width: '90%',
      display: 'flex',
      alignItems: 'center',
      marginTop: '10px',
      transition: 'all 0.3s ease',
      "&:hover" : {
        borderRadius: '6px',
        backgroundColor: '#ff5719'
      }
    },
    link: {
      display: 'block',
      marginLeft: '6px',
      marginTop: '0.4rem',
      color: '#B9B9B9',
      "&:hover" : {
        color: '#fff',
        textDecoration: 'none'
      }
    },
    iconClass: {
        color: '#fff'
    }
})

export default function SideMenu() {
  const classes = useStyle()
    return (
        <div className={classes.sideMenu}>
          <div className={classes.userProfile}>
              <AccountCircleIcon fontSize="large" color="secondary"/>
              <h5 className={classes.link} >User Name</h5>
          </div>
          <div className={classes.menuContainer}>
            <div className={classes.menuItem}>
              <HomeIcon className={classes.iconClass}/>
              <Link className={classes.link} to="/">Dashboard</Link>
            </div>
            <div className={classes.menuItem}>
              <PersonIcon className={classes.iconClass}/>
              <Link className={classes.link} to="/users">User Mangement</Link>
            </div>
            <div className={classes.menuItem}>
              <CreditCardIcon className={classes.iconClass}/>
              <Link className={classes.link} to="/costs">Cost Management</Link>
            </div>
          </div>
        </div>
    )
}
