import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Platform, SafeAreaView, Button, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import ProductsOverview, {
  screenOptions as product,
} from '../screens/shop/ProductsOverview';
import ProductDetail, {
  screenOptions as detail,
} from '../screens/shop/ProductDetail';
import Orders, { screenOptions as order } from '../screens/shop/Orders';
import Cart, { screenOptions as cartOps } from '../screens/shop/Cart';
import UserProducts, {
  screenOptions as userOps,
} from '../screens/user/UserProducts';
import EditProduct, {
  screenOptions as editOps,
} from '../screens/user/EditProduct';
import AuthScreen, {
  screenOptions as authOps,
} from '../screens/user/AuthScreen';
import * as authActions from '../store/actions/authActions';

// DEFAULT OPTIONS
const defaultNavOptions = {
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.headerAndroid : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  cardStyle: {
    backgroundColor: Colors.bg, // change the backgroud of screens
  },
};

const ProductsStack = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <ProductsStack.Navigator screenOptions={defaultNavOptions}>
      <ProductsStack.Screen
        name="ProductsOverview"
        component={ProductsOverview}
        options={product}
      />
      <ProductsStack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={detail}
      />
      <ProductsStack.Screen name="Cart" component={Cart} options={cartOps} />
    </ProductsStack.Navigator>
  );
};

const OrdersStack = createStackNavigator();

const OrdersNavigator = () => {
  return (
    <OrdersStack.Navigator screenOptions={defaultNavOptions}>
      <OrdersStack.Screen name="Orders" component={Orders} options={order} />
    </OrdersStack.Navigator>
  );
};

const AdminStack = createStackNavigator();

const AdminNavigator = () => {
  return (
    <AdminStack.Navigator screenOptions={defaultNavOptions}>
      <AdminStack.Screen
        name="UserProducts"
        component={UserProducts}
        options={userOps}
      />
      <AdminStack.Screen
        name="EditProduct"
        component={EditProduct}
        options={editOps}
      />
    </AdminStack.Navigator>
  );
};

const ShopDrawer = createDrawerNavigator();

// export to use in AppNavigator 
export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawer.Navigator
      drawerContent={(props) => {
        return (
          <View style={styles.container}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
            </SafeAreaView>
            <View style={styles.buttonContainer}>
              <Button
                title="Logout"
                color={Colors.white}
                onPress={() => {
                  dispatch(authActions.logout());
                  //props.navigation.navigate('Auth');
                }}
              />
            </View>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.icon,
      }}
      screenOptions={{headerShown: false}}
      >
      <ShopDrawer.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawer.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawer.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </ShopDrawer.Navigator>
  );
};

const AuthStack = createStackNavigator();

// to use in appNavigator and dont need to use a switch navigator
export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ ...defaultNavOptions, headerTintColor: Colors.icon }}>
      <AuthStack.Screen name="Auth" component={AuthScreen} options={authOps} />
    </AuthStack.Navigator>
  );
};


//export default createAppContainer(ShopNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  buttonContainer: {
    backgroundColor: Colors.icon,
    borderRadius: 20,
    width: '60%',
    marginVertical: 15,
    marginLeft: 10,
  },
});
