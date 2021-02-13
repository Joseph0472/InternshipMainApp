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
import { saveCom, loadCom, delCom, upCom, saveExcelCom } from '../../redux/reducers/companyReducer'


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

  var converData = {
    comName: "",
    listName: "",
    sdate: "",
    edate: ""
  }
  
  const readJson = (file) =>{
    const fileReader = new FileReader();
    fileReader.onloadend = ()=>{
       try{
          var obj = JSON.parse(fileReader.result);
          alert(obj.action.length," row of data detected.")

       }catch(e){
       }
      //  obj.action.forEach(arr => {
         
      //  });
    }
    if( file !== undefined)
       fileReader.readAsText(file);
 }

 //TODO: From here, adjust the CRUD by adding a parameter.
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
      dispatch(saveCom())
      setData([...data, ndata]);
    }
    dispatch(loadCom(userEmail))
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
    console.log(ndata)
    var restArr = state
    restArr.splice(tableID,1)
    console.log(restArr)
    for (let i = 0; i < restArr.length; i++) {
      console.log("comparing", ndata.companyName, restArr[i].companyName)
      if (ndata.companyName === restArr[i].companyName) {
        console.log("they are the same: ", ndata.companyName, restArr[i].companyName)
        allowToUp += 1;
      }
      console.log("allup: ", allowToUp)
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
      setData([...dataUpdate]);
    }
    if (allowToUp >= 1) {
      console.log(allowToUp)
      alert("Fail to update, only one company should exist.")
    }
  }
  dispatch(loadCom())
  }

  const addComViaExcel = () => {
    //TODO: This function should add company info row by row instead of import the whole list. 1st: check if there are already one with the same company name. 2nd: if yes, update; if no, insert.
    //TODO: All companies should be sent, companies with same cname should be overwrite.
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
            dispatch(deleteCom(originTableData, originTableData[k].tableData.id))
            dispatch(delCom(originTableData[originTableData[k].tableData.id]._id))
          }
        }
          dispatch(addCom(excelData[i]))
          dispatch(saveExcelCom())
          setData([...data, excelData[i]]);
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
    console.log(auth.email)
    if (!data[0]) {
      fetchCom() 
    }
  },[])

  function refresh() {
    window.location.reload()
  }

  //test
  function handleClick() {
    console.log(state)
    console.log(excelData)
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
              //setData([...dataUpdate]);
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
        Upload Excel File
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
              Are you sure to upload {excelData.length} rows of data? (Companies with same name will be overwrited)
            </DialogContentText>
            :
            <></>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
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