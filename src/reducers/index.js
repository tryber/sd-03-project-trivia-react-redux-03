import { combineReducers } from "redux";
import { BOOL_QUESTION, MULT_QUESTION } from "../actions";

const USER_INFO = 'USER_INFO';

const defaultStateUserInfo = {
  name: "",
  email: "",
};

const type = "multiple";

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

const questionReducer = (state = type, action) => {
  switch (action.type) {
    case BOOL_QUESTION:
      return {
        options: ['a', 'b'],
      };
    case MULT_QUESTION:
      return {
        options: ['a', 'b', 'c', 'd'],
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ userInfo, questionReducer });

export default rootReducer;
