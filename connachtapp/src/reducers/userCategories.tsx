import {userCategories} from '../actions';
import storage from '../utils/storage';

const reducer = (state, action) => {
  switch (action.type) {
    case userCategories?.actions.SETUSERCATEGORIES_SUCCESS:
      storage.setItem('user', action.user);
      return {...state, categories: action.categories, success: true};
    default:
      return (
        state || {
          categoriesR: [],
        }
      );
  }
};
export default reducer;
