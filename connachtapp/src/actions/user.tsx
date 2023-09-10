import Toast from 'react-native-root-toast';
import client from '../utils/http';

const constants = {
  SETUSERCATEGORIES_ATTEMPT: 'CATEGORIES_ALLS',
  SET_USER_PASSWORD_SUCCESS: 'SET_USER_PASSWORD_SUCCESS',
  SET_USER_PASSWORD_FAILURE: 'SET_USER_PASSWORD_FAILURE',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILURE: 'GET_USER_FAILURE',
};

const getDataUserFailure = error => ({ error, type: constants.GET_USER_FAILURE });
const getDataUserSuccess = user => ({ user, type: constants.GET_USER_SUCCESS });
const changePasswordSuccess = user => ({ user, type: constants.SET_USER_PASSWORD_SUCCESS });
const changePasswordFailure = error => ({ error, type: constants.SET_USER_PASSWORD_FAILURE });
const CategoriesAlls = () => ({ type: constants.SETUSERCATEGORIES_ATTEMPT });

const getDataUser = () => (dispatch) => {
  return client.get('/users/me')
    .then((resp) => {
      if (resp.data.error) {
        dispatch(getDataUserFailure(resp.data.error));
      } else {
        dispatch(getDataUserSuccess(resp.data.user));
      }
    }).catch(e => {
      Toast.show('There is a technical issue and we are taking and eye on it', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    });
};

const changePasswordUser = (data) => (dispatch) => {
  return client.patch('/users', { user: data })
    .then((resp) => {
      if (resp.data.error) {
        dispatch(changePasswordFailure(resp.data.error));
      } else {
        dispatch(changePasswordSuccess(resp.data.user));
      }
    }).catch(e => {
      Toast.show('There is a technical issue and we are taking and eye on it', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    });
};

const UsersActions = { changePasswordUser, getDataUser, actions: constants };
export default UsersActions;
