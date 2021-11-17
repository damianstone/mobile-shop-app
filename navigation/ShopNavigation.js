import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';

import Colors from '../constants/Colors';
import ProductsOverview from '../screens/shop/ProductsOverview';
import ProductDetail from '../screens/shop/ProductDetail';
import Orders from '../screens/shop/Orders';
import Cart from '../screens/shop/Cart';


const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverview,
  },
  {
    defaultNavigationOptions: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ' ',
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    },
  }
);

export default createAppContainer(ProductsNavigator);
