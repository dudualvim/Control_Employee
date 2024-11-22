import { combineReducers } from '@reduxjs/toolkit';
import employeesReducer from './employeesSlice';

const rootReducer = combineReducers({
  employees: employeesReducer,
});

export default rootReducer;
