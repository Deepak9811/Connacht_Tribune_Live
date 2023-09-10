import * as React from 'react';
import { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { palette } from '../../styles';
import styles from './style';

const LabelInputForgot = ({ onTextChange, onPress, label, placeholder, type, ...rest }) => (
    <View style={[rest.style]}>
        <Text style={styles.label}>{label}</Text>
        <View style={[{ flexDirection: 'row' }, styles.borderInputForgot]}>
            <View style={{ width: '57%' }}>
                <TextInput {...rest} style={styles.input} onChangeText={onTextChange} underlineColorAndroid="transparent" placeholder={placeholder} placeholderTextColor="#ccc" keyboardType={type} />
            </View>
            <View style={[{ width: '43%' }, styles.forgotPass]}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
                <Text style={[{ color: 'red', fontSize: 10 }, styles.input]}>
                    forgot password
                </Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>
);

export default LabelInputForgot;
