import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  AUTH_ERROR,
  AUTHENTICATING,
  CLEAR_ERRORS,
  USER_LOADED,
} from '../../types';

const initialState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case SIGNUP_FAIL:
    case AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
        user: null,
      };
    default:
      return state;
  }
};
