import { StyleSheet } from 'react-native';
import { palette } from '../../../../styles';

export default StyleSheet.create({
  block: {
    height: 70,
    backgroundColor: palette.dark,
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  newHeader: {
    color: 'white',
    paddingHorizontal: 25,
    flex: 1,
    fontFamily: 'Georgia',
    fontSize: 15,
  },
  openButton: {
    // backgroundColor: 'red',
    paddingHorizontal: 10,
    height: 70,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  articlesBox: {
    backgroundColor: palette.darkLighter,
  },
  articleItem: {
    // height: 50,
    // padding: 10,
    paddingLeft: 10,
    // paddingRight: 55,
    // alignItems: 'r',

  },
  articleItemTitle: {
    flex: 1,
    color: 'white',
    // backgroundColor: 'red',
    paddingVertical: 20,
    // alignSelf: 'flex-start',
    // fontFamily: 'Montserrat-Regular'
    paddingRight: 50,
  },
  timeAgo: {
    color: 'rgba(255,255,255,0.6)',
    width: 50,
    fontSize: 14,
    padding: 5,
  },
});
