import { combineReducers } from 'redux';
import { ADD_SCORE, NEW_GAME, USER_INFO, DISABLE_BUTTON, FETCH_URL } from '../actions';

const defaultStateUserInfo = {
  name: '',
  email: '',
};

const initialScore = {
  score: 0,
};

const defaultURL = {
  address: 'https://opentdb.com/api.php?amount=5',
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

const fetchURL = (state = defaultURL, action) => {
  switch (action.type) {
    case FETCH_URL:
      return {
        address: action.url,
      };
    default:
      return state;
  }
};

const manageScore = (state = initialScore, action) => {
  switch (action.type) {
    case ADD_SCORE:
      return {
        ...state,
        score: action.points + state.score,
      };
    case NEW_GAME:
      return {
        score: 0,
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

const rootReducer = combineReducers({ userInfo, manageScore, fetchURL, disbledReducer });

export default rootReducer;
