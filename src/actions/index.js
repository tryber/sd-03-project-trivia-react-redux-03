export const USER_INFO = 'USER_INFO';
export const ADD_SCORE = 'ADD_SCORE';

export const userInfo = (name, email) => ({
  type: USER_INFO,
  name,
  email,
});

export const scoreReducer = (points) => ({
  type: ADD_SCORE,
  points,
});
