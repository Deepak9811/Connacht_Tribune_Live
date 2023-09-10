import moment from 'moment';
import * as React from 'react';
import {Component} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {categoriesStatic} from '../../../../utils/staticCategories';
import {Article, Category} from '../../../connacht-tribune-models';
import styles from './style';

export default class CardList extends React.PureComponent<
  {article: Article; onPress?; showCategory?: boolean},
  {}
> {
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

  public getMainCategory(categories: Category[]) {
    return categoriesStatic.find(
      cs => categories.findIndex(c => c.id === cs.id) !== -1,
    );
  }

  public render() {
    const {article, onPress, showCategory} = this.props;
    const category = article.categories
      ? (this.getMainCategory(article.categories) as any)
      : undefined;
    const images = () => {
      return (
        <Image
          style={{width: '30%', height: 110}}
          source={{
            uri: article?.images?.thumbnail
              ? article.images.thumbnail
              : undefined,
          }}
        />
      );
    };

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => (onPress ? onPress() : null)}
        activeOpacity={0.8}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            elevation: 5,
          }}>
          {images()}
          <View
            style={{
              width: '65%',
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            {/* <Text style={{color: 'red'}}>Id: {article.id}</Text> */}
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
              {this.getCleanTitle(article.title + '')}
            </Text>
            {showCategory && category && (
              <Text
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: category.color,
                  padding: 5,
                  color: 'white',
                  textAlign: 'center',
                  // fontFamily: 'Montserrat-Regular',
                  fontSize: 10,
                }}>
                {category.title}
              </Text>
            )}
            {/* <Text style={styles.title}>{article.author.name}</Text> */}
            <Text style={{marginBottom: 2, color: '#999'}}>
              {this.getArticleDate(article.date)} by{' '}
              {article.author ? article.author.name : ''}{' '}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
