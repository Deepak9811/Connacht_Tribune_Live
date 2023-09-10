import * as React from 'react';
import {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
// import {FBLoginManager} from 'react-native-facebook-login';
// import Card from '../../../card';
import Toast from 'react-native-root-toast';
import client from '../../../../utils/http';
import Header from '../../../header';
import LabelInput from '../../../labelInput';
import styles from './style';
const header = require('../../../../assets/images/4.jpg');
// import FloatLabelInput from '../../../floatLabelInput';

export interface IProps {
  navigator;
  navigation;
  onRegister: (data) => {};
  error: string;
  success: boolean;
}
export default class Login extends Component<IProps, {}> {
  public static navigatorStyle = {
    // navBarTransparent: true,
    navBarHidden: true,
  };
  public state: {
    email: string;
    emailError: string;
    password: string;
    passwordError: string;
    firstName: string;
    firstNameError: string;
    confirmPassword: string;
    confirmPasswordError: string;
    touched: {
      email: boolean;
      password: boolean;
      firstName: boolean;
      confirmPassword: boolean;
    };
    isDisable: boolean;
    loader: boolean;
  } = {
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    firstName: '',
    firstNameError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    touched: {
      email: false,
      confirmPassword: false,
      firstName: false,
      password: false,
    },
    isDisable: true,
    loader: false,
  };

  public onTextChange(prop, text) {
    this.setState({[prop]: text});
  }
  public handleBlur = field => evt => {
    this.setState({
      touched: {...this.state.touched, [field]: true},
    });
  };
  public validate() {
    // TODO OnBlur not works good
    let validCount = 0;
    if (this.state.firstName.length < 2 && this.state.touched.firstName) {
      this.state.firstNameError = 'Username at least 2 characters';
    } else {
      validCount++;
      this.state.firstNameError = '';
    }

    if (this.state.password.length < 5 && this.state.touched.password) {
      this.state.passwordError = 'Password at least 5 characters';
    } else {
      validCount++;
      this.state.passwordError = '';
    }

    if (
      this.state.confirmPassword !== this.state.password &&
      this.state.touched.confirmPassword
    ) {
      this.state.confirmPasswordError = 'Passwords do not match';
    } else {
      validCount++;
      this.state.confirmPasswordError = '';
    }

    if (
      this.state.touched.email &&
      this.validateEmail(this.state.email) === false
    ) {
      this.state.emailError = 'Email is not correct';
    } else {
      validCount++;
      this.state.emailError = '';
    }
    if (
      validCount >= 4 &&
      this.state.touched.email &&
      this.state.touched.confirmPassword &&
      this.state.touched.firstName &&
      this.state.touched.password
    ) {
      this.state.isDisable = false;
    } else {
      this.state.isDisable = true;
    }
  }
  public createAccount() {
    this.setState({
      loader: true,
    });
    const {email, firstName, password} = this.state;
    // return;
    const user = {
      email,
      firstName,
      password,
    };
    client
      .post('/auth/register', {user}, {timeout: 10000})
      .then(resp => {
        this.setState({
          loader: false,
        });
        console.log('resp :-> ', resp);
        if (resp.data.error) {
          Toast.show(resp.data.error, {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
          });
          // ToastAndroid.show(resp.data.error, ToastAndroid.SHORT);
        } else {
          Toast.show('Register success!', {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
          });
          // ToastAndroid.show('Register success!', ToastAndroid.SHORT);
          this.props.navigation.goBack();
        }
      })
      .catch(e => {
        this.setState({
          loader: false,
        });
        Alert.alert(
          'Error trying to login',
          'Ups, There was an error, try again in a few minutes. ',
          e,
        );
        // ToastAndroid.show(e, ToastAndroid.SHORT);
      });
  }

  public render() {
    this.validate();

    return (
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.content}>
        <View>
          <Header
            navigator={navigator}
            onGoBack={() => this.props.navigation.goBack()}
          />
        </View>
        <Text style={styles.textCreateAccount}>CREATE ACCOUNT</Text>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <LabelInput
            icon="person"
            error={this.state.firstNameError}
            onBlur={this.handleBlur('firstName')}
            onTextChange={text => this.onTextChange('firstName', text)}
            placeholder="Username"
            type="default"
            style={{width: '80%'}}
          />
          <LabelInput
            autoCapitalize="none"
            icon="email"
            error={this.state.emailError}
            onBlur={this.handleBlur('email')}
            onTextChange={text => this.onTextChange('email', text)}
            placeholder="Email"
            type="email-address"
            style={{width: '80%'}}
          />
          <LabelInput
            secure={true}
            icon="lock"
            error={this.state.passwordError}
            onBlur={this.handleBlur('password')}
            onTextChange={text => this.onTextChange('password', text)}
            placeholder="Password"
            type="default"
            style={{width: '80%'}}
          />
          <LabelInput
            secure={true}
            icon="lock"
            error={this.state.confirmPasswordError}
            onBlur={this.handleBlur('confirmPassword')}
            onTextChange={text => this.onTextChange('confirmPassword', text)}
            placeholder="Confirm password"
            type="default"
            style={{width: '80%'}}
          />
        </View>

        {!this.state.loader ? (
          <View
            style={[
              styles.buttons,
              this.state.isDisable ? styles.disable : styles.active,
            ]}>
            <TouchableOpacity
              disabled={this.state.isDisable}
              onPress={() => this.createAccount()}
              activeOpacity={0.8}
              style={{width: '100%'}}>
              <Text style={styles.textButtonNext}>NEXT</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={{marginTop: 20}}>
              <ActivityIndicator size={'large'} color="#fff" />
            </View>
          </>
        )}

        {/* <Text onPress={() => this.props.navigator.pop()} style={styles.textSignIn} >
              Sign in
            </Text> */}
      </ScrollView>
    );
  }
  private validateEmail(email) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
  }
}
