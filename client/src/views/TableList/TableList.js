import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import MaterialTable from 'material-table'
import Button from "components/CustomButtons/Button.js";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import readXlsxFile from 'read-excel-file';
import XLSX from 'xlsx'
import { addCom, deleteCom, updateCom } from '../../redux/actions/companyActions'

import {loadCompanies} from '../../redux/actions/thunks/index'
import { saveCom, loadCom, delCom } from '../../redux/reducers/companyReducer'

// MaterialTable ref: https://material-table.com/#/
// TODO: Add the full object to dispatch and reducer DONE
//       Finish the other three dispatch function, DONE
//       Duplicated them to student table, DONE
//       Backend, DONE
//       Dashboard modi, DONE
//       DB...DONE
//       Standarize structure

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

export default function TableList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.company)

  const [excelData, setExcelData] = useState()

  const [columns, setColumns] = useState([
    { title: 'Company Name', field: 'companyName' },
    { title: 'Contact Person', field: 'cPersonName'},
    { title: 'Contact Email', field: 'email'},
    { title: 'If Active', field: 'ifActive', type: 'boolean'},
    { title: 'List Name', field: 'listName'},
    { title: 'Convo start date', field: 'sdate', type: 'date'},
    { title: 'Convo end date', field: 'edate', type: 'date'},   
    {
      title: 'First Interest',
      field: 'interest1',
      lookup: {
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
    },
    },
    {
      title: 'Second Interest',
      field: 'interest2',
      lookup: {
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
    },
    },
    {
      title: 'Third Interest',
      field: 'interest3',
      lookup: {
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
    },
    },
  ]);
  
  var [data, setData] = useState(state);

  const [open, setOpen] = React.useState(false);


  const readExcel = (file) => {
    const promise = new Promise((res, rej) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        
        const wb = XLSX.read(bufferArray, {type: 'buffer'});

        const wsname = wb.SheetNames[0];
        
        const ws=wb.Sheets[wsname];

        const eData = XLSX.utils.sheet_to_json(ws)

        res(eData)
      };

      fileReader.onerror=(error) => {
        rej(error);
      };
    });

    promise.then((d)=>{
      console.log(d)
      setOpen(true)
      setExcelData(d);
    })
  }

  const readJson = (file) =>{
    const fileReader = new FileReader();
    fileReader.onloadend = ()=>{
       try{
          var obj = JSON.parse(fileReader.result);
          console.log(obj)
       }catch(e){
       }
    }
    if( file !== undefined)
       fileReader.readAsText(file);
 }

  const addCompany = (ndata) => {
    dispatch(addCom(ndata))
    dispatch(saveCom())
    dispatch(loadCom())
  }

  const deleteCompany = (comList, index) => {
    dispatch(deleteCom(comList, index))
    dispatch(delCom(comList[index]._id))
  }

  const updateCompany = (ndata) => {
    dispatch(updateCom(ndata))
  }

  const addComViaExcel = () => {
    //TODO: This function should add company info row by row instead of import the whole list. 1st: check if there are already one with the same company name. 2nd: if yes, update; if no, insert.

    dispatch({
      type: "ADD_COM_VIA_EXCEL",
      payload: {
        filedata: excelData
      }
    })
    setOpen(false)
  }

  function refreshPage() {
    window.location.reload(false);
  }


  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(data[0])
    if (!data[0]) {
      fetchCom() 
    }
  },[])

  //test
  function handleClick() {
    console.log(state)
  }

  const fetchCom = async () => {
    const company = await dispatch(loadCom())
    setData(company)
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Companies List</h4>
            <p className={classes.cardCategoryWhite}>
              Detailed companies information
            </p>
          </CardHeader>
          <CardBody>
    <MaterialTable
      title=""
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);
              addCompany(newData);
              resolve();
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              updateCompany(newData)
              resolve();
            }, 1000)
          }).then(console.log(newData)),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
              deleteCompany(state ,index);
              resolve()
            }, 1000)
          }),
      }}
    />
          </CardBody>
        </Card>
        <Button
        variant="contained"
        color="primary"
        component="label"
        >
        Upload Excel File
        <input
          type="file"
          onChange = {(e)=>{
            const file = e.target.files[0];
            readExcel(file);
          }}
          hidden
        />
        </Button>
        <Button
        variant="contained"
        color="info"
        component="label"
        >
        Upload Json File frim Trello
        <input
          type="file"
          onChange = {(e)=>{
            const file = e.target.files[0];
            readJson(file);
          }}
          hidden
        />
        </Button>
        <Button onClick={handleClick}>
          getAllCompany
        </Button>

          <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Data from Excel Detected!"}</DialogTitle>
          <DialogContent>
            {excelData != null ?
            <DialogContentText id="alert-dialog-description">
              Are you sure to upload {excelData.length} rows of data?
            </DialogContentText>
            :
            <></>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={refreshPage} color="primary">
              No
            </Button>
            <Button color="primary" onClick={addComViaExcel} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>

      </GridItem>
    </GridContainer>
  );
}