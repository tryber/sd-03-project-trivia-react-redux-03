import { combineReducers } from 'redux';
import { ADD_SCORE, NEW_GAME } from '../actions';

const USER_INFO = 'USER_INFO';
const DISABLE_BUTTON = 'DISABLE_BUTTON';

const defaultStateUserInfo = {
  name: '',
  email: '',
};

const initialScore = {
  score: 0,
};

const disabledDefault = {
  disabled: false,
};

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
        score: action.points + state.score,
      };
    case NEW_GAME:
      return {
        initialScore,
      };
    default:
      return state;
  }
};

const disbledReducer = (state = disabledDefault, action) => {
  switch (action.type) {
    case DISABLE_BUTTON:
      return {
        ...state,
        disabled: action.value,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ userInfo, scoreReducer, disbledReducer });

export default rootReducer;
