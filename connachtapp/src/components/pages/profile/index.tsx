import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {User} from '../../connacht-tribune-models';
// import firebase from 'react-native-firebase';
import analytics from '@react-native-firebase/analytics';
// import Modal from 'react-native-modal';
import Toast from 'react-native-root-toast';
import {palette} from '../../../styles';
import client from '../../../utils/http';
import storage from '../../../utils/storage';
import Header from '../../header';
import LabelInput from '../../labelInput';
import ItemProfile from './item';

const windowWidth = Dimensions.get('window').width;

export interface IProps {
  loadUser: () => {};
  changePassword: (data) => {};
  user;
  navigator;
  navigation;
  nameUser;
  loginType;
  route;
}
export default class Profile extends Component<IProps, {}> {
  public static navigatorStyle = {
    navBarBackgroundColor: palette.red,
    navBarTextColor: 'white',
    navBarButtonColor: 'white',
  };

  public state: {
    isVisiblePass: boolean;
    password: string;
    passwordError: string;
    confirmPassword: string;
    confirmPasswordError: string;
    touched: {
      password: boolean;
      confirmPassword: boolean;
    };
    isDisable: boolean;
    loader: boolean;
    categories: [{id; name}];
  } = {
    isVisiblePass: false,
    password: '',
    passwordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    touched: {confirmPassword: false, password: false},
    isDisable: true,
    categories: [{id: '', name: ''}],
    loader: false,
  };
  public styles = StyleSheet.create({
    text: {
      width: '100%',
      paddingHorizontal: 8,
      paddingVertical: 5,
      color: 'white',
      // fontFamily: 'Montserrat-Regular',
    },
    textButton: {
      fontSize: 15,
      letterSpacing: 2,
      color: 'white',
      width: '100%',
      textAlign: 'center',
    },
    active: {
      backgroundColor: 'green',
    },
    disable: {
      backgroundColor: 'gray',
    },
  });

  public componentDidMount(): void {
    console.log('this.props.loginType :-> ', this.props.route.params.title);
  }

  public validate() {
    // TODO OnBlur not works good
    let validCount = 0;
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
      validCount >= 2 &&
      this.state.touched.confirmPassword &&
      this.state.touched.password
    ) {
      this.state.isDisable = false;
    } else {
      this.state.isDisable = true;
    }
  }
  public async pressItem(text) {
    if (text === 'Change password') {
      this.setState({isVisiblePass: !this.state.isVisiblePass});

      await analytics().logEvent('tap_change_password');
    } else if (text === 'Selected categories') {
      this.props.navigation.navigate('SelectNewsFeed', {
        onGoBack: true,
      });

      await analytics().logEvent('tap_change_changeCategories');
    } else {
      let removeData = storage.removeItem('token');

      // let removeData = await AsyncStorage.removeItem('token');
      // console.log('removeData :->>> ', removeData);
      this.props.navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Login',
          },
        ],
      });

      // firebase.analytics().logEvent('tab_logout');
      await analytics().logEvent('tab_logout');
    }
  }
  public onTextChange(prop, text) {
    this.setState({[prop]: text});
  }
  public handleBlur = field => evt => {
    this.setState({
      touched: {...this.state.touched, [field]: true},
    });
  };
  public async changePassword() {
    this.setState({
      loader: true,
    });
    // return;
    // firebase.analytics().logEvent('change_password');
    await analytics().logEvent('change_password');
    const {password} = this.state;
    // await this.props.changePassword({ password });
    client
      .patch('/users', {user: {password}}, {timeout: 10000})
      .then(resp => {
        this.setState({
          loader: false,
        });
        if (resp.data.error) {
          Toast.show(resp.data.error, {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
          });
        } else {
          Toast.show('Change password successfull', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
          });
          this.setState({isVisiblePass: !this.state.isVisiblePass});
        }
      })
      .catch(e => {
        this.setState({
          loader: false,
        });
        Alert.alert(
          'Error trying to login',
          'Ups, There was an error, try again in a few minutes.',
        );
      });
  }

  public render() {
    this.validate();
    const {isVisiblePass, passwordError, confirmPasswordError} = this.state;
    const {nameUser, loginType} = this.props.route.params;
    return (
      <SafeAreaView style={{backgroundColor: palette.dark, flex: 1}}>
        {/* <StatusBar backgroundColor={palette.dark} barStyle="light-content" /> */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisiblePass}
          // visible={true}
          onRequestClose={() => {
            this.setState({isVisiblePass: false});
          }}>
          <Pressable
            onPress={() => this.setState({isVisiblePass: false})}
            style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}></Pressable>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {backgroundColor: palette.dark}]}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 20,
                  marginTop: 10,
                }}>
                Change password
              </Text>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <LabelInput
                  disable={this.state.loader}
                  secure={true}
                  error={passwordError}
                  onBlur={this.handleBlur('password')}
                  onTextChange={text => this.onTextChange('password', text)}
                  placeholder="New password"
                  type="default"
                  style={{width: '80%'}}
                />
                <LabelInput
                  disable={this.state.loader}
                  secure={true}
                  error={confirmPasswordError}
                  onBlur={this.handleBlur('confirmPassword')}
                  onTextChange={text =>
                    this.onTextChange('confirmPassword', text)
                  }
                  placeholder="Confirm password"
                  type="default"
                  style={{width: '80%'}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginVertical: 15,
                  width: '100%',
                }}>
                {this.state.loader ? (
                  <View
                    style={{
                      width: '100%',
                      paddingVertical: 12,
                    }}>
                    <ActivityIndicator size={'small'} color="#fff" />
                  </View>
                ) : (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          isVisiblePass: !this.state.isVisiblePass,
                        })
                      }
                      activeOpacity={0.8}
                      style={{
                        width: '40%',
                        backgroundColor: 'red',
                        paddingVertical: 12,
                        borderRadius: 5,
                      }}>
                      <Text style={this.styles.textButton}>CANCEL</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        {width: '40%', paddingVertical: 12, borderRadius: 5},
                        this.state.isDisable
                          ? this.styles.disable
                          : this.styles.active,
                      ]}
                      disabled={this.state.isDisable}
                      onPress={() => this.changePassword()}
                      activeOpacity={0.8}>
                      <Text style={this.styles.textButton}>CHANGE</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </View>
        </Modal>

        {/* <Text
          style={[
            this.styles.text,
            {textAlign: 'center', fontSize: 25, paddingVertical: 20},
          ]}>
          {nameUser}
        </Text> */}

        <Header
          navigator={navigator}
          onGoBack={() => this.props.navigation.goBack()}
        />

        {loginType === null ? (
          <ItemProfile
            text="Change password"
            icon="lock"
            onPress={text => this.pressItem(text)}
          />
        ) : null}
        <ItemProfile
          text="Selected categories"
          onPress={text => this.pressItem(text)}
          icon="playlist-check"
        />
        {/* {this.props.user.categories ? (
          this.props.user.categories.map(c => (
            <Text key={c.id} style={this.styles.text}>
              {c.name}
            </Text>
          ))
        ) : (
          <Text style={this.styles.text}>You don`t have categories</Text>
        )} */}
        <ItemProfile
          text="Privacy policy"
          onPress={async () =>
            Linking.openURL('http://connachttribune.ie/privacy-policy/') &&
            // firebase.analytics().logEvent('tap_PrivacyPolicy')
            (await analytics().logEvent('tap_PrivacyPolicy'))
          }
          icon="file"></ItemProfile>
        <ItemProfile
          text="Terms & Conditions"
          onPress={
            async () =>
              Linking.openURL('http://connachttribune.ie/terms-conditions/') &&
              (await analytics().logEvent('tap_termsConditions'))
            // firebase.analytics().logEvent('tap_termsConditions')
          }
          icon="file-outline"></ItemProfile>
        <ItemProfile
          text={'Logout'}
          onPress={text => this.pressItem(text)}
          icon="logout"
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    position: 'absolute',
    top: '28%',
    width: '100%',
  },
  modalView: {
    margin: 20,

    borderRadius: 5,
    padding: 5,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
  },
});
