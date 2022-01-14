import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

// FETCH PRODUCTS FROM FIREBASE
export const fetchProducts = () => {
  return async (dispatch, getState) => {
    // fetch products behind the user id
    const userId = getState().auth.userId; // get the userId from the state
    try {
      // any async code you want
      const response = await fetch(
        'https://shop-app-19d81-default-rtdb.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();

      const loadedProducts = [];
      // transfrom the data into an array of products
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(
          (product) => product.ownerId === userId
        ), // only fetch products of the user in the "my products" section
      });
    } catch (err) {
      // catch errors
      throw err;
    }
  };
};

// DELETE PRODUCTS
export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    // get the token from the state
    const token = getState().auth.token;
    // query for URL
    const auth = `?auth=${token}`;
    const response = await fetch(
      `https://shop-app-19d81-default-rtdb.firebaseio.com/products/${productId}.json${auth}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: DELETE_PRODUCT,
      pid: productId,
    });
  };
};

// CREATE PRODUCTS AND SEND TO FIREBASE
export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    // create product assiciated by the user ID
    const userId = getState().auth.userId; // get the userId from the state
    const auth = `?auth=${token}`;
    // any async code you want
    const response = await fetch(
      // connecting to firebase
      `https://shop-app-19d81-default-rtdb.firebaseio.com/products.json${auth}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // transform to JS object to JSON
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        }),
      }
    );
    const resData = await response.json();
    // thats will be dispatch once response be done
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      },
    });
  };
};

// UPDATE-EDIT PRODUCTS
export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    // GETSTATE => get acces to the redux state, access to the current state
    console.log(getState());
    // get access to edit products when the user is logged in
    // adding the token to the URL makes possible for the user to edit and dispatch certain actions
    // remember the configuration (rules) in the firebase console to "write" and "read"
    const token = getState().auth.token; // get the token of the user from the redux state
    const auth = `?auth=${token}`; // store token to add it in the url
    const response = await fetch(
      // go to a particular product
      `https://shop-app-19d81-default-rtdb.firebaseio.com/products/${id}.json${auth}`,
      {
        method: 'PATCH', // PATCH is for updating a part of the data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // transform to JS object to JSON
          title,
          description,
          imageUrl,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
