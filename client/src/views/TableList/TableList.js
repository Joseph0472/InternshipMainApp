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
import { useSelector, useDispatch } from "react-redux";
import XLSX from 'xlsx'
import { addCom, deleteCom, updateCom, addComViaExcelFile } from '../../redux/actions/companyActions'
import { saveCom, loadCom, delCom, upCom, saveExcelCom, deleteAllCom } from '../../redux/reducers/companyReducer'
import json2xls from 'json2xls'
import exportFromJSON from 'export-from-json'
import { object } from "prop-types";
import LinearProgress from '@material-ui/core/LinearProgress';



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

export default function CompanyList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth)
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
  ]);
  
  var [data, setData] = useState(state);

  const [open, setOpen] = React.useState(false);

  const [delOpen, setDelOpen] = useState(false);

  const [waiting, setWaiting] = useState(false)


  const readExcel = (file) => {
    const promise = new Promise((res, rej) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        try {
        const bufferArray = e.target.result;
        
        const wb = XLSX.read(bufferArray, {type: 'buffer'});

        const wsname = wb.SheetNames[0];
        
        console.log(wsname)

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
        //rej(error);
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

  var recArr = []
  var exportArr = []
                      
  function createRec(listName, cardName, cDate) {
    var objR = new Object()
    objR.listName = listName
    objR.cardName = cardName
    objR.cDate = cDate
    return objR
  }
  function createThis(listName, cardName, sDate, eDate) {
    var objT = new Object()
    objT.listName = listName
    objT.cardName = cardName
    objT.sDate = sDate
    objT.eDate = eDate
    return objT
  }
  
  const readJson = (file) =>{
    var commentInfoArr = []
    const promise = new Promise((res, rej) => {
    const fileReader = new FileReader();
    fileReader.onloadend = ()=>{
       try{
          var obj = JSON.parse(fileReader.result);
          console.log(obj)

          obj.actions.forEach(act => {
            if (act.type === "commentCard") {
              commentInfoArr.push(act)
            }
          });
          alert(commentInfoArr.length+" rows of data detected.")
          res(commentInfoArr)
       }catch(e){
          alert(e)
       }
    }
    if( file !== undefined)
       fileReader.readAsText(file);
      });

    promise.then((infoArr)=>{
      var obj = createRec(infoArr[0].data.list.name, infoArr[0].data.card.name, infoArr[0].date.substring(0,10))
      infoArr.forEach(act => {
        recArr.push(createRec(act.data.list.name, act.data.card.name, act.date.substring(0,10)))      
      });
      console.log(recArr)

      //early date late date
      for(let i = 0; i<recArr.length; i++) {
        var thisSdate, thisEdate, thisCardN, thisListN
        thisListN = recArr[i].listName
        thisCardN = recArr[i].cardName
        if (recArr[i+1]) {
          // solving sdate problem
          if(recArr[i+1].cardName === thisCardN) { //if it's in same card
            if (recArr[i].cDate !== recArr[i+1].cDate) {
              thisSdate = recArr[i].cDate
            }
          } else {
            thisEdate = recArr[i].cDate
            console.log("list: ",thisListN,"card: ", thisCardN,"date: ", thisSdate, thisEdate)
            exportArr.push(createThis(thisListN, thisCardN, thisSdate, thisEdate))
            thisSdate = recArr[i+1].cDate
          }
        //==================
        }
      }

      var date = new Date()
      var dateStr = date.toLocaleDateString()
      var downLoadWB = XLSX.utils.book_new()
      var downLoadWS = XLSX.utils.json_to_sheet(exportArr)
      XLSX.utils.book_append_sheet(downLoadWB, downLoadWS)
      XLSX.writeFile(downLoadWB, dateStr+"_TrelloData.xlsx")
      
    })

    // console.log(commentInfoArr)
    // commentInfoArr.forEach(act => {
    //   console.log(act.date)
    // });
 }

 //TODO: From here, adjust the CRUD by adding a parameter. DONE
  const addCompany = (ndata, userEmail) => {
    var allowToAdd = true
    for (let i = 0; i < state.length; i++) {
      if (ndata.companyName === state[i].companyName) {
        alert("Fail to add company, this company already exists.")
        allowToAdd = false
      }
    }
    if (allowToAdd) {
      dispatch(addCom(ndata, userEmail))
      dispatch(saveCom(userEmail))
      setData([...data, ndata]);
    }
    dispatch(loadCom(auth.email))
  }

  const deleteCompany = (comList, index) => {
    dispatch(deleteCom(comList, index))
    dispatch(delCom(comList[index]._id))
    alert("Company removed.")
  }

  const updateCompany = (ndata, tableID) => {
    var ifNew = false
    var allowToUp = 0

    //if modified to a new company
    for (let i = 0; i < state.length; i++) {
      if (ndata.companyName === state[i].companyName) {
        ifNew = true;
      }
    }
    //if duplicated
    // console.log(ndata)
    var restArr = state
    restArr.splice(tableID,1)
    console.log(restArr)
    for (let i = 0; i < restArr.length; i++) {
      // console.log("comparing", ndata.companyName, restArr[i].companyName)
      if (ndata.companyName === restArr[i].companyName) {
        // console.log("they are the same: ", ndata.companyName, restArr[i].companyName)
        allowToUp += 1;
      }
      // console.log("allup: ", allowToUp)
    }
    if (!ifNew) {
      alert("Fail to update, target company doesn't exist.")
    } else {
    if (allowToUp === 0) {
      console.log(allowToUp, ndata)
      const dataUpdate = [...data];
      const index = tableID;
      dataUpdate[index] = ndata;
      dispatch(updateCom(ndata, tableID))
      dispatch(upCom(ndata))
      //setData([...dataUpdate]);
    }
    if (allowToUp >= 1) {
      console.log(allowToUp)
      alert("Fail to update, only one company should exist.")
    }
  }
  dispatch(loadCom(auth.email))
  }

  const addComViaExcel = async () => {
    //TODO: This function should add company info row by row instead of import the whole list. 1st: check if there are already one with the same company name. 2nd: if yes, update; if no, insert.
    //TODO: All companies should be sent, companies with same cname should be overwrite.
    setWaiting(true)
      var originTableData = data
      var i = 0;
      // Check imported data array
      for( i; i<excelData.length; i++) {
        //com to import: excelData[i]

        //check if it's duplicated
        for(let k = 0 ; k < data.length; k++){
          //console.log("comparing: ",excelData[i].companyName," and ",data[k].companyName )
          if(excelData[i].companyName === data[k].companyName) {
            //remove it from data
            // console.log("duplicated one: ",excelData[i])
            // console.log(originTableData, originTableData[k].tableData.id)
            // console.log(originTableData[originTableData[k].tableData.id]._id)
            await dispatch(deleteCom(originTableData, originTableData[k].tableData.id))
            dispatch(delCom(originTableData[originTableData[k].tableData.id]._id))
          }
        }
          await dispatch(addCom(excelData[i], auth.email))
          await dispatch(saveExcelCom(auth.email))
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
      fetchCom() 
    }
  },[])

  function refresh() {
    window.location.reload()
  }

  function downLoadTable () {
    var date = new Date()
    var dateStr = date.toLocaleDateString()
    var downLoadWB = XLSX.utils.book_new()
    var downLoadWS = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(downLoadWB, downLoadWS)
    XLSX.writeFile(downLoadWB, dateStr+"_CompanyInfo.xlsx")
  }

  function handleClick() {
    downLoadTable()
  }

  async function handleDelAll() {
    setWaiting(true)
    downLoadTable()
    await dispatch(deleteAllCom(data, auth.email))
    window.location.reload()
  }

  const handleDelClose = () => {
    setDelOpen(false)
  }

  const fetchCom = async () => {
    const company = await dispatch(loadCom(auth.email))
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
              addCompany(newData, auth.email);
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
              updateCompany(newData, index)
              resolve();
            }, 1000)
          }),
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
        variant="contained"
        color="info"
        component="label"
        >
        Get Conversation Info From Trello File
        <input
          type="file"
          accept="application/JSON"
          onChange = {(e)=>{
            const file = e.target.files[0];
            readJson(file);
          }}
          hidden
        />
        </Button>
        <Button 
                color="danger"
                onClick={()=>setDelOpen(true)}>
          Delete All
        </Button>

{/* Excel upload dialog */}
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
            <Button color="primary" onClick={addComViaExcel} disabled={waiting} autoFocus>
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