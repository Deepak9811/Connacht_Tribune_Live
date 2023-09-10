import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    width: '100%',
    fontSize: 25,
    fontFamily: 'Georgia',
    padding: 20,
    paddingBottom: 5,
    color: 'white',
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  date: {
    width: '100%',
    color: '#999',
    padding: 20,
    paddingTop: 0,
  },
  gradientContainer: {
    paddingTop: 80,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  body: {
    padding: 20,
  },
});

export default styles;
