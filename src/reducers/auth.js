import { AUTH_UPDATE, AUTH_REMOVE } from '../actions';

const auth = (state = null, action) => {
  switch (action.type) {
    case AUTH_UPDATE: {
      const { payload } = action;
      if (!payload) {
        return state;
      }
      const auth = { ...state, ...payload };
      return auth;
    }
    case AUTH_REMOVE:
      return null;
    default:
      return state;
  }
};

export default auth;
