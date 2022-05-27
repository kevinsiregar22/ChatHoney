import {SET_CHOOSEN_USER} from '../screens/home/redux/action';
import {USER_DATA} from '../screens/login/redux/action';

const initialState = {};

const UserReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        _user: action.payload,
      };
    case SET_CHOOSEN_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };

    default:
      return state;
  }
};
export default UserReducers;
