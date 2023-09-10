import client from '../utils/http';

const constants = {
  CATEGORIES_ALLS: 'CATEGORIES_ALLS',
  CATEGORIES_ALLS_FAILURE: 'CATEGORIES_ALLS_FAILURE',
  CATEGORIES_ALLS_SUCCESS: 'CATEGORIES_ALLS_SUCCESS',
};

const allsCategoriesFailure = error => ({
  error,
  type: constants.CATEGORIES_ALLS_FAILURE,
});
const allsCategoriesSuccess = user => ({
  user,
  type: constants.CATEGORIES_ALLS_SUCCESS,
});
const CategoriesAlls = () => ({type: constants.CATEGORIES_ALLS});

const allsCategories = () => dispatch => {
  return client.get('/categories').then(resp => {
    if (resp.data.error) {
      dispatch(allsCategoriesFailure(resp.data.error));
    } else {
      dispatch(allsCategoriesSuccess(resp.data.user));
    }
  });
};

const CategoriesActions = {allsCategories, actions: constants};
export default CategoriesActions;
