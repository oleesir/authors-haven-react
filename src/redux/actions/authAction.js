import { SIGNUP_SUCCESS, SIGNUP_FAIL, CLEAR_ERRORS } from '../../types';
import axios from '../../../axios';

export const signup = (formData, onSubmitSuccess, onSubmitFailure) => async (
  dispatch,
) => {
  try {
    const res = await axios.post('/auth/signup', formData);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data.data,
    });
    onSubmitSuccess();
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: typeof err.response?.data?.error === 'string' ? { form: err.response?.data?.error } : err.response?.data?.error,
    });
    onSubmitFailure();
  }
};

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});
