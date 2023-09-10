import * as React from 'react';
import {Component} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Article} from '../../../connacht-tribune-models';
import CardList from '../card';

console.log('first check 3');
// TODO Remove ?
export default class ContainerCards extends Component<
  {articles: Article[]; onCardPress?; onScroll?},
  {}
> {
  public render() {
    const {articles, onCardPress, onScroll} = this.props;
    const cards = () => {
      return articles.map((article, i) => {
        if (article.images.thumbnail !== null) {
          return (
            <>
              <React.Fragment key={i}>
                <CardList
                  key={i}
                  article={article}
                  onPress={() => onCardPress(article)}
                />
              </React.Fragment>
            </>
          );
        }
      });
    };
    return (
      <ScrollView
        scrollEventThrottle={300}
        style={{flex: 1, backgroundColor: 'gray'}}>
        {cards()}
      </ScrollView>
    );
  }
}
