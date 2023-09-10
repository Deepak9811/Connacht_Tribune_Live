import * as React from 'react';
import { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { withShadow } from '../../../../styles';
import styles from './style';

const LoginButton = ({ onPress, type }) => (
    <TouchableOpacity style={{ width: '45%' }} onPress={onPress} activeOpacity={0.8}>
        <View style={[styles.button, styles[type]]}>
            <Text style={styles.text}>
                { type === 'fb' ? 'Facebook Login ' : 'Google Login' }
            </Text>
        </View>
    </TouchableOpacity>
);

export default LoginButton;
