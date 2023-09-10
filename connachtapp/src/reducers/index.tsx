import { combineReducers } from 'redux';
import articles from './articles';
import http from './http';
import login from './login';
import user from './user';
import userCategories from './userCategories';
import videos from './videos';

const reducers = combineReducers({
  http,
  articles,
  login,
  user,
  userCategories,
  videos,
});

export default reducers;
