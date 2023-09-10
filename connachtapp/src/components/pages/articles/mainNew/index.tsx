import moment from 'moment';
import * as React from 'react';
import {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Article} from '../../../connacht-tribune-models';
import styles from './style';

export default class MainNew extends React.PureComponent<
  {article: Article; onPress?},
  {}
> {
  public static navigatorStyle = {};

  public getArticleDate(articleDate) {
    const date = moment(new Date(articleDate).getTime());
    if (moment().diff(date, 'days') > 1) {
      return date.format('MMM DD, YYYY');
    } else {
      return date.fromNow();
    }
  }

  // Remove the unicode characters
  public getCleanTitle(title: string): string {
    return title.replace(/&#\d*;/g, character => {
      const number = +character.slice(2, 6);
      return String.fromCharCode(number);
      // return String.fromCharCode(character);
    });
  }

  public render() {
    const {article, onPress} = this.props;
    const articleHtml = article.content;
    return (
      <TouchableOpacity
        onPress={() => (onPress ? onPress() : null)}
        activeOpacity={0.8}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Image
            style={{width: '100%', height: 250}}
            source={{
              uri: article?.images?.fullSize
                ? article.images.fullSize
                : undefined,
            }}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,1)']}
            style={styles.gradientContainer}>
            <Text style={styles.header}>
              {this.getCleanTitle(article.title + '')}
            </Text>
            <Text style={styles.date}>
              {this.getArticleDate(article.date)} by{' '}
              {article.author ? article.author.name : 'author'}
            </Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  }
}
