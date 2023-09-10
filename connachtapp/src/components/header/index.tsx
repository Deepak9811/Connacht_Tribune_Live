import * as React from 'react';
import {Component} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {palette} from '../../styles';
import storage from '../../utils/storage';
const logo = require('../../assets/images/connacht-tribune-1.png');

export default class Header extends Component<
  {navigator; onProfileClick?; onGoBack?; onGoFeed?},
  {}
> {
  public goBack() {
    this.props.onGoBack();
  }

  public render() {
    // const {  onPressCategories, showIconCategories } = this.props;
    return (
      <SafeAreaView
        style={{
          backgroundColor: palette.darkRed,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 5,
            paddingHorizontal: 2,
            backgroundColor: palette.red,
          }}>
          {!!this.props.onGoBack && (
            <View style={{marginTop: 10}}>
              <Icon
                underlayColor="transparent"
                name="chevron-left"
                onPress={() => this.goBack()}
                size={30}
                color="rgba(250,250,250,0.8)"
              />
            </View>
          )}

          {!this.props.onGoBack && <View style={{width: 25}}></View>}
          <View
            style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableHighlight
              underlayColor="transparent"
              style={{
                height: 50,
                width: '100%',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              onPress={() =>
                this.props.onGoFeed ? this.props.onGoFeed() : null
              }>
              <Image
                source={logo}
                style={{width: '30%', height: 50, resizeMode: 'contain'}}
              />
            </TouchableHighlight>
          </View>
          {!!this.props.onProfileClick && (
            <View style={{marginTop: 15}}>
              <Icon
                underlayColor="transparent"
                name="dots-vertical"
                onPress={() => this.props.onProfileClick()}
                size={25}
                color="rgba(250,250,250,0.8)"
                type="material-community"
              />
            </View>
          )}
          {!this.props.onProfileClick && <View style={{width: 25}}></View>}
        </View>
      </SafeAreaView>
    );
  }
}
