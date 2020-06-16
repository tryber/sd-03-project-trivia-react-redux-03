import {
  CORRECT_ANSWER,
  WRONG_ANSWER,
  RESET_GAME,
  TIME_OUT,
  NEXT_QUESTION,
} from '../actions/actions';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
  answered: false,
};

const gameInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CORRECT_ANSWER:
      return {
        ...state,
        score: action.score,
        assertions: action.assertions,
        answered: true,
      };
    case WRONG_ANSWER:
      return { ...state, answered: true };
    case TIME_OUT:
      return { ...state, answered: true };
    case NEXT_QUESTION:
      return { ...state, answered: false };
    case RESET_GAME:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default gameInfoReducer;
