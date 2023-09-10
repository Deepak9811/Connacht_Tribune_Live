import {StyleSheet} from 'react-native';
import {palette} from '../../../styles';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  background: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    flex: 1,
    opacity: 0.8,
    width: '100%',
    height: '100%',
    backgroundColor: '#ab060c',
    zIndex: 0,
  },
  buttons: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '20%',
    marginVertical: 30,
  },
  buttonSignIn: {
    // width: '100%',
    // backgroundColor: 'white',
    // borderRadius: 25,
    paddingVertical: 15,
    textAlign: 'center',
    color: palette.primary,
  },
  barBotton: {
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingBottom: 5,
  },
  viewButtonSignIn: {
    // backgroundColor: 'green',
    // height: '20%',
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    // borderWidth : 2,
    // borderColor: 'white',
    marginVertical: 35,
    borderRadius: 9,
  },
  signInWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signIn: {
    color: palette.primary,
    fontSize: 16,
  },
  ModalForgotPassword: {
    marginTop: 25,
  },
  inputModal: {
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#dfdfdf',
    height: 48,
    fontSize: 20,
    width: '90%',
  },
  textButtonModal: {
    fontSize: 15,
    letterSpacing: 2,
    color: 'white',
    width: '100%',
    textAlign: 'center',
  },
  activeButtonModal: {
    backgroundColor: 'green',
  },
  disableButtonModal: {
    backgroundColor: 'gray',
  },
});

export default styles;
