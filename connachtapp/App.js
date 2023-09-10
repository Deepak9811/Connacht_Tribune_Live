import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import ArticlesDetail from './src/components/pages/articles/detail';
import Articles from './src/screens/ArticlesPage';
import RegisterPage from './src/screens/createAccountPage';
import LoginPage from './src/screens/LoginPage';
import ProfilePage from './src/screens/ProfilePage';
import SelectNewsFeed from './src/screens/selectNewsFeed';
import store, {persistor} from './src/store';

function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      console.log('token :- ', value);
      if (value == null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routeName = 'Login';
  } else {
    routeName = 'Articles';
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              orientation: 'portrait',
            }}
            initialRouteName={routeName}>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Articles" component={Articles} />
            <Stack.Screen name="CreateAccount" component={RegisterPage} />
            <Stack.Screen name="SelectNewsFeed" component={SelectNewsFeed} />
            <Stack.Screen name="Profile" component={ProfilePage} />
            <Stack.Screen name="ArticlesDetail" component={ArticlesDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const Stack = createNativeStackNavigator();

export default App;
