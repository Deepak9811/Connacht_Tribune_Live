import axios from 'axios';

const constants = {
  ALL: 'VIDEOS_ALLS',
  VIDEOS_ALLS_FAILURE: 'VIDEOS_ALLS_FAILURE',
  VIDEOS_ALLS_SUCCESS: 'VIDEOS_ALLS_SUCCESS',
};

const allVideosFaileture = error => ({ error, type: constants.VIDEOS_ALLS_FAILURE });
const allsVideosSuccess = videos => ({ videos, type: constants.VIDEOS_ALLS_SUCCESS });
const VideosAlls = () => ({ type: constants.ALL });

// const key = 'AIzaSyCWYcXishYu7d0n8uZ_UAb2Qkg331tXf0o'; // Android key
const key = 'AIzaSyCcAfYveQGmO8ukzinWMZsa5TeyghX-8-g'; // Browser key for development
const channel = 'UCJkF8TXEC-JBbY1xKISCF_A';
const numberOfVideos = 20;
const queryUrl = `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channel}&part=snippet,id&order=date&maxResults=${numberOfVideos}`;

const lastVideos = () => (dispatch) => {
  return axios.get(queryUrl)
  .then((resp) => {
    if (resp.data.items) {
      const videos =  resp.data.items.map((v) => {
        return {
          id: v.id.videoId,
          title: v.snippet.title,
          date: new Date(v.snippet.publishedAt),
          description: v.snippet.description,
          thumbnailSmall: v.snippet.thumbnails.default.url,
          thumbnailMedium: v.snippet.thumbnails.medium.url,
          thumbnailLarge: v.snippet.thumbnails.high.url,
        };
      });
      dispatch(allsVideosSuccess(videos));
    } else {
      dispatch(allVideosFaileture('Cannot load videos'));
    }
  }).catch(err =>  dispatch(allVideosFaileture('Cannot load videos')));
};

const VideosActions = { lastVideos, actions: constants };
export default VideosActions;
