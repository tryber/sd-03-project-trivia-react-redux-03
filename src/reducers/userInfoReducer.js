import { SET_USER_LOGIN, RESET_USER_LOGIN } from '../actions/actions';

const initialInfo = {
  userEmail: '',
  isLogged: false,
  userName: '',
  token: '',
};

const userInfoReducer = (state = initialInfo, action) => {
  const { type, data } = action;
  switch (type) {
    case SET_USER_LOGIN:
      return {
        ...data,
        isLogged: true,
      };
    case RESET_USER_LOGIN:
      return { ...state, isLogged: false };
    default:
      return state;
  }
};

export default userInfoReducer;
