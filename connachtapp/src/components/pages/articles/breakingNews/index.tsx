import moment from 'moment';
import * as React from 'react';
import {Component} from 'react';
import {
  Animated,
  Easing,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
// import firebase from 'react-native-firebase';
import analytics from '@react-native-firebase/analytics';
// import {Expand} from 'react-native-simple-expand';
import {palette} from '../../../../styles';
import {Article} from '../../../connacht-tribune-models';
import style from './style';

export default class BreakingNews extends Component<
  {articles: Article[]; navigator; navigation; onPress?},
  {}
> {
  constructor(props) {
    super(props);
    // console.log('test');
  }
  public myRef = React.createRef();
  public state = {
    opened: false,
    dropdownHeight: new Animated.Value(0),
    ledOpacity: new Animated.Value(1),
    mainNewOpacity: new Animated.Value(1),
    currentNewIndex: 0,
    articles: this.props.articles,
    // articles: this.props.articles.slice(0, 30),
  };
  public animatedValue;

  public componentDidMount() {
    Animated.loop(
      Animated.timing(this.state.ledOpacity, {
        toValue: 0.5,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
    setInterval(() => this.changeMainNew(), 7000);
  }

  componentWillUnmount(): void {
    this.setState({opened: false});
  }

  public changeMainNew() {
    if (this.props.articles.length === 0) return;
    Animated.timing(this.state.mainNewOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.quad,
    }).start(() => {
      this.setState(prevState => {
        const prevIndex = (prevState as any).currentNewIndex;
        return {currentNewIndex: (prevIndex + 1) % this.props.articles.length};
      });
      Animated.timing(this.state.mainNewOpacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.quad,
        useNativeDriver: true,
      }).start();
    });
  }

  public async openDropdown() {
    // console.log('dsa', this.state.articles);
    this.setState({opened: true});

    // firebase.analytics().logEvent('open_breakingNews_dropdown');
    Animated.timing(this.state.dropdownHeight, {
      toValue: this.props.articles.length * 80,
      duration: 500,
      easing: Easing.cubic,
      useNativeDriver: false,
    }).start();
    await analytics().logEvent('open_breakingNews_dropdown');
  }

  public async closeDropdown() {
    // firebase.analytics().logEvent('close_breakingNews_dropdown');
    this.setState({opened: false});

    Animated.timing(this.state.dropdownHeight, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    await analytics().logEvent('close_breakingNews_dropdown');
  }

  public getUrlForAnalytics(url: string): string {
    url = url.replace('http://connachttribune.ie/', '');
    return url.length > 36 ? url.substr(0, 33) + '...' : url;
  }

  public async openArticle(article: Article, where?: string) {
    // firebase.analytics().logEvent('tap_article', { where, articleUrl: this.getUrlForAnalytics((article as Article).link + ''), id: (article as Article).id });

    await analytics().logEvent('tap_article', {
      where,
      articleUrl: this.getUrlForAnalytics((article as Article).link + ''),
      id: (article as Article).id,
    });
    this.props.navigation.navigate('ArticlesDetail', {article});
    // this.props.navigator.push({
    //   screen: 'connachtapp.ArticlesDetail',
    //   passProps: {article},
    //   animationType: 'fade',
    // });
  }

  public render() {
    // console.log('data get :->> ', this.props.articles.length);
    const animatedHeight = {maxHeight: this.state.dropdownHeight};
    const animatedOpacity = {opacity: this.state.ledOpacity};

    return (
      <View>
        <View style={style.block}>
          <Animated.View style={animatedOpacity}>
            <Icon name="lens" color={palette.red} size={20} />
          </Animated.View>
          {this.props.articles.length === 0 ? (
            <View style={{flex: 1}}>
              <View
                style={{
                  height: 8,
                  backgroundColor: 'rgba(250,250,250,0.2)',
                  width: '80%',
                  borderRadius: 2,
                  marginLeft: 20,
                }}></View>
              <View
                style={{
                  height: 8,
                  backgroundColor: 'rgba(250,250,250,0.2)',
                  width: '40%',
                  borderRadius: 2,
                  marginLeft: 20,
                  marginTop: 5,
                }}></View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() =>
                this.props.articles.length > 0 &&
                this.openArticle(
                  this.props.articles[this.state.currentNewIndex],
                  'mainBreakingNew',
                )
              }
              style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
              <Animated.View
                style={[
                  styles.animatedNewOpacity,
                  {opacity: this.state.mainNewOpacity},
                ]}>
                <Text
                  numberOfLines={2}
                  lineBreakMode="tail"
                  style={style.newHeader}>
                  {this.props.articles[this.state.currentNewIndex].title}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          )}
          <View></View>

          {/* {console.log('running :-----> ', this.state.opened)} */}

          <TouchableOpacity
            activeOpacity={0.5}
            style={style.openButton}
            onPress={() =>
              this.state.opened ? this.closeDropdown() : this.openDropdown()
            }>
            {this.state.opened ? (
              <Icon name="chevron-up" color="white" type="evilicon" size={35} />
            ) : (
              <Icon
                name="chevron-down"
                color="white"
                type="evilicon"
                size={35}
              />
            )}
          </TouchableOpacity>
        </View>
        <Animated.View style={[style.articlesBox, animatedHeight]}>
          {this.state.opened && (
            <>
              {/* {console.log('data :->> ', this.props.articles)} */}
              <FlatList
                data={this.props.articles}
                keyExtractor={item =>
                  (item as Article).id + Math.random().toString()
                }
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={1}
                renderItem={({item, index}) => this.newItem(item, index)}
              />
            </>
          )}

          {/* {this.state.opened &&
            this.state.articles.map((a, i) => this.newItem(a, i))} */}
        </Animated.View>
      </View>
    );
  }

  private newItem(article: Article, i: number) {
    console.log('running 123:---------->', i);
    return (
      <View key={i}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this.openArticle(article, 'breakingNewsDropdown')}>
          <View style={style.articleItem}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={style.timeAgo}>
                {moment(article.date)
                  .fromNow()
                  .replace('hours', 'h')
                  .replace('minutes', 'm')
                  .replace('days', 'd')
                  .replace('an', '1')
                  .replace('hour', 'h')
                  .replace('minute', 'm')
                  .replace('a day', '1 day')}
              </Text>
              <Text
                numberOfLines={2}
                lineBreakMode="tail"
                style={style.articleItemTitle}>
                {article.title}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            backgroundColor: 'rgba(250,250,250,0.1)',
            width: '110%',
            marginLeft: '-5%',
          }}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animatedNewOpacity: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
