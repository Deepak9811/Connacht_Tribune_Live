import {categories} from '../actions';

const reducer = (state, action) => {
  console.log('categories :->>> ', state, action);
  switch (action.type) {
    case categories?.actions.CATEGORIES_ALLS_SUCCESS:
      return {...state, categoriesR: action.categories};
    default:
      return (
        state || {
          categoriesR: [],
        }
      );
  }
};
export default reducer;
