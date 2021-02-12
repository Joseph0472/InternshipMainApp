import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import Done from "@material-ui/icons/Done";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Sync from "@material-ui/icons/Sync";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { bugs, website, server } from "variables/general.js";
import { useSelector } from "react-redux";
import GoogleLogin from 'react-google-login';
import GoogleLogout from 'react-google-login';
import Chart from 'chart.js';
import { Doughnut } from 'react-chartjs-2';



import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Success from "components/Typography/Success";

const useStyles = makeStyles(styles);

// TODO: All data should be accordingly.

export default function Dashboard() {
  const classes = useStyles();
  const { useState } = React;
  const state = useSelector((state) => state)

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
      if(item.state !== 0){
        activeStuNum++;
      }
  });

  state.student.forEach(function(item,index) {
    if(item.state == 3){
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

  const pData = {
    labels: [
      'BA',
      'Test',
      'Dev'
    ],
    datasets: [{
      data: [300, 50, 100],
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

  const pieData = {
    series:[
      {
        value:20,
        name:"S1"
      },
      {
        value:20,
        name:"S1"
      },
      {
        value:60,
        name:"S1"
      }
    ]
  }
  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>corporate_fare</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Active Company</p>
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
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>group</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Active Students</p>
              <h3 className={classes.cardTitle}>{activeStuNum}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Current number of active students
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>send</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Employment rate</p>
              <h3 className={classes.cardTitle}>{emRate}%</h3>
            </CardHeader>
            <CardFooter stats>
            <div className={classes.stats}>
                <Sync />
                Percentage of employed students
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
        <Doughnut data={pData} />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
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
                <AccessTime /> Updated 4 Minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
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
                <AccessTime /> Campaign Sent 2 Days Ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
            <Doughnut data={pData} />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Pie</h4>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Campaign Sent 2 Days Ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
