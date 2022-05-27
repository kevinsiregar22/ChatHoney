import {combineReducers} from 'redux';
import globalReducer from './globalReducer';
import UserReducers from './userReducer';

export const allReducers = combineReducers({
  user: UserReducers,
  global: globalReducer,
});
