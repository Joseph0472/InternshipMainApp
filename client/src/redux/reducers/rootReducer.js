import authReducer from './authReducer'
import companyReducer from './companyReducer'
import { combineReducers } from 'redux'
import studentReducer from './studentReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    company: companyReducer,
    student: studentReducer
});

export default rootReducer;