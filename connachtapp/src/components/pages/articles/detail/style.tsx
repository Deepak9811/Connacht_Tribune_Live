import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    height: '40%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  info: {
    width: '85%',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'red',
  },
});

export default styles;
