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
            // console.log(payload) 
            //console.log([...state][index])
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

export const saveStu = () => async (dispatch, getState) => {
    const students = getState().student
    const index = students.length - 1
    //console.log(students)
    //TODO: Students with same name should be not allowed to add done
    await fetch(config.serverUrl+"/api/student/", {
        method: "POST",
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify(students[index])
    }).then(alert("Student added."))
    //TODO: FIX the adding students error when adding consecutively done

}

export const saveExcelStu = () => async (dispatch, getState) => {
    const students = getState().student
    const index = students.length - 1
    //console.log(students)
    //TODO: Students with same name should be not allowed to add
    await fetch(config.serverUrl+"/api/student/", {
        method: "POST",
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify(students[index])
    })
    //TODO: FIX the adding students error when adding consecutively done

}

export const loadStu = () => async (dispatch, getState) => {
    const students = await fetch(config.serverUrl+"/api/student/").then(res => res.json())
    //console.log(students)
    dispatch(setStu(students))
    return students
}

export const delStu = (id) => async (dispatch, getState) => {
    // console.log("deleting id: ", id)
    fetch(config.serverUrl+"/api/student/"+id, {
        method: "DELETE"
    })
    //TODO: RELOAD the students to maintain the new state DONE
}

export const upStu = (nrow) => async (dispatch, getState) => {
    console.log("updating: ", nrow)
    await fetch(config.serverUrl+"/api/student/"+nrow._id, {
        method: "PATCH",
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify(nrow)
    }).then(alert("Student info updated."))
    //TODO: RELOAD the students to maintain the new state DONE
}

