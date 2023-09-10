import { StyleSheet } from 'react-native';
import { palette } from '../../styles';

const styles = StyleSheet.create({
  input: {
    padding: 8,
    paddingLeft: 16,
    backgroundColor: 'white',
    height: 48,
  },
  forgotPass: {
    backgroundColor: 'white',
    borderColor: palette.lightGrey,
    height: 40,
    padding: 8,
  },
  label: {
    color: palette.text,
    marginBottom: 5,
    marginLeft: 2,
  },
  borderInputForgot: {
    borderRadius: 4,
    borderColor: palette.lightGrey,
    borderWidth: 1.5,
  },
});

export default styles;
