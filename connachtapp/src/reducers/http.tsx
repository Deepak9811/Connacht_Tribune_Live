import {http} from '../actions';

const reducer = (state, action) => {
  switch (action.type) {
    case http?.actions.REQUEST_ATTEMPT:
      return {
        ...state,
        requestAttempt: true,
        requestFailure: false,
        requestSuccess: false,
      };
    case http?.actions.REQUEST_SUCCESS:
      return {
        ...state,
        requestAttempt: false,
        requestFailure: false,
        requestSuccess: true,
      };
    case http?.actions.REQUEST_FAILURE:
      return {
        ...state,
        requestAttempt: false,
        requestFailure: true,
        requestSuccess: false,
        error: action.error,
      };
    default:
      return state || {};
  }
};

export default reducer;
