import { StyleSheet } from 'react-native';
import { palette } from '../../styles';

const styles = StyleSheet.create({
  input: {
    height: 48,
    fontSize: 20,
  },
  label: {
    color: palette.text,
    marginBottom: 5,
    marginLeft: 2,
  },
  container: {
    backgroundColor: '#dfdfdf',
    marginTop: 25,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
});

export default styles;
