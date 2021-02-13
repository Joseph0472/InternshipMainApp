import authReducer from './authReducer'
import companyReducer from './companyReducer'
import { combineReducers } from 'redux'
import studentReducer from './studentReducer';

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}

const rootReducer = combineReducers({
    auth: authReducer,
    company: companyReducer,
    student: studentReducer
});

//export default rootReducer;
export default persistReducer(persistConfig, rootReducer)