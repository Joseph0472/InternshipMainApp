import {
    LOG_IN,
    LOG_OUT
} from '../actions/action-types'

const initState = {
    authInfo: [
        {name: "", email: "", image: ""},
      ]
}

const authReducer = (state = {}, action) => {
    const {type, payload} = action;
    
    switch(type) {
        case LOG_IN:
            return {
                name: payload.name, 
                email: payload.email,
                image: payload.image
            };
        case LOG_OUT:
            console.log("Logging out")
            return {};
        default: 
            return state
    }
}

export default authReducer