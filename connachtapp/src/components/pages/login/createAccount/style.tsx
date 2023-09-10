import { StyleSheet } from 'react-native';
import { palette } from '../../../../styles';

const styles = StyleSheet.create({
  textButtonNext: {
    fontSize: 20,
    letterSpacing: 2,
    color:'white',
    width: '100%',
    textAlign: 'center',
  },
  textCreateAccount: {
    paddingTop: 25,
    paddingBottom: 5,
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
  },
  textSignIn: {
    marginTop: 25,
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  content: {
    height: '100%',
    backgroundColor: '#0a1225',
  },
  header: {
    height: '55%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    flex: 1,
    opacity: 1.0 - 0.35,
    width: '100%',
    height: '100%',
    backgroundColor: palette.primary,
    zIndex: 1,
  },
  card: {
    width: '85%',
    position: 'absolute',
    top: '22%',
    paddingTop: 20,
    paddingBottom: 0,
    zIndex: 3,
  },
  buttons: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '80%',
    paddingVertical: 15,
    alignSelf: 'center',
  },
  active: {
    backgroundColor: palette.primary,
  },
  disable: {
    backgroundColor: 'gray',
  },
});

export default styles;
