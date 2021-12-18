import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

// FETCH ORDERS
export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      // any async code you want
      const response = await fetch(
        'https://shop-app-19d81-default-rtdb.firebaseio.com/orders/u1.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();

      const loadedOrders = [];
      // transfrom the data into an array of products
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders,
      });
    } catch (err) {
      // catch errors
      throw err;
    }
  };
};

// ADD ORDER AND STORE IT IN FIREBASE
export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date();
    const response = await fetch(
      // connecting to firebase
      'https://shop-app-19d81-default-rtdb.firebaseio.com/orders/u1.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // transform to JS object to JSON
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
