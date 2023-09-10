import {StyleSheet} from 'react-native';
import {palette} from '../../../styles';

export default StyleSheet.create({
  content: {
    // alignSelf: 'stretch',
    // flex: 1,
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  categories: {
    paddingTop: 20,
    // flex: 1,
    flexDirection: 'row',
    // alignItems: 'flex-start',
    // justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  header: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Georgia',

    // flex: 1,
  },
  subHeader: {
    // flex: 1,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
    marginHorizontal: 20,
    // marginRight: 50,
    // marginLeft: 50,
    // fontFamily: 'Montserrat-Regular',
  },

  saveButton: {
    marginLeft: 20,
    marginRight: 20,
  },
});
