import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
import Done from "@material-ui/icons/Done";
import DateRange from "@material-ui/icons/DateRange";
import Sync from "@material-ui/icons/Sync";
import AccessTime from "@material-ui/icons/AccessTime";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SchoolIcon from '@material-ui/icons/School';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import Chart from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { loadCom } from '../../redux/reducers/companyReducer'
import { loadStu } from '../../redux/reducers/studentReducer'
import { getAllHisData} from '../../api/historicalData'
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Success from "components/Typography/Success";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";


const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const { useState } = React;
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth)
  const state = useSelector((state) => state)
  const [hisArr, setHisArr] = useState([])

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


  var companyNum = state.company.length;
  var activeCompNum = 0;
  var activeStuNum = 0;
  var employeedStuNum = 0;
  state.company.forEach(function(item,index){
       if(item.ifActive) {
         activeCompNum++;
       }
    });

  state.student.forEach(function(item,index) {
      if(item.stuState === 1 || item.stuState === 2){
        activeStuNum++;
      }
  });

  state.student.forEach(function(item,index) {
    if(item.stuState === 3){
      employeedStuNum++;
    }
  });
  
  var comAlert
  if(activeCompNum < activeStuNum){
    comAlert = true;
  } else {
    comAlert = false
  }

  const responseGoogle = (response) => {
    console.log(response);
  }

  const logout = () => {
    window.location.reload()
  }

  var emRate = (employeedStuNum/activeStuNum).toFixed(2)*100;

  Chart.defaults.global.defaultFontColor = "#fff";
  const fetchInfo = async () => {
    const company = await dispatch(loadCom(auth.email))
    const student = await dispatch(loadStu(auth.email))
    state.company = company
    state.student = student
  }

  useEffect(() => {
      fetchInfo()
      const hisdataP = new Promise((resolve, reject)=>{
        resolve(getAllHisData(auth.email))
      }).then((result)=>{
        console.log(result)
        setHisArr(result)
      })
  },[])

  console.log(hisArr)
// Conversion Rate
  var comArr = []
  var cRate = []
  var cNum = []
  var labels = hisArr.map((obj)=>{
    comArr.push(obj.period.substring(0,4))
    cRate.push((obj.stuNum/obj.comNum).toFixed(2)*100)
    cNum.push(obj.comNum)
  }
  )
  console.log(cRate)

  const conversionRateData = {
    labels: comArr,
    series: [cRate]
  }

// Companies Reached out
const comReachedOutData = {
  labels: comArr,
  series: [cNum]
}

//preference
var activeStuArr = []
state.student.forEach(student => {
  if (student.stuState !== 0 && student.stuState !== 3) {
    activeStuArr.push(student)
  }
});
var countArr = new Array(33).fill(0);
activeStuArr.forEach(student => {
  countArr[student.interest1]++
  countArr[student.interest2]++
});
var sortedArr = [...countArr].sort().reverse();
console.log(sortedArr)
console.log(countArr)
var fstPopInt = countArr.indexOf(sortedArr[0])
// var scdPopIndex = sortedArr[1]
// var thdPopIndex = sortedArr[2]
// for(let i=1; i<sortedArr.length; i++) {
//   if(sortedArr[i] === sortedArr[0]) {
//     scdPopIndex = i
//     break;
//   }
// }
// for(let j=scdPopIndex; j<sortedArr.length; j++) {
//   if(sortedArr[j] === sortedArr[scdPopIndex]) {
//     thdPopIndex = j
//     break;
//   }
// }
var secPopInt
var thdPopInt
if (sortedArr[0] === sortedArr[1]) {
  secPopInt = countArr.indexOf(sortedArr[1],countArr.indexOf(sortedArr[0])+1)
  if (sortedArr[1] === sortedArr[2]) {
    thdPopInt = countArr.indexOf(sortedArr[2],countArr.indexOf(sortedArr[1])+2)
  }
}
console.log(fstPopInt, secPopInt, thdPopInt)

const pData = {
  labels: [
lookup[fstPopInt], lookup[secPopInt], lookup[thdPopInt]
  ],
  datasets: [{
    data: [countArr[fstPopInt], countArr[secPopInt], countArr[thdPopInt]],
    backgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ]
  }]
};


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>corporate_fare</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Active Companies</p>
              <h3 className={classes.cardTitle}>{activeCompNum}/{companyNum}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {comAlert?                 
                <Danger>
                  <Warning />
                  More companies needed
                </Danger>
                :
                <Success>
                  <Done />
                  It looks good
                </Success>
                }
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="primary " stats icon>
              <CardIcon color="primary">
                <SchoolIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Active Students</p>
              <h3 className={classes.cardTitle}>{activeStuNum}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Current number
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>send</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Employment rate</p>
              <h3 className={classes.cardTitle}>{emRate}%</h3>
            </CardHeader>
            <CardFooter stats>
            <div className={classes.stats}>
                <Sync />
                Percentage of students got internship
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
        <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <PeopleAltIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Companies per student</p>
              <h3 className={classes.cardTitle}>{(activeCompNum/activeStuNum).toFixed(2)}</h3>
            </CardHeader>
            <CardFooter stats>
            <div className={classes.stats}>
                <Sync />
                Average status
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      {/* companies info */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={conversionRateData}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Conversion Rate</h4>
              <p className={classes.cardCategory}>
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> The percentage of companies on board out of total
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={comReachedOutData}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Companies Reach Out</h4>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Based on historical data
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
            <Pie data={pData} width={100} height={48} options={dailySalesChart.options} responsiveOptions={emailsSubscriptionChart.responsiveOptions}/>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Top 3 Companies' Interests</h4>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Based on current data 
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardBody>
              <img style={{height: "100%", width:"100%"}} src="https://storage-prtl-co.imgix.net/endor/organisations/9951/covers/1556122497_24111312_uoacoverimage.jpg?w=1920&h=550&fit=crop&auto=format,compress&q=40" />
            </CardBody>
          </Card>
        </GridItem>
    </div>
  );
}
