export const USER_INFO = 'USER_INFO';
export const ADD_SCORE = 'ADD_SCORE';
export const DISABLE_BUTTON = 'DISABLE_BUTTON';

export const userInfo = (name, email) => ({
  type: USER_INFO,
  name,
  email,
});

export const scoreReducer = (points) => ({
  type: ADD_SCORE,
  points,
});

export const disabledReducer = (value) => ({
  type: DISABLE_BUTTON,
  value,
});
