export const USER_INFO = 'USER_INFO';
export const BOOL_QUESTION = 'BOOL_QUESTION';
export const MULT_QUESTION = 'MULT_QUESTION';

export const userInfo = (name, email) => ({
  type: USER_INFO,
  name,
  email,
});

export const multipleChoice = (question) => ({
  type: MULT_QUESTION,
  question,
});

export const dualChoice = (question) => ({
  type: BOOL_QUESTION,
  question,
});
