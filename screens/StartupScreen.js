import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/authActions';

const StartupScreen = (props) => {
  // Startup Screen to check if the user is logged in
  // check the AsyncStorage for a valid token
  // if there is a token, then we can go to the main screen

  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      // get the user data as a promise
      const userData = await AsyncStorage.getItem('userData');

      // if there is no user data
      if (!userData) {
        //props.navigation.navigate('Auth');
        dispatch(authActions.setDidTryAuth());
        return;
      }

      const transformedData = JSON.parse(userData); // transform the data into an object
      const { token, userId, expiryDate } = transformedData; // extract from the transformed data
      const expirationDate = new Date(expiryDate);

      // if the token is expired
      if (expirationDate <= new Date() || !token || !userId) {
        //props.navigation.navigate('Auth');
        dispatch(authActions.setDidTryAuth());
        return;
      }

      // expiration time - current (actual) time = positive number
      const expirationTime = expirationDate.getTime() - new Date().getTime();

      // if the token is valid and the user login then go to the home screen
     // props.navigation.navigate('Shop');
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.icon} />
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
