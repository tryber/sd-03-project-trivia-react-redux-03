import { SET_TIMER, RESET_TIMER } from '../actions/actions';

const INITIAL_STATE = {
  timer: 30,
};

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TIMER:
      return { timer: action.timer };
    case RESET_TIMER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default timerReducer;
