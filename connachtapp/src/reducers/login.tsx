import {login} from '../actions';
import storage from '../utils/storage';

const reducer = (state, action) => {
  // storage.getItem('user').then(user => {
  //   console.log('user data :->> ', user);
  // });
  // console.log(
  //   'Hellooo..333...>>> ',
  //   // login?.actions,
  //   // ', state value :->>> ',
  //   // state,
  //   action,
  // );
  switch (action.type) {
    case login?.actions.LOGIN_SUCCESS:
      // console.log('state value :->>> ', state);
      storage.setItem('user', action.user);
      return {...state, user: action.user, success: true};
    case login?.actions.LOGIN_FAILURE:
      return {...state, error: action.error};
    case login?.actions.REGISTER_SUCCESS:
      return {...state, user: action.user, success: true};
    case login?.actions.REGISTER_FAILURE:
      return {...state, user: null, error: action.error};
    case login?.actions.REGISTER_OR_AUTH_SUCCESS:
      storage.setItem('user', action.user);
      return {...state, user: action.user, success: true};
    case login?.actions.REGISTER_OR_AUTH_FAILURE:
      return {...state, user: null, error: action.error};
    default:
      return state || {};
  }
};

export default reducer;
