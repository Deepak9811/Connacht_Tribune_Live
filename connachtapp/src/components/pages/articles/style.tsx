import {StyleSheet} from 'react-native';
import {palette} from '../../../styles';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    zIndex: 2,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttons: {
    position: 'absolute',
    width: '100%',
    bottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'black',
    backgroundColor: palette.red,
  },
  tabItem: {
    paddingHorizontal: 3,
    backgroundColor: palette.red,
  },
  tabBarItem: {
    fontSize: 15,
    color: 'white',
    // fontFamily: 'Montserrat-Regular',
    marginLeft: 5,
    marginRight: 5,
    borderBottomWidth: 4,
    borderBottomColor: palette.red,
  },
  tabBarItemSelected: {
    //   fontWeight: i === this.state.index ? 'bold' : 'normal',
    borderBottomColor: 'white',
  },
});

export default styles;
