import {
    CREATE_STUDENT,
    SET_STUDENTS,
    DELETE_STUDENT,
    UPDATE_STUDENT,
    ADD_STU_VIA_EXCEL
} from '../actions/action-types'
import config from '../../config'
import { setStu } from '../actions/studentActions'

const initState = {
    students: [
        { studentName: 'Amy', email: 'amy@gmail.com', state: 1, interest1: 2, interest2: 3, interest3: 1},
        { studentName: 'Dell', email: 'dell@gmail.com', state: 1, interest1: 2, interest2: 3, interest3: 1},
        { studentName: 'Bella', email: 'bella@gmail.com', state: 0, interest1: 2, interest2: 3, interest3: 1},
        { studentName: 'Cook', email: 'cook@gmail.com', state: 0, interest1: 2, interest2: 3, interest3: 1},
      ]
}

const studentReducer = (state = [], action) => {
    const {type, payload} = action;

    switch(type) {
        case CREATE_STUDENT:
        // console.log(state) ////state is a array of student object
            return [...state, {
                userEmail: payload.userEmail,
                studentName: payload.studentName,
                email: payload.email,
                stuState: payload.stuState,
                interest1: payload.interest1,
                interest2: payload.interest2,
                interest3: payload.interest3,
                note: payload.note,
            }];      
        case DELETE_STUDENT:
            const newState = [...state];
            const i = newState.findIndex(x => x.studentName == payload.studentName);
            newState.splice(i, 1);
            return [...newState];
        case UPDATE_STUDENT:
            const dataUpdate = [...state];
            const index = payload.index;
            dataUpdate[index] = {
                studentName: payload.studentName,
                email: payload.email,
                stuState: payload.stuState,
                interest1: payload.interest1,
                interest2: payload.interest2,
                interest3: payload.interest3,
                note: payload.note,
            }
            return [...dataUpdate];
        case ADD_STU_VIA_EXCEL:
            // console.log("pl data: ", payload.filedata)
            // console.log("state: ", state)
            //console.log(state.push.apply(state,payload.filedata))

            return state.push.apply(state,payload.filedata);
        case SET_STUDENTS:
            // console.log("set student state:", state) //list of students in db
            // console.log("payload: ", action.payload)
            // console.log(state)
            // console.log("return",[...state, action.payload])
            return action.payload
        default: 
            return state
    }
}

export default studentReducer

export const saveStu = (userEmail) => async (dispatch, getState) => {
    const students = getState().student
    const index = students.length - 1
    var stuToSave = students[index]
    stuToSave.userEmail = userEmail

    await fetch(config.serverUrl+"/api/student/", {
        method: "POST",
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify(stuToSave)
    }).then(alert("Student added."))

}

export const saveExcelStu = (userEmail) => async (dispatch, getState) => {
    const students = getState().student
    const index = students.length - 1
    var stuToSave = students[index]
    stuToSave.userEmail = userEmail

    await fetch(config.serverUrl+"/api/student/", {
        method: "POST",
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify(stuToSave)
    })

}

export const loadStu = (uEmail) => async (dispatch, getState) => {
    const students = await fetch(config.serverUrl+"/api/student/").then(res => res.json())
    var myStus = []
    students.forEach(student => {
        // When the company's userEmail can't match the param userEmail which is sent from frontend, don't load it DONE
        console.log(uEmail)
        if (student.userEmail === uEmail) {
            myStus.push(student)
        }        
    });
    dispatch(setStu(myStus))
    return myStus
}

export const delStu = (id) => async (dispatch, getState) => {
    fetch(config.serverUrl+"/api/student/"+id, {
        method: "DELETE"
    })
}

export const upStu = (nrow) => async (dispatch, getState) => {
    await fetch(config.serverUrl+"/api/student/"+nrow._id, {
        method: "PATCH",
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify(nrow)
    }).then(alert("Student info updated."))
}

