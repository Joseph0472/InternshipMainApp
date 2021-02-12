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

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import GoogleLogout from 'react-google-login';
import GoogleLogin from 'react-google-login';


const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [user, setUser] = useState({name: "", email: "", image: ""})

  const responseGoogle = (response) => {
    const profile = response.getBasicProfile();
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
    setIsAuthenticated(false)
  }
  console.log(isAuthenticated)

  useEffect(() => {
    if(user.email.length > 0 || user.name.length > 0 ) {
      setIsAuthenticated(true)
    }
  }, [user])

  return (
    <div>
      {isAuthenticated ? 
      <div>
      Hello, Joseph
      <img src={user.image} style={{height: 40, width: 40, borderRadius: 50,marginTop:2, position: "relative"}}/>
      <GoogleLogout
      buttonText="Logout"
      clientId="218982097035-i1fctlfp4ft5rj1n31muapofq8f4vkem.apps.googleusercontent.com"
      onLogoutSuccess={logout}
      >Logout</GoogleLogout>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      :
      <div className={classes.searchWrapper}>
        <GoogleLogin
            clientId="218982097035-i1fctlfp4ft5rj1n31muapofq8f4vkem.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            cookiePolicy={'single_host_origin'}
        >Log in</GoogleLogin>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    }
    </div>
  );
}
