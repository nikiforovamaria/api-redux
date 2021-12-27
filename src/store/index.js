import {createStore, combineReducers} from 'redux';
import serviceListReducer from '../reducers/serviceListReducer';
import serviceAddReducer from '../reducers/serviceAddReducer';
import serviceChangeReducer from '../reducers/serviceChangeReducer';
import serviceIsLoadingReducer from '../reducers/serviseIsLoadingReducer.js';

const reducer = combineReducers({
  serviceList: serviceListReducer,
  serviceAdd: serviceAddReducer,
  serviceChange: serviceChangeReducer,
  serviceIsLoadng: serviceIsLoadingReducer,
});

const store = createStore(reducer);

export default store;