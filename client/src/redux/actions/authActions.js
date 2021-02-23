import {
    LOG_IN,
    LOG_OUT
} from './action-types'

export const logIn = (auth) => {
    return {
        type: LOG_IN,
        payload: {
            name: auth.name, 
            email: auth.email,
            image: auth.image
        }
    }
}

export const logOut = () => {
    return {
        type: LOG_OUT,
    }
}