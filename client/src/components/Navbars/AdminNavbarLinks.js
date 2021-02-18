import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import { useState, useEffect } from 'react';

// import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { GoogleLogout } from 'react-google-login'
import { GoogleLogin } from 'react-google-login';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logIn, logOut } from '../../redux/actions/authActions'
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
  root: {
    width:330,
    // height:
    textAlign: 'center',
    justifyContent: 'center',
    alignItem: 'center',
  },
  paper: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItem: 'center',
  },
}

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();

  
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const state = useSelector((state) => state.auth)
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(state)

  const responseGoogle = async (response) => {
    const profile = await response.getBasicProfile();
    // Get Name
    console.log(profile.getName())
    // Get Img
    console.log(profile.getImageUrl())
    // Get Email
    console.log(profile.getEmail())
    setUser({
      name: profile.getName(),
      email: profile.getEmail(),
      image: profile.getImageUrl(),
    })
  }

  
  const logout = () => {
    setUser({name:"", email:"", image:""})
    dispatch(logOut())
    setIsAuthenticated(false)
  }
  //console.log("is authenticated? ",isAuthenticated)
  useEffect(() => {
    if(user.email) {
      setIsAuthenticated(true)
      dispatch(logIn({name: user.name, email: user.email, image: user.image}))
    } else { setOpen(true) }
  }, [user])

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

        {isAuthenticated ? 
          <div className={classes.root}>
            <Grid
  container
  direction="row"
  justify="center"
  alignItems="center"
  spacing={0}
>
            <Grid item xs className={classes.paper}>
              Hello, {user.name}
              </Grid>
              <Grid item xs={2} className={classes.paper}>
              <img src={user.image} style={{height: 40, width: 40, borderRadius: 50}}/>
              </Grid>
              <Grid item xs className={classes.paper}>
              <GoogleLogout
              buttonText="Logout"
              clientId="218982097035-2fk50n7e831aaa6mdhmnqusl2ktbr0gj.apps.googleusercontent.com"
              onLogoutSuccess={logout}
              />
              </Grid>
              </Grid>
            </div>
            :
            <div>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Welcome!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Welcome to the internship opportunities forecasting app. Please login to begin~
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Agree
              </Button>
            </DialogActions>
          </Dialog>
                          <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
            <Grid item xs className={classes.paper}>
            <Alert variant="outlined" severity="info">
              Please Login to fetch your data
            </Alert>
              </Grid>
              <Grid item xs className={classes.paper}>
                <GoogleLogin
                    clientId="218982097035-2fk50n7e831aaa6mdhmnqusl2ktbr0gj.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                >Log in</GoogleLogin>
              </Grid>
            </Grid>    
          </div>
        }
    </div>
  );
}
