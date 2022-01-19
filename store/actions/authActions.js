import { AsyncStorage } from 'react-native'; // automatically login when reload
//import {} from '@react-native-community/async-storage';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

const KEY = 'AIzaSyAeTJYg-SmUKrM0Alclkyc6abG2xS-lPeE';

// RESUSABLE AUNTENTICATE DISPATCH
export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    // start counting minutes to maintain login the user
    dispatch(setLogoutTimer(expiryTime * 1000));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

// SIGN UP WITH FIREBASE
export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      // request to create a new user
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    // MANAGE ERROS
    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData); // log the object with the info of the error
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';

      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }

      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);

    // DISPATCH
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) // get the expire time from firebase
      )
    );

    // SAVE DATA TO LOCAL STORAGE
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    ); // get the expiration date
    saveData(resData.idToken, resData.localId, expirationDate);
  };
};

// SIGN IN WITH FIREBASE
export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      // request to create a new user
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    // MANAGE ERRORS
    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData); // log the object with the info of the error
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';

      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      } else if (errorId === 'USER_DISABLED') {
        message = 'This user has been disabled!';
      }

      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);

    // DISPATCH
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) // get the expire time from firebase
      )
    );

    // SAVE DATA TO LOCAL STORAGE
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    ); // get the expiration date
    saveData(resData.idToken, resData.localId, expirationDate);
  };
};

// LOGOUT
export const logout = () => {
  clearLogoutTimer();
  // clear the asyncStorage (local storage) using the same identifier to store the data
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

// CLEAN LOGOUT TIMER
const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

// SET LOGOUT TIMER
const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      // logout the user
      dispatch(logout());
    }, expirationTime);
  };
};

const saveData = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(), // converted to ISO string
    })
  );
};
