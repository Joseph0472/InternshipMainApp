import {
    CREATE_STUDENT,
    SET_STUDENTS,
    DELETE_STUDENT,
    UPDATE_STUDENT,
    ADD_STU_VIA_EXCEL
} from '../actions/action-types'

export const addStu = (ndata, uEmail) => {
    return {
        type: CREATE_STUDENT,
        payload: {
            userEmail: uEmail,
            studentName: ndata.studentName,
            email: ndata.email,
            stuState: ndata.stuState,
            interest1: ndata.interest1,
            interest2: ndata.interest2,
            interest3: ndata.interest3,
            note: ndata.note
        }
    }
}

export const setStu = (stus) => {
    return {
        type: SET_STUDENTS,
        payload: stus
    }
}

export const deleteStu = (stuList, index) => {
    return {
        type: DELETE_STUDENT,
        payload: {
          id: stuList[index]._id,
          studentName: stuList[index].studentName,
        }
    }
}

export const updateStu = (ndata, tableID) => {
    return {
        type: UPDATE_STUDENT,
        payload: {
            index: tableID,
            studentName: ndata.studentName,
            email: ndata.email,
            stuState: ndata.stuState,
            interest1: ndata.interest1,
            interest2: ndata.interest2,
            interest3: ndata.interest3,
            note: ndata.note
        }
      }
}

export const addStuViaExcelFile = (excelData) => {
    return {
        type: ADD_STU_VIA_EXCEL,
        payload: {
            filedata: excelData
          }
    }
}