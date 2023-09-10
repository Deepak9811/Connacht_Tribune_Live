import moment from 'moment';
import * as React from 'react';
import {Component} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {palette} from '../../../../styles';

export default class Video extends Component<
  {video: any; onClick; selected},
  {}
> {
  public render() {
    const {video, onClick, selected} = this.props;
    return (
      <TouchableOpacity
        style={{width: '100%', marginRight: 10}}
        onPress={onClick}
        activeOpacity={0.8}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: selected
              ? palette.primary
              : 'rgba(250,250,250,0.05)',
            padding: 10,
            marginBottom: 10,
          }}>
          <Image
            source={{
              uri: video.thumbnailLarge ? video.thumbnailLarge : undefined,
            }}
            style={{width: '40%', height: 80}}></Image>
          <View style={{flex: 1}}>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                fontFamily: 'Georgia',
                color: 'white',
                paddingHorizontal: 10,
              }}>
              {video.title}
            </Text>
            <Text
              style={{
                color: '#999',
                fontSize: 16,
                fontFamily: 'Georgia',
                paddingHorizontal: 10,
                marginBottom: 2,
              }}>
              {moment(video.date).format('MMM DD, YYYY')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
