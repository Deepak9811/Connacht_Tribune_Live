import * as React from 'react';
import {Component} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Linking,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {Article, Category, User} from '../../connacht-tribune-models';
// import { Animated, ShadowPropTypesIOS, StatusBar } from "react-native";
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {palette, withShadow} from '../../../styles';
import {categoriesStatic} from '../../../utils/staticCategories';
import storage from '../../../utils/storage';
import Header from '../../header';
import Card from './card';
import MainNew from './mainNew';
// import styles from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';
import * as _ from 'lodash';
import ContentLoader from 'react-native-content-loader';
import {
  AdEventType,
  AppOpenAd,
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import Toast from 'react-native-root-toast';
import {Circle, Rect} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import client from '../../../utils/http';
import BreakingNews from './breakingNews';
import Videos from './videos';
const logo = require('../../../assets/images/connacht-tribune-1.png');

import {login} from '../../../actions';
import CustomFlatList from '../../allArticle/Post';
import Banner from '../../banner/Banner';

export interface IProps {
  title: string;
  articles: Article[];
  articlesNews: Article[];
  articlesFarming: Article[];
  articlesProperty: Article[];
  articlesBusiness: Article[];
  articlesEntertaiment: Article[];
  articlesLifestyle: Article[];
  articlesFeed: Article[];
  articlesOpinion: Article[];
  categories: Category[];
  articlesSport: Article[];
  articlesMotors: Article[];
  articlesBreakingNews: Article[];
  videos: any[];
  loadArticles: () => {};
  loadCategories: () => {};
  navigator;
  navigation;
  error: string;
  loadArticlesCategoryPage: (category, page, refresh?) => {};
  loadVideos: () => {};
  loginSuccess: (data) => {};
}

export interface ICategory {
  name: string;
  key: number;
}
export default class Articles extends Component<IProps, {}> {
  public static navigatorStyle = {
    navBarHidden: true,
    appbarElevation: 0,
  };
  public state = {
    index: 1,
    routes: categoriesStatic,
    newsIndex: 0,
    lifestyleIndex: 0,
    entertaimentIndex: 0,
    businessIndex: 0,
    propertyIndex: 0,
    farmingIndex: 0,
    feedIndex: 0,
    motorIndex: 0,
    opinionIndex: 0,
    breakingNewsIndex: 0,
    sportIndex: 1,
    feed: 1,
    news: 1,
    lifestyle: 1,
    entertaiment: 1,
    business: 1,
    property: 1,
    farming: 1,
    sport: 1,
    motor: 1,
    opinion: 1,
    breakingNews: 1,
    dataset: null,
    refreshing: false,
    appReady: false,
    isOpeningNewDetail: false,
  };
  // public videos: any;
  public feed: any;
  public news: any;
  public sport: any;
  public lifestyle: any;
  public entertaiment: any;
  public business: any;
  public property: any;
  public motors: any;
  public farming: any;
  public opinion: any;

  public async componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
    this.props.loadArticlesCategoryPage(
      {id: 2983, name: 'breakingNews', key: 'breakingNews'},
      1,
    );

    await analytics().logScreenView({
      screen_name: 'articles',
      screen_class: 'articles',
    });

    for (let index = 0; index < categoriesStatic.length; index++) {
      if (categoriesStatic[index].title.toLocaleLowerCase() !== 'videos') {
        this.props.loadArticlesCategoryPage(
          categoriesStatic[index],
          this.state[categoriesStatic[index].key],
        );
      }
    }
    this.props.loadVideos();

    AsyncStorage.getItem('user').then(user => {
      // dispatch(login.loginSuccess(user));
      this.props.loginSuccess(JSON.parse(user));
    });
    // this.props.navigator.setStyle({
    //   disabledBackGesture: false,
    //   disabledSimultaneousGesture: true,
    // });
    setTimeout(() => this.setState({appReady: true}), 3000);
  }

  public componentWillUnmount() {
    // C
    // Linking.removeEventListener('url', this.handleOpenURL);
  }

  public handleOpenURL = event => {
    // D
    this.navigate(event.url);
  };

  public navigate(url) {
    // E
    client
      .get('/articles/link?link=' + url)
      .then(resp => {
        if (resp.data.error) {
          Toast.show(resp.data.error, {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
          });
        } else {
          if (resp.data.article.images) {
            this.props.navigation.navigate('ArticlesDetail', {
              article: resp.data.article,
            });
          } else {
            Toast.show('Article not found', {
              duration: Toast.durations.LONG,
              position: Toast.positions.TOP,
              shadow: true,
              animation: true,
            });
          }
        }
      })
      .catch(e => {
        Alert.alert(
          'Error trying to login',
          'Ups, There was an error, try again in a few minutes.',
        );
      });
  }

  public getUrlForAnalytics(url: string): string {
    url = url.replace('http://connachttribune.ie/', '');
    url = url.replace('https://connachttribune.ie/', '');
    return url.length > 36 ? url.substr(0, 33) + '...' : url;
  }

  public async onCardPress(article, where?: string) {
    this.props.navigation.navigate('ArticlesDetail', {article});

    await analytics().logEvent('tap_article', {
      where,
      articleUrl: this.getUrlForAnalytics((article as Article).link + ''),
      id: (article as Article).id,
    });
  }

  public async onProfileClick() {
    await analytics().logEvent('tap_settings');

    let storage = await AsyncStorage.getItem('user');

    this.props.navigation.push('Profile', {
      title: 'App settings',
      animationType: 'fade',

      nameUser: JSON.parse(storage).firstName,
      loginType: JSON.parse(storage).auth,
      categories: JSON.parse(storage).categories,
      backButtonTitle: ' ',
    });
  }

  public async scrollContainer(e, category) {
    const itemHeight = 130;
    const currentOffset = Math.floor(e.nativeEvent.contentOffset.y);
    const currentItemIndex = Math.ceil(currentOffset / itemHeight);

    if (
      currentItemIndex % 4 === 0 &&
      currentItemIndex > this.state[category.key + 'Index']
    ) {
      this.setState({[category.key + 'Index']: currentItemIndex});
      this.props.loadArticlesCategoryPage(
        category,
        (this.state[category.key] += 1),
      );
      await analytics().logEvent('load_more_articles', {
        category: category.title,
        page: this.state[category.key],
      });
    }
  }

  public async endReached(category) {
    this.setState({
      [category.key + 'Index']: this.state[category.key + 'Index'] + 1,
    });
    this.props.loadArticlesCategoryPage(
      category,
      (this.state[category.key] += 1),
    );

    await analytics().logEvent('load_more_articles', {
      category: category.title,
      page: this.state[category.key],
    });
  }

  public _renderTabBar = props => {
    // const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View>
        <StatusBar backgroundColor={'#a90c20'} barStyle="light-content" />
        <Header
          onGoFeed={() => this.setState({index: 1})}
          navigator={navigator}
          onProfileClick={() => this.onProfileClick()}
        />
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: 'white'}}
          scrollEnabled={true}
          style={{
            backgroundColor: palette.red,
            shadowOpacity: 0,
            elevation: 0,
          }}
          tabStyle={{paddingHorizontal: 0, width: 100}}
          labelStyle={{fontSize: 12, marginHorizontal: 0, marginVertical: 4}}
          // TODO go to top
          onTabPress={e => this.goTop(e)}
        />
      </View>
    );
  };
  public goTop(route) {
    if (
      route.route.key === categoriesStatic[this.state.index].key &&
      route.route.key !== 'videos'
    ) {
      this[route.route.key].scrollToOffset({offset: 0, animated: true});
    }
  }
  public _onRefresh = async category => {
    this.setState({refreshing: true});
    this.state[category.key] = 1;
    this.state[category.key + 'Index'] = 0;
    await this.props.loadArticlesCategoryPage(
      category,
      this.state[category.key],
      true,
    );
    await analytics().logEvent('articles_refresh', {category: category.id});
    this.setState({refreshing: false});
  };

  public _renderScene = route => {
    if (
      Math.abs(this.state.index - this.state.routes.indexOf(route.route)) > 2
    ) {
      // TODO return other view similar at scrollVIews
      return <View />;
    }

    if (route.route.key === 'videos') {
      return <Videos videos={this.props.videos} />;
    }

    return (
      <View>
        {route.route.key === 'feed' && (
          <BreakingNews
            articles={this.props.articlesBreakingNews}
            navigator={this.props.navigator}
            navigation={this.props.navigation}
          />
        )}

        {/* <CustomFlatList
          getData={this.props[this.getPropName(route.route.key)]}
          customRoute={route}
          ref={[route.route.key]}
          // onRefresh={this._onRefresh(route.route)}
          navigate={this.props.navigation}
          // renderItem={this.renderCard}
        /> */}

        <FlatList
          data={this.props[this.getPropName(route.route.key)]}
          renderItem={data => this.renderCard(data, route.route.key === 'feed')}
          keyExtractor={item => (item as Article).id + Math.random().toString()}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          onEndReachedThreshold={0.5}
          onEndReached={() => this.endReached(route.route)}
          refreshing={this.state.refreshing}
          onRefresh={() => this._onRefresh(route.route)}
          contentContainerStyle={{backgroundColor: '#F0F0F0'}}
          ref={r => (this[route.route.key] = r)}
        />
      </View>
    );
  };

  public getPropName(key) {
    return 'articles' + _.capitalize(key);
  }

  public renderCard(data, isFeed: boolean) {
    const {item, index} = data;
    const article = item;
    const i = index;
    if (i === 0) {
      return (
        <>
          <MainNew
            key={i}
            article={article}
            onPress={() => this.onCardPress(article, 'mainNew')}
          />
        </>
      );
    }
    return (
      <View key={i}>
        {i === 3 && (
          <View
            style={{
              marginVertical: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 0,
            }}>
            {/* <Banner /> */}

            <BannerAd
              unitId={
                Platform.OS === 'ios'
                  ? 'ca-app-pub-1593000496031877/1315551873'
                  : 'ca-app-pub-1593000496031877/7624496272'
              }
              size={BannerAdSize.BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          </View>
        )}

        <Card
          showCategory={isFeed}
          article={article}
          onPress={() => this.onCardPress(article, 'normalNew')}
        />
      </View>
    );
  }

  // public myLoader() {
  //   return (
  //     <ScrollView>
  //       {/* <ContentLoader
  //         primaryColor="#a7a7a7"
  //         width={Dimensions.get('window').width}
  //         height={250}>
  //         <Rect x="0%" y="0%" rx="3" ry="3" width="100%" height="250" />
  //       </ContentLoader>
  //       <ContentLoader
  //         speed={0.2}
  //         primaryColor="white"
  //         secondaryColor="#ccc"
  //         width={Dimensions.get('window').width}
  //         height={Dimensions.get('window').height - 250}>
  //         <Rect x="5%" y="20" ry="3" width="90%" height="110" />
  //         <Rect x="5%" y="150" rx="3" ry="3" width="90%" height="110" />
  //         <Rect x="5%" y="280" rx="3" ry="3" width="90%" height="110" />
  //       </ContentLoader> */}
  //     </ScrollView>
  //   );
  // }

  public render() {
    return (
      <View style={{flex: 1}}>
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={async index => {
            this.setState({index});
            //  &&
            await analytics().logEvent('swipe_category', {
              category: categoriesStatic[index].title,
            });
          }}
          initialLayout={{height: 0, width: Dimensions.get('window').width}}
        />

        <BannerAd
          unitId={
            Platform.OS === 'ios'
              ? 'ca-app-pub-1593000496031877/5196103432'
              : 'ca-app-pub-1593000496031877/3445987239'
          }
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    );
  }

  // public viewAdRewarded() {
  //   // AdMobRewarded.setAdUnitID("ca-app-pub-1593000496031877/4265148847");
  //   // AdMobRewarded.requestAd()
  //   //   .then(() => AdMobRewarded.showAd())
  //   //   .catch((error) => console.error(error));
  // }
}
