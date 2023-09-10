import client from '../utils/http';

const constants = {
  ARTICLES_ALLS: 'ARTICLES_ALLS',
  ARTICLES_ALLS_FAILURE: 'ARTICLES_ALLS_FAILURE',
  ARTICLES_ALLS_SUCCESS: 'ARTICLES_ALLS_SUCCESS',
  ARTICLES_ALLS_BY_CATEGORY_SUCCESS: 'ARTICLES_ALLS_BY_CATEGORY_SUCCESS',
  ARTICLES_ALLS_BY_CATEGORY_FAILURE: 'ARTICLES_ALLS_BY_CATEGORY_FAILURE',
};

const allsArticlesFailure = error => ({
  error,
  type: constants.ARTICLES_ALLS_FAILURE,
});
const allsArticlesSuccess = articles => ({
  articles,
  type: constants.ARTICLES_ALLS_SUCCESS,
});
const allsArticlesByCategorySuccess = (categoryType, articles, refresh) => ({
  categoryType,
  articles,
  refresh,
  type: constants.ARTICLES_ALLS_BY_CATEGORY_SUCCESS,
});
const allsArticlesByCategoryFailure = error => ({
  error,
  type: constants.ARTICLES_ALLS_BY_CATEGORY_FAILURE,
});
const articlesAlls = () => ({type: constants.ARTICLES_ALLS});

const allsArticles = () => dispatch => {
  console.log('all articles check :-> ', dispatch);
  return client
    .get('/articles/data')
    .then(resp => {
      console.log('all articles resp :-> ', resp);
      if (resp.data.error) {
        dispatch(allsArticlesFailure(resp.data.error));
      } else {
        dispatch(allsArticlesSuccess(resp.data.articles));
      }
    })
    .catch(e => dispatch(allsArticlesFailure(e.request._response)));
};

const allsArticlesByCategoryPage =
  (category, page?, refresh = false) =>
  dispatch => {
    console.log('LOADING ARTICLES', category, page);
    let uri = '/articles/category/' + category.id;
    if (page) {
      uri += '/' + page;
    }

    console.log('url :=========', uri);
    return client
      .get(uri)
      .then(resp => {
        if (resp.data.error) {
          dispatch(allsArticlesByCategoryFailure(resp.data.error));
        } else {
          const articles = resp.data.articles.map(a => {
            // console.log('data length check :-> ', resp.data.categories);
            if (
              a.images &&
              a.images.thumbnail &&
              !a.images.thumbnail.startsWith('https')
            ) {
              a.images.thumbnail = a.images.thumbnail.replace('http', 'https');
            }
            if (
              a.images &&
              a.images.thumbnail &&
              !a.images.fullSize.startsWith('https')
            ) {
              a.images.fullSize = a.images.fullSize.replace('http', 'https');
            }
            a.title = getCleanTitle(a.title);
            return a;
          });
          dispatch(
            allsArticlesByCategorySuccess(category.key, articles, refresh),
          );
        }
      })
      .catch(e => {
        dispatch(allsArticlesByCategoryFailure(e));
      });
  };

// Remove the unicode characters
const getCleanTitle = (title: string): string => {
  return title.replace(/&#\d*;/g, character => {
    const number = +character.slice(2, 6);
    return String.fromCharCode(number);
    // return String.fromCharCode(character);
  });
};

const articlesActions = {
  allsArticlesByCategoryPage,
  allsArticles,
  actions: constants,
};
export default articlesActions;
