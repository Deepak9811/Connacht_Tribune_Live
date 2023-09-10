import * as React from 'react';
import {Component} from 'react';
import {Animated, Text, TextInput, View} from 'react-native';
import {Icon} from 'react-native-elements';
// import styles from './style';

export default class FloatLabelInput extends Component<
  {value; label; onTextChange; secure?; icon; type?},
  {}
> {
  public _animatedIsFocused;
  public state = {
    isFocused: false,
    border: 1,
    secure: this.props.secure,
  };
  public componentWillMount() {
    this._animatedIsFocused = new Animated.Value(
      this.props.value === '' ? 0 : 1,
    );
  }

  public handleFocus = () => this.setState({isFocused: true, border: 2});
  public handleBlur = () => this.setState({isFocused: false});

  public componentDidUpdate() {
    // Animated.timing(this._animatedIsFocused, {
    //   toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
    //   duration: 200,
    // }).start();
  }
  public render() {
    const {label, icon, type, ...props} = this.props;
    const {isFocused, border, secure} = this.state;
    const labelStyle = {
      position: 'absolute',
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [35, 10],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 12],
      }),
    };
    return (
      <View
        style={[
          {
            paddingTop: 18,
            width: '100%',
            borderBottomWidth: border,
            borderColor: 'white',
          },
        ]}>
        <Animated.Text style={[{color: 'white'}]}>{label}</Animated.Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{width: '90%'}}>
            <TextInput
              style={{height: 40, color: 'white'}}
              onFocus={this.handleFocus}
              onEndEditing={() => this.setState({border: 1})}
              onBlur={this.handleBlur}
              onChangeText={this.props.onTextChange}
              underlineColorAndroid="transparent"
              secureTextEntry={secure}
              keyboardType={type ? type : 'default'}
              autoCapitalize="none"
            />
          </View>

          <View style={{width: '10%'}}>
            {icon ? (
              <Icon
                underlayColor="transparent"
                // containerStyle={{position: 'absolute', top: 32, right: 0}}
                name="visibility"
                color="white"
                onPress={() => this.setState({secure: !secure})}
              />
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}
