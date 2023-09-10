import {connect} from 'react-redux';
import {users} from '../actions';
import Profile from '../components/pages/profile';

const mapStateToProps = state => ({
  user: state.login.user,
});

// const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  loadUser: () => {
    dispatch(users.getDataUser());
  },
  changePassword: data => dispatch(users.changePasswordUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
