import { combineReducers } from 'redux';
import { ADD_SCORE } from '../actions';

const USER_INFO = 'USER_INFO';

const defaultStateUserInfo = {
  name: '',
  email: '',
};

const initialScore = 0;

const userInfo = (state = defaultStateUserInfo, action) => {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        name: action.name,
        email: action.email,
      };
    default:
      return state;
  }
};

const scoreReducer = (state = initialScore, action) => {
  switch (action.type) {
    case ADD_SCORE:
      return {
        ...state,
        score: action.points,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ userInfo, scoreReducer });

export default rootReducer;
