import {
    LOAD_COMPANIES_LOADING,
    LOAD_COMPANIES_SUCCESS,
    LOAD_COMPANIES_ERROR,
    CREATE_COMPANY,
    SET_COMPANIES,
    DELETE_COMPANY
} from '../actions/action-types'
import companyApi from '../../api/company'
import config from '../../config'
import { setCom } from '../actions/companyActions'

const initState = {
    companies: [
        { companyName: 'Tower Insurance Limited', cPersonName: 'Andrew', email: 'andrew@gmail.com', sdate: "1998-06-29", edate: "2003-08-02", ifActive: true, interest1: 4, interest2: 8, interest3: 8 },
        { companyName: 'ANZ', cPersonName: 'Baron', email: 'baron@gmail.com', sdate: "1998-06-29", edate: "2003-08-02", ifActive: true, interest1: 8, interest2: 5, interest3: 4 },
        { companyName: 'Chelmer', cPersonName: 'Kat', email: 'Kat@gmail.com', sdate: "1998-06-29", edate: "2003-08-02", ifActive: true, interest1: 3, interest2: 2, interest3: 1 },
        { companyName: 'Biolumic', cPersonName: 'Dave', email: 'dave@gmail.com', sdate: "1998-06-29", edate: "2003-08-02", ifActive: false, interest1: 1, interest2: 2, interest3: 3 },
        { companyName: 'ITS - AWS Migration, UoA', cPersonName: 'Elene', email: 'elene@gmail.com', sdate: "1998-06-29", edate: "2003-08-02", ifActive: true, interest1: 2, interest2: 1, interest3: 0 },
        { companyName: 'The Uni of Auckland', cPersonName: 'Fred', email: 'fred@gmail.com', ifActive: false, sdate: "1998-06-29", edate: "2003-08-02", interest1: 4, interest2: 8, interest3: 3 },
      ]
}

const companyReducer = (state = [], action) => {
    const {type, payload} = action;

    switch(type) {
        case CREATE_COMPANY:
            return [...state, {
                companyName: payload.companyName,
                cPersonName: payload.cPersonName,
                email: payload.email,
                ifActive: payload.ifActive,
                listName: payload.listName,
                sdate: payload.sdate,
                edate: payload.edate,
                interest1: payload.interest1,
                interest2: payload.interest2,
                interest3: payload.interest3,
            }];      
        case DELETE_COMPANY:
            const newState = [...state];
            const i = newState.findIndex(x => x.companyName == payload.companyName);
            newState.splice(i, 1);
            return [...newState];
        case "UPDATE_COMPANY":
            const dataUpdate = [...state];
            const index = payload.index;

            //console.log(payload) 
            //console.log([...state][index])

            dataUpdate[index] = {
                companyName: payload.companyName,
                cPersonName: payload.cPersonName,
                email: payload.email,
                ifActive: payload.ifActive,
                sdate: payload.sdate,
                edate: payload.edate,
                interest1: payload.interest1,
                interest2: payload.interest2,
                interest3: payload.interest3,
            }
            return [...dataUpdate];
        case "ADD_COM_VIA_EXCEL":
            console.log("pl data: ", payload.filedata)
            console.log("state: ", state)
            return state.push.apply(state,payload.filedata);
        case SET_COMPANIES:
            // console.log("set company state:", state) //list of companies in db
            // console.log("payload: ", action.payload)
            // console.log(state)
            // console.log("return",[...state, action.payload])
            return action.payload
        case LOAD_COMPANIES_LOADING:
            return com_loading(state, action);
        case LOAD_COMPANIES_SUCCESS:
            return com_loaded(state, action);
        case LOAD_COMPANIES_ERROR:
            return com_loaderr(state, action)
        default: 
            return state
    }
}

export default companyReducer

function com_loading(state, action) {
    return state;
}

function com_loaded(state, action) {
    var incoming = action.company
    console.log(incoming)
    return incoming
}

function com_loaderr(state, action) {
    return state
}

export const saveCom = () => async (dispatch, getState) => {
    const companies = getState().company
    const index = companies.length - 1
    console.log(companies)
    //TODO: Companies with same name should be not allowed to add
    await fetch(config.serverUrl+"/api/company/", {
        method: "POST",
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify(companies[index])
    }).then(alert("Company added"))
    //TODO: FIX the adding companies error when adding consecutively

}

export const loadCom = () => async (dispatch, getState) => {
    const companies = await fetch(config.serverUrl+"/api/company/").then(res => res.json())
    console.log(companies)
    dispatch(setCom(companies))
    return companies
}

export const delCom = (id) => async (dispatch, getState) => {
    // console.log("deleting id: ", id)
    fetch(config.serverUrl+"/api/company/"+id, {
        method: "DELETE"
    }).then(alert("Company removed"))
    //TODO: RELOAD the companies to maintain the new state DONE
}

