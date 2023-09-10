import {connect} from 'react-redux';
import {userCategories} from '../actions';
import selectNewsFeed from '../components/pages/selectNewsFeed';

const mapStateToProps = state => ({
  success: state.login.success,
  error: state.login.error,
  categories: state.login.user.categories,
});

const mapDispatchToProps = dispatch => ({
  setCategories: data => {
    console.log('set Categories dispatch:->>  ', data);
    dispatch(userCategories.addCategoriesToUser(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(selectNewsFeed);
