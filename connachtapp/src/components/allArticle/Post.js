import analytics from '@react-native-firebase/analytics';
import React, {useCallback} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Banner from '../banner/Banner';
import Card from '../pages/articles/card';
import MainNew from '../pages/articles/mainNew';

const Post = props => {
  const customRoute = props.customRoute;
  const getData = props.getData;
  // console.log('customRoute :->> ', props.customRoute);
  // console.log(props.getData, 'getData');

  const renderCard = useCallback((data, isFeed) => {
    const {item, index} = data;
    const article = item;
    const i = index;
    // useCallback(() => {
    // console.log('data checking :->>>>> ', data);
    // console.log('render card');
    if (i === 0) {
      return (
        <>
          <MainNew
            key={i}
            article={article}
            onPress={() => onCardPress(article, 'mainNew')}
          />
        </>
      );
    }
    return (
      <View key={i}>
        {i === 3 && (
          <View style={{margin: 20, marginBottom: 0}}>
            <Banner />
          </View>
        )}

        <Card
          showCategory={isFeed}
          article={article}
          onPress={() => onCardPress(article, 'normalNew')}
        />
      </View>
    );
    // }, []);
  });

  const onCardPress = async (article, where) => {
    // this.props.navigator.showModal({ screen: 'connachtapp.ArticlesDetail', passProps: { article }, animationType: 'fade' });
    props.navigate.navigate('ArticlesDetail', {article});
    // navigate('ArticlesDetail', {article});
    // this.props.navigator.push({
    //   screen: 'ArticlesDetail',
    //   passProps: {article},
    //   animationType: 'fade',
    // });

    await analytics().logEvent('tap_article', {
      where,
      articleUrl: this.getUrlForAnalytics(article.link + ''),
      id: article.id,
    });
  };

  return (
    <>
      <FlatList
        horizontal={false}
        data={getData}
        renderItem={data => renderCard(data, customRoute === 'feed')}
        keyExtractor={item => item.id + Math.random().toString()}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        onEndReachedThreshold={0.5}
        onEndReached={() => this.endReached(customRoute.route)}
        // refreshing={this.state.refreshing}
        // onRefresh={() => this._onRefresh(customRoute.route)}
        contentContainerStyle={{backgroundColor: '#F0F0F0'}}
        // ref={r => (this[customRoute.route.key] = r)}
      />

      {/* <Text>hello</Text> */}
    </>
  );
};

export default Post;

const styles = StyleSheet.create({});
