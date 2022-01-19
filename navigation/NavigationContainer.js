import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation' // navigate outside of the navigator

import ShopNavigation from './ShopNavigation';

const NavigationContainer = (props) => { // wrapper for ShopNavigation to use redux
  const isAuth = useSelector((state) => !!state.auth.token); // !! converts to boolean
  const navRef = useRef()

  useEffect(() => {
    if (!isAuth) { // if the user is not logged in
        navRef.current.dispatch(NavigationActions.navigate({
            routeName: 'Auth'
        })); // go to the auth screen
    }
  }, [isAuth]); // if the isAuth changes, then run the useEffect again

  return <ShopNavigation ref={navRef} />;
};

export default NavigationContainer;
