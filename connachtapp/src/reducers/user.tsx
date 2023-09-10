import {users} from '../actions';

const reducer = (state, action) => {
  switch (action.type) {
    case users?.actions.GET_USER_SUCCESS:
      return {...state, user: action.user, success: true};
    default:
      return (
        state || {
          user: {},
        }
      );
  }
};
export default reducer;
