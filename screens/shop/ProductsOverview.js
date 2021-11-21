import React from 'react'
import { FlatList, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cartActions'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButtom from '../../components/UI/HeaderButton'

//LIST OF ALL THE PRODUCTS THAT USER CAN ORDER
const ProductsOverview = (props) => {
  // get the products from redux
  const products = useSelector((state) => state.products.availableProducts)
  const dispatch = useDispatch()

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() =>
            props.navigation.navigate('ProductDetail', {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            })
          }
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item))
          }}
        />
      )}
    />
  )
}

ProductsOverview.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Products',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
  }
}

export default ProductsOverview;
