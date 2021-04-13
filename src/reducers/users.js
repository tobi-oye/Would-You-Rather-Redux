import { ADD_ANSWER_TO_USER, RECEIVE_USERS } from "../actions/users";

export const users = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_ANSWER_TO_USER:
      const { authUser, qid, answer } = action;

      return {
        ...state,
        [authUser]: {
          ...state[authUser],
          answers: {
            ...state[authUser].answers,
            [qid]: answer,
          },
        },
      };
    default:
      return state;
  }
};
