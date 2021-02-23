/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useSelector, useDispatch } from "react-redux";
import ReactMarkdown from 'react-markdown'



const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function Doc() {
  const classes = useStyles();
  const [tl, setTL] = React.useState(false);
  const [tc, setTC] = React.useState(false);
  const [tr, setTR] = React.useState(false);
  const [bl, setBL] = React.useState(false);
  const [bc, setBC] = React.useState(false);
  const [br, setBR] = React.useState(false);

  const state = useSelector((state) => state)

  console.log(state)

  
  React.useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });
  const showNotification = place => {
    switch (place) {
      case "tl":
        if (!tl) {
          setTL(true);
          setTimeout(function() {
            setTL(false);
          }, 6000);
        }
        break;
      case "tc":
        if (!tc) {
          setTC(true);
          setTimeout(function() {
            setTC(false);
          }, 6000);
        }
        break;
      case "tr":
        if (!tr) {
          setTR(true);
          setTimeout(function() {
            setTR(false);
          }, 6000);
        }
        break;
      case "bl":
        if (!bl) {
          setBL(true);
          setTimeout(function() {
            setBL(false);
          }, 6000);
        }
        break;
      case "bc":
        if (!bc) {
          setBC(true);
          setTimeout(function() {
            setBC(false);
          }, 6000);
        }
        break;
      case "br":
        if (!br) {
          setBR(true);
          setTimeout(function() {
            setBR(false);
          }, 6000);
        }
        break;
      default:
        break;
    }
  };

  const md = `
  # Internship Information Management and Forecasting App
  ## Background & Aim
  In ICT graduate school and business school, there would be a batch of graduates proceeding their internship each semester/academic period. Employer liaison managers usually face a circumstance full of change and uncertainty. To help them understand the situation and plan the work well, this application is built to provide information management and forecasting functions. 
  
  By importing data of companies and students, managers can easily know the total number of companies which should contact to and match students' interests with companies' interests well. Managers also can monitor the current situation by checking auto-generated summarized data. 
  
  ## User Manual
  * Log in by Google account to start.
  * Upload Checklist:
      1. Use the templete to edit information.
      2. Ensure all cells are in the form "TEXT".
      3. Double check if the file is correctly matches the destination (for example, company info excel should uploaded to company section).
  * Student name and company name should be unique, data with duplicated name would not allowed be created/updated. If you upload information with duplicated name, the new raw of data will replace the old one.
  * Due to the limit of Trello, only 1000 rows of actions would be saved in a board. That's also the upper limit we can handle.
  * When archive historical student-company number data, the name should be in this format: "year+semester".
  * The application provides auto-save function once you may need to remove all data. Please save the backup.
  
  ## Download Link
  *Companies information upload template* 
  
  *Students information upload template* 
  
  ## Guide to Download Trello Board .json File
  1. Find and click the "Menu" button in a trello board
  2. Click "More"
  3. Click "Print and export"
  4. Click "Export as JSON"
  5. In the new tab, right click and choose "save as ..."
  6. Click save, now you can upload it in Company section and extract card name, list name, conversation info into Excel file`

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Introduction</h4>
        <p className={classes.cardCategoryWhite}>
Internship project presented by Group 7 at 2020 late semester
        </p>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <ReactMarkdown children={md} />
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
}
