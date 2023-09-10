import {connect} from 'react-redux';
import {login} from '../actions';
import Login from '../components/pages/login';

const mapStateToProps = state => ({
  success: state.login.success,
  error: state.login.error,
});

const mapDispatchToProps = dispatch => ({
  onLogin: data => {
    console.log('data login :-> ', data);
    dispatch(login.attemptLogin(data));
  },
  loginSuccess: data => {
    // console.log('data login 1:-> ', data);
    dispatch(login.loginSuccess(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
