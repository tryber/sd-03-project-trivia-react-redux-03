import {
  REQUEST_TRIVIA_QUESTIONS,
  QUESTIONS_REQUEST_SUCESS,
  QUESTIONS_REQUEST_FAILURE,
  RESET_GAME,
} from '../actions/actions';

const INITIAL_STATE = {
  loading: true,
  data: [],
};

const triviaInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_TRIVIA_QUESTIONS:
      return { ...state, loading: action.loading };
    case QUESTIONS_REQUEST_SUCESS:
      return { ...state, loading: action.loading, data: [...action.data] };
    case QUESTIONS_REQUEST_FAILURE:
      return { ...state, loading: action.loading, data: action.data };
    case RESET_GAME:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default triviaInfoReducer;
