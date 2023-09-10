import * as React from 'react';
import {Component} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Category} from '../../connacht-tribune-models';
// import { FBLoginManager } from 'react-native-facebook-login';
// import firebase from 'react-native-firebase';
import analytics from '@react-native-firebase/analytics';
// import * as GoogleSignIn from 'react-native-google-sign-in';
// import { Navigation } from 'react-native-navigation';
import {palette} from '../../../styles';
import Button from '../../button';
import Header from '../../header';
import CategoryItem from './categoryItem';
import styles from './style';

export interface IProps {
  setCategories: (data) => {};
  sucess;
  error;
  categories;
  navigator;
  navigation;
}

export default class SelectNewsFeed extends Component<IProps, {}> {
  public static navigatorStyle = {
    navBarHidden: true,
    appbarElevation: 0,
  };
  public serverCategories: any[] = [
    {
      name: 'news',
      image: require('../../../assets/images/categories/latest_news.jpg'),
      id: 17,
    },
    {
      name: 'sport',
      image: require('../../../assets/images/categories/sport.jpg'),
      id: 58792,
    },
    {
      name: 'lifestyle',
      image: require('../../../assets/images/categories/lifestyle.jpg'),
      id: 16,
    },
    {
      name: 'entertainment',
      image: require('../../../assets/images/categories/entertainment.jpg'),
      id: 15,
    },
    {
      name: 'business',
      image: require('../../../assets/images/categories/business.jpg'),
      id: 13,
    },
    {
      name: 'property',
      image: require('../../../assets/images/categories/property.jpg'),
      id: 58770,
    },
    {
      name: 'farming',
      image: require('../../../assets/images/categories/farming.jpg'),
      id: 30,
    },
    {
      name: 'motor',
      image: require('../../../assets/images/categories/motor.jpg'),
      id: 58823,
    },
    {
      name: 'Opinion',
      image: require('../../../assets/images/categories/opinion.jpg'),
      id: 18,
    },
  ];

  public pickedCategories: any[] =
    this.props.categories.length > 0 ? this.props.categories.slice(0) : [];
  public state = {numberOfPickedCategories: 0};

  public async componentDidMount() {
    console.log('select categories :-> ', this.props.categories);
    // firebase.analytics().setCurrentScreen('select_newsFeed');
    await analytics().logScreenView({
      screen_name: 'select_newsFeed',
      screen_class: 'select_newsFeed',
    });
  }

  public categoryStatusChange(picked: boolean, category: Category) {
    if (picked) {
      console.log('picked :-> ', picked, ' , category :-> ', category);
      this.pickedCategories.push(
        this.serverCategories.find(c => c.id === category.id),
      );
      // firebase.analytics().logEvent('select_category');
      analytics().logEvent('select_category');
    } else {
      this.pickedCategories = this.pickedCategories.filter(
        c => c.id !== category.id,
      );
      // firebase.analytics().logEvent('unselect_category');
      analytics().logEvent('unselect_category');
    }
    console.log('number of picked :->> ', this.pickedCategories.length);
    this.setState({numberOfPickedCategories: this.pickedCategories.length});
  }

  public saveCategories() {
    // firebase.analytics().logEvent('saveCategories', { quantity: this.pickedCategories.length, selected: this.pickedCategories.map(c => c.name), firstTime: this.props.categories.length === 0 });
    analytics().logEvent('saveCategories', {
      quantity: this.pickedCategories.length,
      selected: this.pickedCategories.map(c => c.name),
      firstTime: this.props.categories.length === 0,
    });
    console.log('picked Categories :->> ', this.pickedCategories);
    this.props.setCategories(this.pickedCategories);
    // if (this.props.categories.length > 0) {
    //   console.log('0');
    //   this.props.navigation.dismissModal();
    // } else {
    {
      this.props?.route?.params?.onGoBack
        ? this.props.navigation.goBack()
        : this.props.navigation.navigate('Articles');
    }
    // this.props.navigator.resetTo({ screen: 'connachtapp.Articles', animationType: 'fade' });
    // }
  }

  public render() {
    const categories = () =>
      this.serverCategories.map((c, i) => {
        return (
          <React.Fragment key={i}>
            <CategoryItem
              onPress={selected => this.categoryStatusChange(selected, c)}
              picked={
                this.props.categories.findIndex(pc => pc.id === c.id) !== -1
              }
              category={c}
              key={c.id}
            />
          </React.Fragment>
        );
        // return (<Text key={c.id}></Text>);
      });
    return (
      <View style={{flex: 1}}>
        {this.props?.route?.params?.onGoBack ? (
          <Header
            navigator={null}
            onGoBack={() => this.props.navigation.goBack()}
          />
        ) : (
          <Header navigator={null} />
        )}

        <View style={{backgroundColor: palette.dark, flex: 1}}>
          <Text style={styles.header}> Personalize your newsfeed</Text>
          {/* <Text style={styles.header}> {JSON.stringify(this.props.categories)}</Text> */}
          <Text
            numberOfLines={2}
            style={
              styles.subHeader
            }>{`Please choose 3 or more topics from below to make your own personal newsfeed`}</Text>
          <ScrollView
            contentContainerStyle={styles.categories}
            style={{flexGrow: 1}}
            overScrollMode="never">
            {categories()}
          </ScrollView>
          {/* <Button title="SAVE MY NEWSFEED" onPress={() => console.log('er')} styles={styles.saveButton}></Button> */}
          <Button
            onPress={() => this.saveCategories()!}
            text={
              this.pickedCategories.length < 3
                ? 'PICK ' +
                  (3 - this.pickedCategories.length) +
                  ' OR MORE CATEGORIES'
                : 'SAVE MY NEWSFEED'
            }
            style={{
              marginBottom: 20,
              marginTop: 20,
              marginRight: 20,
              marginLeft: 20,
            }}
            dissabled={this.pickedCategories.length < 3}></Button>
        </View>
      </View>
    );
  }
}
