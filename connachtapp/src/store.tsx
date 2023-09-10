import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar} from 'react-native';
import {applyMiddleware, compose, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
StatusBar.setBarStyle('light-content', true);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

declare var window;

const initialState = {
  http: {},
};

let middleware = [thunk];
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (__DEV__) {
  middleware = [...middleware /*, logger*/];
} else {
  middleware = [...middleware];
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware)),
);

export default store;
export const persistor = persistStore(store);
