import * as React from 'react';
import {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
// import {FBLoginManager} from 'react-native-facebook-login';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
  Profile,
} from 'react-native-fbsdk-next';
// import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import analytics from '@react-native-firebase/analytics';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-root-toast';
import {palette} from '../../../styles';
import client from '../../../utils/http';
import FloatLabelInput from '../../floatLabelInput';
import LoginButton from './loginButton';
import styles from './style';
const background = require('../../../assets/images/loginImage.png');
const logo = require('../../../assets/images/connacht-tribune-1.png');

export interface IProps {
  navigator;
  navigation;
  loginSuccess: (data) => {};
  success;
  error;
}

GoogleSignin.configure();

export default class Login extends Component<IProps, {}> {
  public static navigatorStyle = {
    navBarHidden: true,
  };

  public state: {
    email: string;
    password: string;
    errorEmail: string;
    showModal: boolean;
    buttonModalisDisable: boolean;
    loader: boolean;
    emailForgotPassword: string;
  } = {
    email: '',
    password: '',
    errorEmail: '',
    buttonModalisDisable: true,
    emailForgotPassword: '',
    showModal: false,
    loader: false,
  };

  public async componentDidMount() {
    // await GoogleSignIn.configure({
    //   scopes: ['profile'],
    //   clientID:
    //     '94932936555-308cq3ikhrn1bm3oprrcu3h7e7qcuabe.apps.googleusercontent.com',
    //   offlineAccess: false,
    //   shouldFetchBasicProfile: true,
    // });
    // analytics().setCurrentScreen('login');

    await analytics().logScreenView({
      screen_name: 'login',
      screen_class: 'login',
    });
  }

  public onTextChange(prop, text) {
    this.setState({[prop]: text});
  }

  public async onFbLogin() {
    return alert('Under development');
    try {
      await this.loginFB(this._responseInfoCallback);
    } catch (error) {
      console.log('error :->>>> ', error);
    }
  }

  public _responseInfoCallback = async (error, result) => {
    if (error) {
      console.log('error top ', error);
      return;
    } else {
      const userData = result;
      // console.log('fb data :->>> ', userData);
    }
  };

  public async loginFB(resCallBack) {
    LoginManager.logOut();
    console.log('first');

    LoginManager.logInWithPermissions(['public_profile']).then(
      (error, resp) => {
        // resp => {
        console.log('response :-> ', resp);
        if (resp.isCancelled == true) {
          return console.log('cancelled by user');
        }
        if (
          resp.declinedPermissions &&
          resp.declinedPermissions.includes('email')
        ) {
          resCallBack({message: 'email is required'});
        } else {
          // const infoRequest = new GraphRequest(
          //   '/me?fields=email,name,picture',
          //   null,
          //   resCallBack,
          // );

          // new GraphRequestManager().addRequest(infoRequest).start(); // for getting facebook information

          // Profile.getCurrentProfile().then(data => {  // getting all the detail like firstName,lastName,etc
          //   console.log('data profile :- ', data);
          // });

          AccessToken.getCurrentAccessToken().then(async result => {
            // for getting facebook token
            console.log('result token :-> ', result);
            await analytics().logEvent('login_facebook', {result, error});
            return;
            const {accessToken} = result;
            const userSend = {accessToken, auth: 'facebook'};
            console.log('token :->>> ', userSend);
            this.login(userSend, true);
          });
        }
      },
      function (error) {
        console.log('login fail with error :-> ', error);
      },
    );

    // LoginManager.loginWithPermissions(
    //   ['email', 'public_profile'],
    //   async (error, data) => {
    //     if (!error) {
    //       const {token} = data.credentials;
    //       const userSend = {token, auth: 'facebook'};
    //       console.log('userSend :->>> ', userSend);
    //       // firebase.analytics().logEvent('login_facebook', {data, error});
    //       this.login(userSend, true);
    //     }
    //   },
    // );

    // LoginManager.logInWithPermissions(['email', 'public_profile']).then(
    //   function (result) {
    //     if (result.isCancelled) {
    //       console.log('Login cancelled');
    //     } else {
    //       console.log(
    //         'Login success with permissions: ' +
    //           result.grantedPermissions.toString(),
    //       );

    //       // const {token} = data.credentials;
    //       // const userSend = {token, auth: 'facebook'};
    //       // console.log('userSend :->>> ', userSend);
    //       // // firebase.analytics().logEvent('login_facebook', {data, error});
    //       // this.login(userSend, true);
    //     }
    //   },
    //   function (error) {
    //     console.log('Login fail with error: ' + error);
    //   },
    // );

    // LoginManager.logInWithPermissions(['public_profile']).then(
    //   function (result) {
    //     if (result.isCancelled) {
    //       console.log('Login cancelled');
    //     } else {
    //       console.log(
    //         'Login success with permissions: ' +
    //           result.grantedPermissions.toString(),
    //       );
    //     }
    //   },
    //   function (error) {
    //     console.log('Login fail with error: ' + error);
    //   },
    // );
  }

  public async loginGmail() {
    try {
      console.warn('hello');
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      GoogleSignin.getTokens().then(async res => {
        console.log(res.accessToken); //<-------Get accessToken
        console.log('user info :-> ', userInfo);

        const {name, email} = userInfo;

        const userSend = {
          email,
          firstName: name,
          token: res.accessToken,
          auth: 'gmail',
        };

        this.setState({
          loader: true,
        });
        this.login(userSend, true);
        await analytics().logEvent('login_gmail', {res});
      });
    } catch (error) {
      this.setState({
        loader: false,
      });
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.warn('SIGN IN CANCELLED', error.message);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.warn('IN PROGRESS', error.message);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.warn('play services not available or outdated', error.message);
      } else {
        console.warn('Meassage :-> ', error.message);
        this.setState({
          loader: false,
        });
      }
    }
  }

  public loginEmail() {
    this.setState({
      loader: true,
    });
    if (this.state.email !== '' && this.state.password !== '') {
      this.login({email: this.state.email, password: this.state.password});
    } else {
      this.setState({
        loader: false,
      });
      Toast.show('Username and passsword cannot be empty', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  public async forgotPassword() {
    await analytics().logEvent('tap_forgotPassoword');
    this.setState({showModal: true});
  }
  public async onCreateAccount() {
    await analytics().logEvent('tap_forgotPassoword');
    this.props.navigation.navigate('CreateAccount');
  }
  public validateEmail(email) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email)) {
      this.setState({
        errorEmail: '',
        emailForgotPassword: email,
        buttonModalisDisable: false,
      });
    } else {
      this.setState({
        errorEmail: 'Email is incorrect',
        buttonModalisDisable: true,
      });
    }
  }
  public async senEmail(email) {
    await analytics().logEvent('send_forgotPassoword');

    Keyboard.dismiss();
    client
      .post('/auth/forgotPassword', {email}, {timeout: 10000})
      .then(resp => {
        if (resp.data.error) {
          if (
            resp.data.error.includes(
              'You were already log in with google or facebook',
            ) ||
            resp.data.error.includes('This email not have account')
          ) {
            Toast.show(resp.data.error, {
              duration: Toast.durations.LONG,
              position: Toast.positions.TOP,
              shadow: true,
              animation: true,
            });
          } else {
            Alert.alert(
              'Error trying to login',
              'Ups, There was an error, try again in a few minutes.',
            );
          }
        } else {
          Toast.show('Check your email for change password', {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
          });
          this.setState({showModal: !this.state.showModal});
        }
      })
      .catch(e => {
        Alert.alert(
          'Error trying to login',
          'Ups, There was an error, try again in a few minutes.',
        );
      });
  }
  public async onCloseModal() {
    // this.setState({showModal: false});
    await analytics().logEvent('dismiss_forgotPassoword');
    this.setState({
      showModal: false,
      errorEmail: '',
      buttonModalisDisable: true,
      emailForgotPassword: '',
    });
  }

  public render() {
    return (
      <KeyboardAvoidingView style={styles.content}>
        <StatusBar
          backgroundColor={'#a22b37'}
          barStyle="light-content"
          // style={{opacity: 0.8}}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showModal}>
          <Pressable
            onPress={() => {
              this.setState({showModal: false});
              setTimeout(() => {
                this.onCloseModal();
              }, 1000);
            }}
            style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}></Pressable>

          <View
            style={{
              flex: 1,

              position: 'absolute',
              top: '28%',
              zIndex: 999999,
            }}>
            <View
              style={{
                margin: 20,
                backgroundColor: palette.dark,
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
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 18,
                  marginTop: 8,
                  marginHorizontal: 5,
                }}>
                Enter your email. We will send you a link to change your
                password
              </Text>
              <View style={{width: '100%'}}>
                <Text
                  style={{
                    color: 'white',
                    position: 'absolute',
                    top: 3,
                    left: '5%',
                  }}>
                  {this.state.errorEmail ? this.state.errorEmail : null}
                </Text>
                <View
                  style={{
                    marginTop: 25,
                    width: '100%',
                    alignItems: 'center',
                    display: 'flex',
                  }}>
                  <TextInput
                    autoCapitalize="none"
                    defaultValue={this.state.email}
                    style={styles.inputModal}
                    onChangeText={email => this.validateEmail(email)}
                    underlineColorAndroid="transparent"
                    placeholder={'Enter your email'}
                    placeholderTextColor="gray"
                    keyboardType={'email-address'}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginVertical: 15,
                }}>
                <TouchableOpacity
                  style={[
                    {width: '40%', paddingVertical: 12, borderRadius: 5},
                    this.state.buttonModalisDisable
                      ? styles.disableButtonModal
                      : styles.activeButtonModal,
                  ]}
                  disabled={this.state.buttonModalisDisable}
                  onPress={() => this.senEmail(this.state.emailForgotPassword)}
                  activeOpacity={0.8}>
                  <Text style={styles.textButtonModal}>SEND</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <ImageBackground style={styles.background} source={background}>
          <View style={styles.overlay} />
          <Image
            source={logo}
            style={{width: '60%', height: '23%', resizeMode: 'contain'}}
          />

          <View style={{width: '80%'}}>
            <FloatLabelInput
              type="email-address"
              icon={false}
              value={this.state.email}
              label="Email"
              onTextChange={text => this.onTextChange('email', text)}
            />

            <FloatLabelInput
              icon={true}
              secure={true}
              value={this.state.password}
              label="Password"
              onTextChange={text => this.onTextChange('password', text)}
            />
          </View>

          <View style={styles.viewButtonSignIn}>
            {!this.state.loader ? (
              <TouchableOpacity
                onPress={() => this.loginEmail()}
                activeOpacity={0.8}
                style={{width: '100%', backgroundColor: 'white'}}>
                <Text style={styles.buttonSignIn}>Sign In</Text>
              </TouchableOpacity>
            ) : (
              <>
                <ActivityIndicator size={'large'} color="#fff" />
              </>
            )}
          </View>

          <Text
            style={{color: 'white'}}
            onPress={() => this.setState({showModal: true})}>
            Forgot Password?
          </Text>

          <View style={styles.buttons}>
            {/* <LoginButton onPress={() => this.onFbLogin()} type="fb" /> */}
            <LoginButton onPress={() => this.loginGmail()} type="gmail" />
          </View>

          <Text style={{color: 'white', height: '5%'}}>
            Dont have an account?{' '}
            <Text
              onPress={() => this.onCreateAccount()}
              style={{color: 'white', fontWeight: '800'}}>
              Sign Up
            </Text>
          </Text>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
  private login(data, GF = false) {
    console.log('data get :-===========>>>> ', data);
    // return;
    const route = GF ? 'registerOrAuth' : 'login';
    client
      .post('/auth/' + route, {user: data}, {timeout: 10000})
      .then(resp => {
        this.setState({
          loader: false,
        });
        if (resp.data.error) {
          if (resp.data.error.includes('Incorrect credentials')) {
            Toast.show('Your username or password are incorrect', {
              duration: Toast.durations.LONG,
              position: Toast.positions.TOP,
              shadow: true,
              animation: true,
            });
          } else {
            Alert.alert(
              'Error trying to login',
              'Ups, There was an error, try again in a few minutes.',
            );
          }
        } else {
          this.props.loginSuccess(resp.data.user);
          if (resp.data.user.categories.length === 0) {
            console.log('resp login 2:-> ', resp.data.user.categories);
            this.props.navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'SelectNewsFeed',
                },
              ],
            });
          } else {
            this.props.navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'Articles',
                },
              ],
            });
          }
        }
      })
      .catch(e => {
        this.setState({
          loader: false,
        });
        console.log('error in login :-> ', e);
        Alert.alert(
          'Error trying to login',
          'Ups, There was an error in the servers, try again in a few minutes.',
        );
      });
  }
}
