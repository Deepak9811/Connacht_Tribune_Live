import client from '../utils/http';

const constants = {
  LOGIN_ATTEMPT: 'LOGIN_ATTEMPT',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_OR_AUTH_SUCCESS: 'REGISTER_OR_AUTH_SUCCESS',
  REGISTER_OR_AUTH_FAILURE: 'REGISTER_OR_AUTH_FAILURE',
  LOGOUT: 'LOG_OUT',
  REHYDRATE_ATTEMPT: 'REHYDRATE_ATTEMPT',
  REHYDRATE_FAILURE: 'REHYDRATE_FAILURE',
  REHYDRATE_SUCCESS: 'REHYDRATE_SUCCESS',
};

const loginAttempt = data => ({data, type: constants.LOGIN_ATTEMPT});
const loginSuccess = user => ({user, type: constants.LOGIN_SUCCESS});
console.log('loginSuccess :->>>> ', loginSuccess);
const registerSuccess = user => ({user, type: constants.REGISTER_SUCCESS});
const registerOrAuthSuccess = user => ({
  user,
  type: constants.REGISTER_OR_AUTH_SUCCESS,
});
const loginFailure = error => ({error, type: constants.LOGIN_FAILURE});
const registerFailure = error => ({error, type: constants.REGISTER_FAILURE});
const registerOrAuthFailure = error => ({
  error,
  type: constants.REGISTER_OR_AUTH_FAILURE,
});
const logout = () => ({type: constants.LOGOUT});
const rehydrateAttempt = token => ({token, type: constants.REHYDRATE_ATTEMPT});
// const rehydrateFailure = error => ({ error, type: constants.REHYDRATE_FAILURE });
// const rehydrateSuccess = user => ({ user, type: constants.REHYDRATE_SUCCESS });

const attemptLogin = data => dispatch => {
  // console.log('login action data :-> ', data);
  dispatch(loginAttempt(data));
  return client
    .post('/auth/login', {user: data})
    .then(resp => {
      if (resp.data.error) {
        dispatch(loginFailure(resp.data.error));
      } else {
        dispatch(loginSuccess(resp.data.user));
      }
    })
    .catch(e => {
      dispatch(loginFailure(e.request._response));
    });
};

const register = data => dispatch => {
  return client
    .post('/auth/register', {user: data})
    .then(resp => {
      if (resp.data.error) {
        dispatch(registerFailure(resp.data.error));
      } else {
        dispatch(registerSuccess(resp.data.user));
      }
    })
    .catch(e => {
      dispatch(registerFailure(e.request._response));
    });
};

const registerOrAuth = data => dispatch => {
  return client
    .post('/auth/registerOrAuth', {user: data})
    .then(resp => {
      if (resp.data.error) {
        dispatch(registerOrAuthFailure(resp.data.error));
      } else {
        dispatch(registerOrAuthSuccess(resp.data.user));
      }
    })
    .catch(e => {
      dispatch(registerOrAuthFailure(e.request._response));
    });
};

const rehydrateToken = token => dispatch => {
  dispatch(rehydrateAttempt(token));
};

const loginActions = {
  registerOrAuth,
  loginSuccess,
  register,
  attemptLogin,
  rehydrateToken,
  logout,
  actions: constants,
};
export default loginActions;
