import { combineReducers } from 'redux';
import userInfoReducer from './userInfoReducer';
import triviaInfoReducer from './triviaInfoReducer';
import gameInfoReducer from './gameInfoReducer';
import timerReducer from './timerReducer';

const rootReducer = combineReducers({
  triviaInfo: triviaInfoReducer,
  userInfo: userInfoReducer,
  gameInfo: gameInfoReducer,
  timerInfo: timerReducer,
});

export default rootReducer;
