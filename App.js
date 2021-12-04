import React, { useState } from 'react'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import productReducer from './store/reducers/product'
import cartReducer from './store/reducers/cart'
import orderReducer from './store/reducers/order'
import ShopNavigation from './navigation/ShopNavigation'

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
})

const store = createStore(rootReducer, composeWithDevTools()) // remove compose before deploy app
 
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}
//ERROR
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true)
        }}
        onError={() => console.log(err)}
      />
    )
  }
  return (
    <Provider store={store}>
      <ShopNavigation />
    </Provider>
  )
}
