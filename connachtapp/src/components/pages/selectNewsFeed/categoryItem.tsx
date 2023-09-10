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

export interface IProps {
  category: any;
  onPress: any;
  picked: boolean;
}

export interface IState {
  picked: boolean;
}

// class CategoryItem extends Component<IProps, {}> {
export default class SelectNewsFeed extends Component<IProps, IState> {
  public styles = StyleSheet.create({
    item: {
      flexBasis: '33%',
      flexGrow: 1,
      flexShrink: 1,
      display: 'flex',
      alignItems: 'center',
      marginBottom: 10,
      // width: 100,
    },
    image: {
      width: 110,
      height: 110,
      borderRadius: 55,
      marginBottom: 10,
    },
    name: {
      color: 'white',
      // fontFamily: 'Montserrat-Regular',
      fontSize: 12,
    },
    pickedOverlay: {
      width: 110,
      height: 110,
      borderRadius: 100,
      position: 'absolute',
      top: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    overlayIcon: {
      color: 'white',
    },
  });

  // public static defaultProps: {category: any, onPress: any, picked: any} = {category: {}, onPress: undefined, picked: false };
  // public state: {picked: boolean};

  // public constructor(props) {
  //   super(props);
  //   this.props = {
  //     category: props.category,
  //     onPress: props.onPress,
  //     picked: !!props.picked,
  //   };
  //   this.state = {
  //     picked: !!props.picked,
  //   };
  // }

  public state = {picked: !!this.props.picked};
  public touch() {
    this.setState({picked: !this.state.picked});
    this.props.onPress(!this.state.picked);
    // this.state.picked = !!!this.state.picked;
    // this.render();
  }

  public render() {
    const {category, onPress} = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.touch()}
        activeOpacity={0.8}
        style={this.styles.item}>
        <View style={this.styles.item}>
          <Image
            style={this.styles.image}
            source={category?.image ? category.image : null}
          />
          {this.state.picked && (
            <View
              style={[
                this.styles.pickedOverlay,
                {backgroundColor: 'rgba(39, 170, 225,0.65)'},
              ]}>
              <Icon name="check" color="white" size={50}></Icon>
            </View>
          )}
          <Text style={this.styles.name}>{category.name.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
