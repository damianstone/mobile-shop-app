import React from 'react'
import { StyleSheet, Text, View, FlatList, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButtom from '../../components/UI/HeaderButton'

const Orders = (props) => {
  const orders = useSelector((state) => state.orders.orders)
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <Text>{itemData.item.totalAmount}</Text>}
    />
  )
}

Orders.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer()
          }}
        />
      </HeaderButtons>
    ),
  }
}

export default Orders

const styles = StyleSheet.create({})
