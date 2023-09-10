import {articles} from '../actions';
import {categoriesStatic} from '../utils/staticCategories';

const reducer = (state, action) => {
  switch (action.type) {
    case articles?.actions.ARTICLES_ALLS_SUCCESS:
      return {...state, articlesR: action.articles};
    case articles?.actions.ARTICLES_ALLS_FAILURE:
      return {...state, articlesR: [], error: action.error};
    case articles?.actions.ARTICLES_ALLS_BY_CATEGORY_SUCCESS:
      if (action.refresh) {
        return {...state, [action.categoryType]: action.articles};
      }
      return {
        ...state,
        [action.categoryType]: [
          ...state[action.categoryType],
          ...action.articles,
        ],
      };
    default:
      return (
        state || {
          articlesR: [],
          [categoriesStatic[0].key]: [],
          [categoriesStatic[1].key]: [],
          [categoriesStatic[2].key]: [],
          [categoriesStatic[3].key]: [],
          [categoriesStatic[4].key]: [],
          [categoriesStatic[5].key]: [],
          [categoriesStatic[6].key]: [],
          [categoriesStatic[7].key]: [],
          [categoriesStatic[8].key]: [],
          [categoriesStatic[9].key]: [],
          [categoriesStatic[10].key]: [],
          ['breakingNews']: [],
        }
      );
  }
};
export default reducer;
