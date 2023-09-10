import {connect} from 'react-redux';
import {articles, categories, videos} from '../actions';
import Articles from '../components/pages/articles';

import {login} from '../actions';

const mapStateToProps = state => ({
  articles: state.articles.articlesR,
  articlesNews: state.articles.news,
  articlesFarming: state.articles.farming,
  articlesProperty: state.articles.property,
  articlesBusiness: state.articles.business,
  articlesEntertaiment: state.articles.entertaiment,
  articlesLifestyle: state.articles.lifestyle,
  articlesFeed: state.articles.feed,
  articlesSport: state.articles.sport,
  articlesMotors: state.articles.motors,
  articlesOpinion: state.articles.opinion,
  articlesBreakingNews: state.articles.breakingNews,
  // categories: state.categories.categoriesR,
  title: 'Articles',
  error: state.articles.error,
  videos: state.videos.videos,
});

const mapDispatchToProps = dispatch => ({
  loadArticles: () => dispatch(articles.allsArticles()),
  loadArticlesCategoryPage: (c, page, refresh) => {
    dispatch(articles.allsArticlesByCategoryPage(c, page, refresh));
  },
  loadCategories: () => dispatch(categories.allsCategories()),
  loadVideos: () => dispatch(videos.lastVideos()),

  loginSuccess: data => {
    // console.log('data login 1:-> ', data);
    dispatch(login.loginSuccess(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
