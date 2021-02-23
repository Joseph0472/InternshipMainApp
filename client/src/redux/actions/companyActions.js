import {
    ADD_COM_VIA_EXCEL,
    CREATE_COMPANY,
    SET_COMPANIES,
    DELETE_COMPANY,
    UPDATE_COMPANY
} from './action-types'

export const addCom = (ndata, uEmail) => {
    return {
        type: CREATE_COMPANY,
        payload: {
            userEmail: uEmail,
            companyName: ndata.companyName,
            cPersonName: ndata.cPersonName,
            email: ndata.email,
            ifActive: ndata.ifActive,
            listName: ndata.listName,
            sdate: ndata.sdate,
            edate: ndata.edate,
            interest1: ndata.interest1,
            interest2: ndata.interest2,
            interest3: ndata.interest3,
        }
    }
}

export const setCom = (coms) => {
    return {
        type: SET_COMPANIES,
        payload: coms
    }
}

export const deleteCom = (comList, index) => {
    return {
        type: DELETE_COMPANY,
        payload: {
          id: comList[index]._id,
          companyName: comList[index].companyName,
        }
    }
}


export const updateCom = (ndata, tableID) => {
    return {
        type: UPDATE_COMPANY,
        payload: {
            index: tableID,
            companyName: ndata.companyName,
            cPersonName: ndata.cPersonName,
            email: ndata.email,
            ifActive: ndata.ifActive,
            listName: ndata.listName,
            sdate: ndata.sdate,
            edate: ndata.edate,
            interest1: ndata.interest1,
            interest2: ndata.interest2,
            interest3: ndata.interest3,
        }
      }
}

export const addComViaExcelFile = (excelData) => {
    return {
        type: ADD_COM_VIA_EXCEL,
        payload: {
            filedata: excelData
          }
    }
}