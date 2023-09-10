import {connect} from 'react-redux';
import {login} from '../actions';
import CreateAccount from '../components/pages/login/createAccount';

const mapStateToProps = state => ({
  error: state.login.error,
  success: state.login.success,
});

const mapDispatchToProps = dispatch => ({
  // onRegister: data => {
  //   dispatch(login.register(data));
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
