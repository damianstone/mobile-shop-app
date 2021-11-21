import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../constants/Colors'
import ProductsOverview from '../screens/shop/ProductsOverview'
import ProductDetail from '../screens/shop/ProductDetail'
import Orders from '../screens/shop/Orders'
import Cart from '../screens/shop/Cart'

const defaultNavOptions = {
  backgroundColor: Platform.OS === 'android' ? Colors.primary : ' ',
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
}

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverview,
    ProductDetail: ProductDetail,
    Cart: Cart,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
)

const OrdersNavigator = createStackNavigator(
  {
    Orders: Orders,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
)

const shopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
)

export default createAppContainer(shopNavigator)
