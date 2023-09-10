import client from '../utils/http';
import {login} from './index';

const constants = {
  SETUSERCATEGORIES_ATTEMPT: 'CATEGORIES_ALLS',
  SETUSERCATEGORIES_SUCCESS: 'CATEGORIES_ALLS_FAILURE',
  SETUSERCATEGORIES_FAILURE: 'CATEGORIES_ALLS_SUCCESS',
};

const setUserCategoriesFailure = error => ({
  error,
  type: constants.SETUSERCATEGORIES_FAILURE,
});
const setUserCategoriesSuccess = user => ({
  user,
  type: constants.SETUSERCATEGORIES_SUCCESS,
});
const CategoriesAlls = () => ({type: constants.SETUSERCATEGORIES_ATTEMPT});

const addCategoriesToUser = (data: number[]) => dispatch => {
  // console.log('data :-> ', data);
  return client.post('/categories/user', {categories: data}).then(resp => {
    if (resp.data.error) {
      dispatch(setUserCategoriesFailure(resp.data.error));
    } else {
      // dispatch(setUserCategoriesSuccess(resp.data.user));
      dispatch(login.loginSuccess(resp.data.user));
    }
  });
};

const CategoriesActions = {addCategoriesToUser, actions: constants};
export default CategoriesActions;
