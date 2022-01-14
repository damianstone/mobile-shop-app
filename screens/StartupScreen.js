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
  // check the AsyncStorage for a valid token
  // if there is a token, then we can go to the main screen

  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      // get the user data as a promise
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }
      const transformedData = JSON.parse(userData); // transform the data into an object
      const { token, userId, expiryDate } = transformedData; // extract from the transformed data
      const expirationDate = new Date(expiryDate);
      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth');
        return;
      }
      props.navigation.navigate('Shop');
      dispatch(authActions.authenticate(userId, token));
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
