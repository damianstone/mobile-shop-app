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
  
  
  // PRODUCTS NAVIGATION
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
  );
  
  // ORDERS NAVIGATION
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
  );
  
  // ADMIN NAVIGATION
  const AdminNavigator = createStackNavigator(
    {
      UserProducts: UserProducts,
      EditProduct: EditProduct,
    },
    {
      navigationOptions: {
        drawerIcon: (drawerConfig) => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            size={23}
            color={drawerConfig.tintColor}
          />
        ),
      },
      defaultNavigationOptions: defaultNavOptions,
    }
  );
  
  // AUTH NAVIGATION
  const AuthNavigator = createStackNavigator(
    {
      Auth: AuthScreen,
    },
    {
      defaultNavigationOptions: {
        ...defaultNavOptions,
        headerTintColor: Colors.icon,
      },
    }
  );
  
  // DRAWER NAVIGATION - SIDEBAR
  const shopNavigator = createDrawerNavigator(
    {
      Products: ProductsNavigator,
      Orders: OrdersNavigator,
      Admin: AdminNavigator,
    },
    {
      contentOptions: {
        activeTintColor: Colors.icon,
      },
      contentComponent: (props) => {
        const dispatch = useDispatch();
        return (
          <View style={styles.container}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerNavigatorItems {...props} />
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
      },
    }
  );
  
  const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: shopNavigator,
  });
  
  export default createAppContainer(MainNavigator);
  
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