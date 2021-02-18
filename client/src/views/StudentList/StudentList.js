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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import XLSX from 'xlsx'
import { addStu, deleteStu, updateStu, addStuViaExcelFile } from '../../redux/actions/studentActions'
import { saveStu, loadStu, delStu, upStu, saveExcelStu, deleteAllStu } from '../../redux/reducers/studentReducer'
import LinearProgress from '@material-ui/core/LinearProgress';


// MaterialTable ref: https://material-table.com/#/
// TODO: Add the full object to dispatch and reducer DONE
//       Finish the other three dispatch function, DONE
//       Duplicated them to student table (id should be implemted well)
//       Backend, DB...
//       Forecasting: using 

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
  const { useState } = React;
  const dispatch = useDispatch();
  const [delOpen, setDelOpen] = useState(false);
  const [waiting, setWaiting] = useState(false)



  const [columns, setColumns] = useState([
    { title: 'Student Name', field: 'studentName' },
    { title: 'Email', field: 'email'},
    {
      title: 'State',
      field: 'stuState',
      lookup: { 0: 'Not active', 1: 'Seeking for Interviews', 2: 'Waiting for Response', 3: 'Got the Internship'},
    }, 
    {
      title: 'First Interest',
      field: 'interest1',
      lookup: {
        0: 'No Preference',
        1: 'Accounting',
        2: 'AI/Machine Learning',
        3: 'Architercture Policy and Planning',
        4: 'Automation of Processes',
        5: 'Business Analytics',
        6: 'Blockchain',
        7: 'CCTV Analytics Build',
        8: 'Chatbots',
        9: 'Cloud',
        10: 'CMS',
        11: 'Consultancy',
        12: 'Data Analytics',
        13: 'Data Mining and Big Data',
        14: 'Data Visualisation',
        15: 'Databases',
        16: 'Development',
        17: 'Game Development',
        18: 'Graphics',
        19: 'Health Informatics',
        20: 'Human Resources',
        21: 'Information and Data Governanace',
        22: 'International Business',
        23: 'IoT Scoping',
        24: 'Statistical Modeling and Anlaysis by ML',
        25: 'Marketing',
        26: 'Networking Security',
        27: 'Networking Services',
        28: 'Project Management',
        29: 'Robotics',
        30: 'Telecommunication',
        31: 'Testing/QA',
        32: 'UI/UX'
    },
    },
    {
      title: 'Second Interest',
      field: 'interest2',
      lookup: {
        0: 'No Preference',
        1: 'Accounting',
        2: 'AI/Machine Learning',
        3: 'Architercture Policy and Planning',
        4: 'Automation of Processes',
        5: 'Business Analytics',
        6: 'Blockchain',
        7: 'CCTV Analytics Build',
        8: 'Chatbots',
        9: 'Cloud',
        10: 'CMS',
        11: 'Consultancy',
        12: 'Data Analytics',
        13: 'Data Mining and Big Data',
        14: 'Data Visualisation',
        15: 'Databases',
        16: 'Development',
        17: 'Game Development',
        18: 'Graphics',
        19: 'Health Informatics',
        20: 'Human Resources',
        21: 'Information and Data Governanace',
        22: 'International Business',
        23: 'IoT Scoping',
        24: 'Statistical Modeling and Anlaysis by ML',
        25: 'Marketing',
        26: 'Networking Security',
        27: 'Networking Services',
        28: 'Project Management',
        29: 'Robotics',
        30: 'Telecommunication',
        31: 'Testing/QA',
        32: 'UI/UX'
    },
    },
    {
      title: 'Third Interest',
      field: 'interest3',
      lookup: {
        0: 'No Preference',
        1: 'Accounting',
        2: 'AI/Machine Learning',
        3: 'Architercture Policy and Planning',
        4: 'Automation of Processes',
        5: 'Business Analytics',
        6: 'Blockchain',
        7: 'CCTV Analytics Build',
        8: 'Chatbots',
        9: 'Cloud',
        10: 'CMS',
        11: 'Consultancy',
        12: 'Data Analytics',
        13: 'Data Mining and Big Data',
        14: 'Data Visualisation',
        15: 'Databases',
        16: 'Development',
        17: 'Game Development',
        18: 'Graphics',
        19: 'Health Informatics',
        20: 'Human Resources',
        21: 'Information and Data Governanace',
        22: 'International Business',
        23: 'IoT Scoping',
        24: 'Statistical Modeling and Anlaysis by ML',
        25: 'Marketing',
        26: 'Networking Security',
        27: 'Networking Services',
        28: 'Project Management',
        29: 'Robotics',
        30: 'Telecommunication',
        31: 'Testing/QA',
        32: 'UI/UX'
    },
    },
    { title: 'Note', field: 'note'},
  ]);

  const [open, setOpen] = React.useState(false);

  const [excelData, setExcelData] = useState()
  const auth = useSelector((state) => state.auth)
  const state = useSelector((state) => state.student)
  
  var [data, setData] = useState(state);

  var [allowToUp, setAllowToUp] = useState(0)

  //console.log(state)  // A student array

  const readExcel = (file) => {
    const promise = new Promise((res, rej) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        try {
        const bufferArray = e.target.result;
        
        const wb = XLSX.read(bufferArray, {type: 'buffer'});

        const wsname = wb.SheetNames[0];
        
        const ws=wb.Sheets[wsname];

        const eData = XLSX.utils.sheet_to_json(ws)

        console.log(eData)

        res(eData)
      } catch (err) {
        alert("Error, you may uploaded a file with wrong type or format, please check again.", err)
        window.location.reload()
      }
      };

      fileReader.onerror=(error) => { 
        alert("Error") 
        window.location.reload()
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

  const addStudent = (ndata, userEmail) => {
    var allowToAdd = true
    for (let i = 0; i < state.length; i++) {
      if (ndata.studentName === state[i].studentName) {
        alert("Fail to add student, this student already exists.")
        allowToAdd = false
      }
    }
    if (allowToAdd) {
      dispatch(addStu(ndata, userEmail))
      dispatch(saveStu(userEmail))
      setData([...data, ndata]);
    }
    dispatch(loadStu(auth.email))
  }

  const deleteStudent = (stuList, index) => {
    dispatch(deleteStu(stuList, index))
    dispatch(delStu(stuList[index]._id))
    alert("Student removed.")
  }

  const updateStudent = (ndata, tableID) => {
    var ifNew = false
    var allowToUp = 0

    //if modified to a new student
    for (let i = 0; i < state.length; i++) {
      if (ndata.studentName === state[i].studentName) {
        ifNew = true;
      }
    }
    //if duplicated
    console.log(ndata)
    var restArr = state
    restArr.splice(tableID,1)
    console.log(restArr)
    for (let i = 0; i < restArr.length; i++) {
      if (ndata.studentName === restArr[i].studentName) {
        allowToUp += 1;
      }
      //console.log("allup: ", allowToUp)
    }
    if (!ifNew) {
      alert("Fail to update, target student doesn't exist.")
    } else {
    if (allowToUp === 0) {
      const dataUpdate = [...data];
      const index = tableID;
      dataUpdate[index] = ndata;
      dispatch(updateStu(ndata, tableID))
      dispatch(upStu(ndata))
      setAllowToUp(0)
    }
    if (allowToUp >= 1) {
      console.log(allowToUp)
      alert("Fail to update, only one student should exist.")
      //setAllowToUp(0)

    }
  }
  dispatch(loadStu(auth.email))
  //setAllowToUp(0)
  }

  const addStuViaExcel = async () => {
    //TODO: This function should add student info row by row instead of import the whole list. 1st: check if there are already one with the same student name. 2nd: if yes, update; if no, insert.
    //TODO: All students should be sent, students with same cname should be overwrite.
    setWaiting(true)
    var originTableData = data
    var i = 0;
      // Check imported data array
      for( i; i<excelData.length; i++) {
        //com to import: excelData[i]

        //check if it's duplicated
        for(let k = 0 ; k < data.length; k++){
          //console.log("comparing: ",excelData[i].studentName," and ",data[k].studentName )
          if(excelData[i].studentName === data[k].studentName) {
            //remove it from data
            // console.log("duplicated one: ",excelData[i])
            // console.log(originTableData, originTableData[k].tableData.id)
            // console.log(originTableData[originTableData[k].tableData.id]._id)
            await dispatch(deleteStu(originTableData, originTableData[k].tableData.id))
            dispatch(delStu(originTableData[originTableData[k].tableData.id]._id))
          }
        }
          await dispatch(addStu(excelData[i], auth.email))
          await dispatch(saveExcelStu(auth.email))
          //setData([...data, excelData[i]]);
      }
    //console.log("data: ",data)
    alert("Excel data imported.")
    window.location.reload()
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false);
    setExcelData([]);
  };

  useEffect(() => {
    if (!data[0]) {
      fetchStu() 
    }
  },[])

  function refresh() {
    window.location.reload()
  }

  function downLoadTable() {
    var date = new Date()
    var dateStr = date.toLocaleDateString()
    var downLoadWB = XLSX.utils.book_new()
    var downLoadWS = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(downLoadWB, downLoadWS)
    XLSX.writeFile(downLoadWB, dateStr+"_StudentInfo.xlsx")
  }

  function handleClick() {
    downLoadTable()
  }

  async function handleDelAll() {
    setWaiting(true)
    downLoadTable()
    await dispatch(deleteAllStu(data, auth.email))
    window.location.reload()
  }

  const handleDelClose = () => {
    setDelOpen(false)
  }

  const fetchStu = async () => {
    const student = await dispatch(loadStu(auth.email))
    setData(student)
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Students List</h4>
            <p className={classes.cardCategoryWhite}>
              Detailed students information
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
              addStudent(newData, auth.email);
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
              updateStudent(newData, index)
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
              deleteStudent(state ,index);
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
        Import Excel Info
        <input
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange = {(e)=>{
            const file = e.target.files[0];
            readExcel(file);
          }}
          hidden
        />
        </Button>
        <Button 
                color="primary"
                onClick={handleClick}>
          Download Table
        </Button>
        <Button 
                color="danger"
                onClick={()=>setDelOpen(true)}>
          Delete All
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
              Are you sure to upload {excelData.length} rows of data? (Companies with same name will be overwrited)
              {waiting?<LinearProgress />:<></>}
            </DialogContentText>
            :
            <></>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={waiting} color="primary">
              No
            </Button>
            <Button color="primary" onClick={addStuViaExcel} disabled={waiting} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
                {/* Delete all dialog */}
                <Dialog
          open={delOpen}
          onClose={handleDelClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Data from Excel Detected!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to DELETE ALL? If so, all data will be downloaded as the backup, and then removed.
              {waiting?<LinearProgress />:<></>}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDelClose} disabled={waiting} color="primary">
              No
            </Button>
            <Button color="primary" onClick={handleDelAll} disabled={waiting} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>        
      </GridItem>
    </GridContainer>
  );
}