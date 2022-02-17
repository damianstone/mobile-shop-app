import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtom from '../../components/UI/HeaderButton';
import * as cartActions from '../../store/actions/cartActions';
import * as productActions from '../../store/actions/productActions';
import Colors from '../../constants/Colors';

//LIST OF ALL THE PRODUCTS THAT USER CAN ORDER
const ProductsOverview = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  // get the products from redux
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  // a function to use async await instead of then()
  const loadedProducts = useCallback(async () => {
    console.log('load products');
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message); // message to the error im getting
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  // add listener to fetch pruducts and re fetch it
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', loadedProducts);
    return () => {
      // clean up function to clean the listener
      unsubscribe();
    };
  }, [loadedProducts]);

  // load the products from firebase dispatching the fetchProducts action
  useEffect(() => {
    setIsLoading(true);
    loadedProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadedProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  // ERROR HANDLING
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadedProducts}
          color={Colors.icon}
        />
      </View>
    );
  }

  // SPINNER
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.icon} />
      </View>
    );
  }

  // NO PRODUCTS FOUND
  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadedProducts} // refresh the screen when pull down
      refreshing={isRefreshing} // necessary to indicate when we are corruntly loading or not
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item));
          }}>
          <Button
            color={Colors.icon}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.icon}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

// HEADER NAVIGATION
export const screenOptions = (navData) => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            // open the sidebar
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            // go to cart
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsOverview;

// STYLES
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
