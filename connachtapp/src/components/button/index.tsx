import * as React from 'react';
import {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {palette, withShadow} from '../../styles';

interface BTProps {
  onPress: () => null;
  text: string;
  dissabled: boolean;
  style: any;
}

export default ({onPress, text, style, dissabled}: BTProps) => (
  <TouchableOpacity
    disabled={dissabled}
    onPress={onPress}
    activeOpacity={0.8}
    style={style}>
    <View style={[styles.button, dissabled ? styles.buttonDissabled : null]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: '100%',
    borderRadius: 4,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonDissabled: {
    backgroundColor: palette.text,
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
});
