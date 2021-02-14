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
import Skeleton from 'react-loading-skeleton';
import { loadCom } from '../../redux/reducers/companyReducer' 
import { loadStu } from '../../redux/reducers/studentReducer'

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
  },
  loading: {
    width: "auto",
  }
};

const useStyles = makeStyles(styles);

export default function ForecastingPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth)
  const state = useSelector((state) => state)
  // console.log(state) //{company: Array(52), student: Array(24)}
  const [data, setData] = useState(0)

  const [foreData, setForeData] = useState({
    totalComNum: 0, 
    activeComNum: 0, 
    totalStuNum: 0, 
    stuSeekingForInterNum: 0, 
    stuWaitingForResNum: 0, 
    stuGotTheInterNum: 0,
  });

  const [foreRes, setForeRes] = useState({
    totalComNeed: 0,
    interestedCom: 0,
    onBoardCom: 0,
    fstPopularInt: 0,
    secPopularInt: 0,
    thdPopularInt: 0,
    comForFst: 0,
    comForSec: 0,
    comForThd: 0,

  })

  const [loading, setLoading] = useState(false)
  const [readyToShow, setReadyToShow] = useState(false)
  const [inPara, setInPara] = useState(5)
  const [exPara, setExPara] = useState(5)
  const [error, setErr] = useState(false)

  const lookup = {
    0: 'No Preference',
    1: 'AI/Machine Learning',
    2: 'Architercture Policy and Planning',
    3: 'Automation of Processes',
    4: 'Business Analytics',
    5: 'Blockchain',
    6: 'CCTV Analytics Build',
    7: 'Chatbots',
    8: 'Cloud',
    9: 'CMS',
    10: 'Consultancy',
    11: 'Data Analytics',
    12: 'Data Mining and Big Data',
    13: 'Data Visualisation',
    14: 'Databases',
    15: 'Development',
    16: 'Game Development',
    17: 'Graphics',
    18: 'Health Informatics',
    19: 'Information and Data Governanace',
    20: 'IoT Scoping',
    21: 'Statistical Modeling and Anlaysis by ML',
    22: 'Networking Security',
    23: 'Networking Services',
    24: 'Project Management',
    25: 'Robotics',
    26: 'Telecommunication',
    27: 'Testing/QA',
    28: 'UI/UX'
}

  function createCurData(category, value) {
    return { category, value };
  }
  
  const cunrrentInfoRows = [
    createCurData('Total student number', foreData.totalStuNum),
    createCurData('Students seeking for interviews', foreData.stuSeekingForInterNum),
    createCurData('Students waiting for response', foreData.stuWaitingForResNum),
    createCurData('Students got the internship', foreData.stuGotTheInterNum),
    createCurData('Total active company number', foreData.activeComNum),
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

  function createResultData(category, value) {
    return { category, value };
  }


  //TODO: Make it dynamic
  const hisData = [[30,166], [27,171], [30,110], [25,132], [36, 327]]

  function handleForecast(){
    console.log(foreData)
    const result = regression.linear(hisData);
    const gradient = result.equation[0];
    const yIntercept = result.equation[1];
    console.log("forcasting gradient: ",gradient )
    console.log("forcasting yIntercept: ",yIntercept)
    // M O D E L
    const predictedTotalCom = Math.ceil(gradient*foreData.totalStuNum + (5-inPara)*0.2*foreData.totalStuNum + (5-exPara)*0.2*foreData.totalStuNum + yIntercept) 
    const interestedComNum = Math.ceil(predictedTotalCom*0.14)
    const onBoardcomNum = Math.ceil(interestedComNum*0.81)
    // use a counter array to count the companies required.
    var countArr = new Array(29).fill(0);
    var activeStuArr = []
    state.student.forEach(student => {
      if (student.stuState !== 0 && student.stuState !== 3) {
        activeStuArr.push(student)
      }
    });
    console.log(activeStuArr)
    activeStuArr.forEach(student => {
      countArr[student.interest1]++
    });
    var sortedArr = [...countArr].sort().reverse();
    var fstPopInt = countArr.indexOf(sortedArr[0])
    var secPopInt = countArr.indexOf(sortedArr[1])
    var thdPopInt = countArr.indexOf(sortedArr[2])
  
    var activeStuNum = foreData.stuSeekingForInterNum + foreData.stuWaitingForResNum

    var comForFNum = Math.ceil(sortedArr[0]/activeStuNum * predictedTotalCom)
    //console.log(lookup[fstPopInt]) worked
    console.log(predictedTotalCom)
    console.log(comForFNum)//TODO: fix the relation here
    var comForSNum = Math.ceil(sortedArr[1]/activeStuNum * predictedTotalCom)
    var comForTNum = Math.ceil(sortedArr[2]/activeStuNum * predictedTotalCom)
    
    setForeRes({...foreRes, totalComNeed: predictedTotalCom, interestedCom: interestedComNum, onBoardCom: onBoardcomNum, fstPopularInt: fstPopInt, secPopularInt: secPopInt, thdPopularInt: thdPopInt, comForFst: comForFNum,comForSec: comForSNum, comForThd: comForTNum})
    console.log(foreRes)

    if (predictedTotalCom < 0) {
      alert("Fail: Can't proceed the forecasting, please get more active companies.")
      window.location.reload()
    }
    setReadyToShow(false)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setReadyToShow(true)
    }, 2000)

  }

  const resultRows = [
    createResultData("Total number of companies need to be reached out", foreRes.totalComNeed),
    createResultData("Number of companies would be interested at next stage", foreRes.interestedCom),
    createResultData("Number of companies would be on board", foreRes.onBoardCom),
    createResultData("Companies with these interests are mainly required", lookup[foreRes.fstPopularInt]+", "+lookup[foreRes.secPopularInt]+", "+lookup[foreRes.thdPopularInt]),
    createResultData("Companies interested in "+lookup[foreRes.fstPopularInt]+" need to be reach out", foreRes.comForFst),
    createResultData("Companies interested in "+lookup[foreRes.secPopularInt]+" need to be reach out", foreRes.comForSec),
    createResultData("Companies interested in "+lookup[foreRes.thdPopularInt]+" need to be reach out", foreRes.comForThd)
    //custmized colum name
  ]

  
  const fetchInfo = async () => {
    const company = await dispatch(loadCom(auth.email))
    const student = await dispatch(loadStu(auth.email))
    state.company = company
    state.student = student
  }
  
  useEffect(() => {
      fetchInfo()
    // Load Data
       var totalCom = state.company.length
       var activeCom = 0;
       state.company.forEach(company => {
         if(company.ifActive) {
           activeCom++;
         }
       });
       var totalStu = state.student.length
       //0: 'Not active', 1: 'Seeking for Interviews', 2: 'Waiting for Response', 3: 'Got the Internship'
       var stuSeekingForInter = 0;
       state.student.forEach(student => {
         if(student.stuState === 1) {
           stuSeekingForInter++;
         }
       });
       var stuWaitingForRes = 0;
       state.student.forEach(student => {
         if(student.stuState === 2) {
           stuWaitingForRes++;
         }
       });
       var stuGotTheInter = 0;
       state.student.forEach(student => {
         if(student.stuState === 3) {
           stuGotTheInter++;
         }
       });
       setForeData({...foreData, totalComNum: totalCom, activeComNum: activeCom, totalStuNum: totalStu, stuSeekingForInterNum: stuSeekingForInter, stuWaitingForResNum: stuWaitingForRes, stuGotTheInterNum: stuGotTheInter})
  },[])

  function handleInPara(e) {
    if (e.target.value < 1 || e.target.value > 10) {
      setErr(true)
    } else {
      setInPara(e.target.value)
      setErr(false)
    }
  }
  function handleExPara(e) {
    if (e.target.value < 1 || e.target.value > 10) {
      setErr(true)
    } else {
      setExPara(e.target.value)
      setErr(false)
    }
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
          <CardHeader>The forecasting model contains internal and external influence factors. You can forecast the workload based on the info above with default parameters' value, or modify them to have different results. NOTE: The parameters' value range is from 1 to 10, 1 stands for pessimistic and 10 stands for optimistic.</CardHeader>
          </Grid>
              <CardBody className={classes.cardBody}>
                <Grid container xs={12} sm={12} md={12} justify="center" alignItems="stretch">
                  <Grid item xs={4}>
                    <TextField className={classes.cardItem}
                    label="Internal parameter"
                    defaultValue="5"
                    variant="filled"
                    type="number"
                    error={error}
                    helperText={error?"Invalid parameter value":"*Students study performance"}
                    onChange={(e)=>handleInPara(e)}
                    ></TextField>
                    </Grid>
                    <Grid item xs={4}>
                    <TextField className={classes.cardItem}
                    label="External parameter"
                    defaultValue="5"
                    type="number"
                    variant="filled"
                    error={error}
                    helperText={error?"Invalid parameter value":"*The activeness of the job market"}
                    onChange={handleExPara}
                    ></TextField>
                    </Grid>
                    <Grid item xs={4}>
                    <Button className={classes.button} onClick={handleForecast} disabled={error} >Forecast</Button>
                  </Grid>
                </Grid>
              {loading &&
                <div className={classes.loading}>
                  <Skeleton count={10}/>
                </div>
              }
              {readyToShow && 
                    <div className={classes.table}>
                    <TableContainer component={Paper}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" width="50%" style={{fontSize: '13pt'}}>Predict Field</TableCell>
                          <TableCell align="center" style={{fontSize: '13pt'}}>Result</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {resultRows.map((row) => (
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
              }
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
