import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Quote from "components/Typography/Quote.js";
import Muted from "components/Typography/Muted.js";
import Primary from "components/Typography/Primary.js";
import Info from "components/Typography/Info.js";
import Success from "components/Typography/Success.js";
import Warning from "components/Typography/Warning.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import Hidden from "@material-ui/core/Hidden";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MaterialTable from 'material-table'
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import regression from "regression"



const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  table: {
    //minWidth: 680,
    //margin: 10
    padding: 10
  },
  title: {
    margin: 0,
    padding: 0,    
  },
  text: {
    
  },
  root: {
    // width: 800,
    // padding: "0px",
    // alignItem: 'center',
    // paddingUp: "0px"
    flexGrow: 1,
  },
  content: {
    marginTop: "0px",
    padidng: "0px"
  },
  foreCard: {
    minWidth: 100,
  },
  action: {
    width: 800,
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingUp: "0px",
    alignItem: 'center'
  },
  cardBody: {
    paddingUp: "0px",
    justifyContent: 'center'

  },
  cardItem: {
    margin: "2px",
    paddingRight: "6px"
  },
  button: {
    margin: 'auto',
    color: "primary",
    height: "60px",
    width: "200px",
    paddingLeft: "100px",
    paddingRight: "100px",
    // marginLeft: "30px",
    // marginRight: "100px"
  }
};

const useStyles = makeStyles(styles);

export default function ForecastingPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  console.log(state) //{company: Array(52), student: Array(24)}

  const initForeData =  {
    totalComNum: 0,
    activeComNum: 0,
    totalStuNum: 0,
    stuSeekingForInterNum: 0,
    stuWaitingForResNum: 0,
    stuGotTheInterNum: 0
  }
  const [foreData, setForeData] = useState(initForeData);

  var totalComNum = state.company.length
  var activeComNum = 0;
  state.company.forEach(company => {
    if(company.ifActive) {
      activeComNum++;
    }
  });
  var totalStuNum = state.student.length
  var stuSeekingForInterNum = 0;
  var stuWaitingForResNum = 0;
  var stuGotTheInterNum = 0;


  function createCurData(category, value) {
    return { category, value };
  }
  
  const cunrrentInfoRows = [
    createCurData('Total student number', 159),
    createCurData('Students seeking for interviews', 237),
    createCurData('Students waiting for response', 262),
    createCurData('Students got the internship', 305),
    createCurData('Total active company number', 200),
  ];

  function createHisData(period, stuNum, comNum) {
    return { period, stuNum, comNum};
  }
  
  const historicalInfoRows = [
    createHisData('2018 Semester2', 30, 166),
    createHisData('2018 Summer Semester', 27, 171),
    createHisData('2019 Semester1', 30,110),
    createHisData('2019 Semester2', 25,132),
    createHisData('2019 Summer Semester', 36, 327),
  ];

  const regData = [[30,166], [27,171], [30,110], [25,132], [36, 327]]

  function handleForecast(){
    const result = regression.linear([[0, 1], [32, 67], [12, 79]]);
    const gradient = result.equation[0];
    const yIntercept = result.equation[1];
    console.log("forcasting gradient: ",gradient )
    console.log("forcasting yIntercept: ",yIntercept )

  }


  return (
    <Card align="left">
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Forecasting</h4>
        <p className={classes.cardCategoryWhite}>
          Forecast and specify the workload
        </p>
      </CardHeader>
      <CardBody>
      <div className={classes.title}>
          <h3 style={{margin: 0, padding: 0, textAlign: "center"}}>Current information</h3>
      </div>
      <div className={classes.table}>
        <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center" width="50%" style={{fontSize: '13pt'}}>Category</TableCell>
              <TableCell align="center" style={{fontSize: '13pt'}}>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cunrrentInfoRows.map((row) => (
              <TableRow key={row.name}>
                <TableCell  align="center" style={{fontSize: '12pt'}}>
                  {row.category}
                </TableCell>
                <TableCell align="center" style={{fontSize: '12pt'}}>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    <div className={classes.title}>
          <h3 style={{margin: 0, padding: 0, textAlign: "center"}}>Historical information</h3>
      </div>
      <div className={classes.table}>
        <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{fontSize: '13pt'}}>Period</TableCell>
              <TableCell align="center" style={{fontSize: '13pt'}}>Student number</TableCell>
              <TableCell align="center" style={{fontSize: '13pt'}}>Contacted company number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historicalInfoRows.map((row) => (
              <TableRow key={row.name}>
                <TableCell  align="center" style={{fontSize: '12pt'}}>{row.period}</TableCell>
                <TableCell align="center" style={{fontSize: '12pt'}}>{row.stuNum}</TableCell>
                <TableCell align="center" style={{fontSize: '12pt'}}>{row.comNum}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    <div className={classes.root}>
      <Grid container xs={12} sm={12} md={12} justify="center">
        <Card className={classes.foreCard}>
          <Grid item xs={12}>
          <CardHeader>The forecasting model contains internal and external influence factors. You can forecast the workload based on the info above with default parameters' value, or modify them to have different results.</CardHeader>
          </Grid>
              <CardBody className={classes.cardBody}>
                <Grid container xs={12} sm={12} md={12} justify="center" alignItems="stretch">
                  <Grid item xs={4}>
                    <TextField className={classes.cardItem}
                    label="Internal parameter"
                    defaultValue="1"
                    helperText="*Students study performance"
                    variant="filled"
                    ></TextField>
                    </Grid>
                    <Grid item xs={4}>
                    <TextField className={classes.cardItem}
                    defaultValue="1"
                    helperText="*The activeness of the job market "
                    variant="filled"></TextField>
                    </Grid>
                    <Grid item xs={4}>
                    <Button className={classes.button}>Forecast</Button>
                  </Grid>
                </Grid>
              </CardBody>
        </Card>
      </Grid>
      </div>
    {/* 
    TODO: 
    count the correct number
    add factor to the model
    generate result (with date)
    user can save (archive) it and check it anytime
    the result can be saved into the database
    */}
      {/* External intergreted page */}
        <Hidden only={["sm", "xs"]}>
                <iframe
                  className={classes.iframe}
                  src="https://www.stats.govt.nz/indicators/employment-rate/"
                  title="Icons iframe"
                  width="100%" height="500"
                >
                  <p>Your browser does not support iframes.</p>
                </iframe>
              </Hidden>
              <Hidden only={["lg", "md"]}>
                <GridItem xs={12} sm={12} md={6}>
                  <h5>
                    Try use Chrome to have full functionality. 
                  </h5>
                </GridItem>
        </Hidden>
        <div className={classes.root}>
          <Grid container xs={12} sm={12} md={12} justify="center">
            <Card className={classes.foreCard}>
              <Grid item xs={12}>
              <CardHeader>Archive a new period of internship seeking record:</CardHeader>
              </Grid>
                  <CardBody className={classes.cardBody}>
                    <Grid container xs={12} sm={12} md={12} justify="center">
                      <Grid item xs={3}>
                        <TextField className={classes.cardItem}
                        label="Period"
                        variant="filled"
                        ></TextField>
                        </Grid>
                        <Grid item xs={3}>
                        <TextField className={classes.cardItem}
                        label="Student number"
                        variant="filled"></TextField>
                        </Grid>
                        <Grid item xs={3}>
                        <TextField className={classes.cardItem}
                        label="Company number"
                        variant="filled"
                        ></TextField>
                        </Grid>
                        <Grid item xs={3}>
                        <Button className={classes.button}>Archive</Button>
                      </Grid>
                    </Grid>
                  </CardBody>
            </Card>
          </Grid>
          </div>
      </CardBody>
    </Card>
  );
}
