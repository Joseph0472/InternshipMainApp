import {
    LOAD_COMPANIES_LOADING,
    LOAD_COMPANIES_SUCCESS,
    LOAD_COMPANIES_ERROR,
    CREATE_COMPANY,
    SET_COMPANIES,
    DELETE_COMPANY,
} from './action-types'

export const addCom = (ndata) => {
    return {
        type: CREATE_COMPANY,
        payload: {
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

export const updateCom = (ndata) => {
    console.log("updating")
    return {
        type: "UPDATE_COMPANY",
        payload: {
            index: ndata.tableData.id,
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

// export const addComViaExcelFile

export function loadCompaniesLoading() {
    return {
        type: LOAD_COMPANIES_LOADING
    }
}

export function loadCompaniesSuccess(companies) {
    return {
        type: LOAD_COMPANIES_SUCCESS,
        companies
    }
}

export function loadCompaniesError(err) {
    return {
        type: LOAD_COMPANIES_ERROR,
        err
    }
}