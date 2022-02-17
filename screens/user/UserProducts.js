import React from 'react';
import { StyleSheet, Text, View, FlatList, Button, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtom from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/productActions';

const UserProducts = (props) => {
  // get state with useSelector 
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  
  const editProductHandler = (id) => {
    props.navigation.navigate('EditProduct', { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert('Are you shure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' }, // buttons for alert messages
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => dispatch(productActions.deleteProduct(id)),
      },
    ]);
  };

  if (userProducts.length === 0) {
    return (
      <View style={styles.screen}>
        <Text style={styles.noProducts}>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          price={itemData.item.price}
          title={itemData.item.title}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}>
          <Button
            color={Colors.icon}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.icon}
            title="Delete"
            onPress={() => {
              deleteHandler(itemData.item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

//NAVIGATION
export const screenOptions = (navData) => {
  return {
    headerTitle: 'User Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          title="Add"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('EditProduct');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProducts;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProducts: {
    fontSize: 20,
    color: Colors.icon,
  }
});
