import * as React from 'react';
import {Component} from 'react';
import {Text, TextInput, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {palette} from '../../styles';
import styles from './style';

const LabelInput = ({
  secure = false,
  icon = '',
  label = false,
  error = '',
  onTextChange,
  onBlur,
  labelText = '',
  placeholder,
  type,
  disable,
  ...rest
}) => (
  <View>
    <View>
      <Text style={{color: 'white', position: 'absolute', top: 5, left: 0}}>
        {error ? error : null}
      </Text>
    </View>
    <View style={[rest.style, styles.container]}>
      {label ? <Text style={styles.label}>{labelText}</Text> : null}
      <TextInput
        {...rest}
        editable={!disable}
        secureTextEntry={secure}
        style={[styles.input, {width: icon ? '90%' : '100%'}]}
        onChangeText={onTextChange}
        onTouchStart={onBlur}
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        placeholderTextColor="gray"
        keyboardType={type}
      />
      {icon ? (
        <View style={{paddingTop: 12}}>
          <Icon name={icon} color="gray" />
        </View>
      ) : null}
    </View>
  </View>
);

export default LabelInput;
