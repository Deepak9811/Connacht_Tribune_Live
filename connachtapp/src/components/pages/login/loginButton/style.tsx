import { StyleSheet } from 'react-native';
import { palette } from '../../../../styles';

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: '100%',
    borderRadius: 4,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
  fb: {
    backgroundColor: palette.primaryDark,
  },
  gmail: {
    backgroundColor: palette.orange,
  },
});

export default styles;
