import * as React from 'react';
import {Component} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import YouTube from 'react-native-youtube';
import {palette} from '../../../../styles';
import styles from './styles';
import Video from './video';

export default class Videos extends Component<{videos: any[]}, {}> {
  public state = {currVideo: undefined, error: 'noup', height: 0};

  public mainVideo() {
    if (this.state.currVideo) {
      return this.state.currVideo;
    } else if (this.props.videos.length > 0) {
      return this.props.videos[0];
    }
    return undefined;
  }

  public render() {
    const {videos} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: palette.dark}}>
        {this.mainVideo() && (
          <View style={{height: 225}}>
            <WebView
              source={{
                uri: `https://www.youtube.com/embed/${
                  this.mainVideo().id
                }?&autoplay=1&showinfo=1&controls=1&modestbranding=1&rel=0`,
              }}
              mediaPlaybackRequiresUserAction={true}
              allowsInlineMediaPlayback={false}
            />
          </View>
        )}
        <ScrollView style={styles.videosContainer}>
          {videos.map((v, i) => (
            <Video
              video={v}
              key={i}
              onClick={() => this.setState({currVideo: v})}
              selected={v.id === this.mainVideo().id}></Video>
          ))}
        </ScrollView>
      </View>
    );
  }
}
