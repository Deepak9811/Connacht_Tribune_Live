import articlesActions from './articles';
import categoriesActions from './categories';
import httpActions from './http';
import loginActions from './login';
import UsersActions from './user';
import userCategoriesAction from './userCategories';
import VideosActions from './videos';

export const http = httpActions;
export const login = loginActions;
export const articles = articlesActions;
export const categories = categoriesActions;
export const userCategories = userCategoriesAction;
export const users = UsersActions;
export const videos = VideosActions;
