import moment from 'moment';
import * as React from 'react';
import {Component} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  LayoutAnimation,
  Platform,
  ScrollView,
  Share,
  Text,
  View,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import {Article} from '../../../connacht-tribune-models';
// import {AdMobBanner} from 'react-native-admob';
import analytics from '@react-native-firebase/analytics';
import {Icon} from 'react-native-elements';
import {
  AdEventType,
  AppOpenAd,
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import HTML from 'react-native-render-html';
import {palette} from '../../../../styles';
import Header from '../../../header/index';

export default class ArticleDetail extends Component<
  {article: Article; navigator; navigation},
  {}
> {
  public static navigatorStyle = {
    // navBarBackgroundColor: palette.dark,
    navBarHidden: true,
    appbarElevation: 0,
  };
  public HEADER_MAX_HEIGHT = 250;
  public HEADER_MIN_HEIGHT = 20;
  public HEADER_SCROLL_DISTANCE =
    this.HEADER_MAX_HEIGHT - this.HEADER_MIN_HEIGHT;
  public state = {
    isActionButtonVisible: true,
    scrollY: new Animated.Value(0),
  };
  public _listViewOffset = 0;

  public constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  public async componentDidMount() {
    // firebase.analytics().setCurrentScreen('article_detail');
    await analytics().logScreenView({
      screen_name: 'article_detail',
      screen_class: 'article_detail',
    });
  }

  // TODO implement this in function onScroll
  public _onScroll = event => {
    // Simple fade-in / fade-out animation
    // TODO no animation
    const CustomLayoutLinear = {
      duration: 100,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
    };
    // Check if the user is scrolling up or down by confronting the new scroll position with your own one
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction =
      currentOffset > 0 && currentOffset > this._listViewOffset ? 'down' : 'up';
    // If the user is scrolling down (and the action-button is still visible) hide it
    const isActionButtonVisible = direction === 'up';
    if (isActionButtonVisible !== this.state.isActionButtonVisible) {
      LayoutAnimation.configureNext(CustomLayoutLinear);
      this.setState({isActionButtonVisible});
    }
    // Update your scroll position
    this._listViewOffset = currentOffset;
  };

  public async share(link) {
    // firebase.analytics().logEvent('tap_share');
    await analytics().logEvent('tap_share');

    Share.share(
      {
        message: link,
        url: link,
        title: '',
      },
      {
        // Android only:
        dialogTitle: 'Share this article',
        // iOS only:
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
      },
    );
  }

  public close() {
    this.props.navigation.goBack();
    // navigator.popToRoot({
    //   animated: true,
    //   animationType: 'slide-horizontal',
    // });
  }

  public async componentWillUnmount() {
    // firebase.analytics().logEvent('detail_close');
    // firebase.analytics().setCurrentScreen('articles');
    await analytics().logEvent('detail_close');

    await analytics().logScreenView({
      screen_name: 'articles',
      screen_class: 'articles',
    });
  }

  public getArticleContentClean(content: string) {
    let cleanContent = content
      .replace('<p>', '<p class="fontMontserrat">')
      .replace(/width="\d+"/g, '')
      .replace(/height="\d+"/g, '');
    if (content.includes('<p><strong>Get the Connacht Tribune Live')) {
      cleanContent = cleanContent.substring(
        0,
        cleanContent.indexOf('<p><strong>Get the Connacht Tribune Live'),
      );
    }
    return cleanContent;
  }

  public render() {
    const {article} = this.props.route.params;
    // console.log('props data check :->  ', article);
    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [
        0,
        this.HEADER_SCROLL_DISTANCE / 2,
        this.HEADER_SCROLL_DISTANCE,
      ],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, this.HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });
    return (
      <View style={{flex: 1}}>
        <Header navigator={navigator} onGoBack={() => this.close()}></Header>
        <HeaderImageScrollView
          maxHeight={article.images.fullSize ? 250 : 0}
          minHeight={0}
          renderHeader={() =>
            article.images.fullSize ? (
              <Animated.Image
                style={{
                  width: Dimensions.get('window').width,
                  height: 250,
                  opacity: imageOpacity,
                  transform: [{translateY: imageTranslate}],
                }}
                source={{uri: article.images.fullSize}}
              />
            ) : null
          }
          maxOverlayOpacity={0}
          overlayColor={palette.red}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
            {useNativeDriver: false},
          )}
          // onScroll={e => this.state.scrollY.setValue(e.nativeEvent.contentOffset.y)}
          minOverlayOpacity={0.0}>
          <View
            style={{
              width: '85%',
              alignSelf: 'center',
              flexDirection: 'row',
              marginTop: 15,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  color: '#666',
                  //  fontFamily: 'Montserrat-Regular'
                }}>
                {moment(article.date).format('DD MMMM YYYY')} |{' '}
                {moment(article.date).format('LT')}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Icon name="person" size={15} color="#666" />
                <Text
                  style={{
                    color: '#666',
                    //  fontFamily: 'Montserrat-Regular'
                  }}>
                  {' '}
                  {article.author ? article.author.name : ''}
                </Text>
              </View>
            </View>
            <View>
              <Icon
                name="share"
                size={30}
                color={palette.primary}
                onPress={() => this.share(article.link)}
              />
            </View>
          </View>
          <View style={{width: '85%', alignSelf: 'center'}}>
            <HTML
              classesStyles={{
                textBlack: {color: 'black', fontFamily: 'Georgia'},
              }}
              source={{
                html: '<h2 class="textBlack">' + article.title + '</h2>',
              }}
              contentWidth={Dimensions.get('window').width}
            />
            {/* <AdMobBanner
              adSize="banner"
              adUnitID={
                Platform.OS === 'ios'
                  ? 'ca-app-pub-1593000496031877/1793589630'
                  : 'ca-app-pub-1593000496031877/8599091629'
              }
              //  didFailToReceiveAdWithError={this.bannerError}
              onAdFailedToLoad={error => console.error(error)}
              style={{marginHorizontal: 0}}
              // onAdFailedToLoad={(err)=> console.error(err)}
            /> */}

            <BannerAd
              unitId={
                Platform.OS === 'ios'
                  ? 'ca-app-pub-1593000496031877/1793589630'
                  : 'ca-app-pub-1593000496031877/8599091629'
              }
              size={BannerAdSize.BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
            <HTML
              contentWidth={Dimensions.get('window').width}
              classesStyles={{
                fontMontserrat: {
                  fontFamily: 'georgia',
                  color: 'black',
                },
              }}
              source={{
                html: article.content
                  ? this.getArticleContentClean(article.content)
                  : '',
              }}
            />
            {/* <AdMobBanner
              adSize="mediumRectangle"
              adUnitID={
                Platform.OS === 'ios'
                  ? 'ca-app-pub-1593000496031877/1511067347'
                  : 'ca-app-pub-1593000496031877/3626036354'
              }
              //  didFailToReceiveAdWithError={this.bannerError}
              onAdFailedToLoad={error => console.error(error)}
              style={{marginHorizontal: 0}}
              // onAdFailedToLoad={(err)=> console.error(err)}
            /> */}
            <View style={{height: 20}}></View>
          </View>
        </HeaderImageScrollView>

        {/* {false && this.state.isActionButtonVisible ? ( */}
        {/* <ActionButton
          buttonColor={palette.primary}
          onPress={() => this.share(article.link)}>
          <Icon name="share" size={25} color="white" />
        </ActionButton> */}
        {/* ) : null} */}
      </View>
    );
  }
}
