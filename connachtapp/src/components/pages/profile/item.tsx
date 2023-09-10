import * as React from 'react';
import {Component} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {palette} from '../../../styles';

export interface IProps {
  onPress: any;
  text: string;
  icon?: string;
}

export interface IState {
  picked: boolean;
}

export default class ItemProfile extends Component<IProps, IState> {
  public styles = StyleSheet.create({
    item: {
      width: '100%',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: palette.primary,
      flexDirection: 'row',
    },
    name: {
      color: 'white',
      // fontFamily: 'Montserrat-Regular',
      fontSize: 18,
    },
  });

  public render() {
    const {text, onPress, icon} = this.props;
    return (
      <TouchableOpacity
        onPress={() => (onPress ? onPress(text) : null)}
        activeOpacity={0.8}
        style={this.styles.item}>
        {icon ? (
          <Icon
            underlayColor="transparent"
            size={20}
            containerStyle={{marginHorizontal: 10}}
            name={icon}
            color="white"
            type="material-community"
          />
        ) : null}
        <Text style={this.styles.name}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
