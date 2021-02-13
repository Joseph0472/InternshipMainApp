import {
    LOG_IN,
    LOG_OUT
} from './action-types'

export const logIn = (auth) => {
    console.log(auth)
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
        payload: {
        }
    }
}