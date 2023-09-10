import * as React from 'react';
import { Component } from 'react';
import { TextInput, View } from 'react-native';
import { withShadow } from '../../styles';
import styles from './style';

const Card = ({ children, style }) => (
    <View style={[styles.card, withShadow, style]}>
        {children}
    </View>
);

export default Card;
