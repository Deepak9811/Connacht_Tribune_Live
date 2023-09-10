import {videos} from '../actions/index';

const reducer = (state, action) => {
  switch (action.type) {
    case videos?.actions.VIDEOS_ALLS_SUCCESS:
      return {...state, videos: action.videos};
    case videos?.actions.VIDEOS_ALLS_FAILURE:
      return {...state, videos: [], error: action.error};
    default:
      return (
        state || {
          videos: [],
        }
      );
  }
};
export default reducer;
