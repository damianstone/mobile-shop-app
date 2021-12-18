import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

// FETCH PRODUCTS FROM FIREBASE
export const fetchProducts = () => {
  return async (dispatch) => {
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
            'u1',
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
      });
    } catch (err) {
      // catch errors
      throw err;
    }
  };
};

// DELETE PRODUCTS
export const deleteProduct = (productId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://shop-app-19d81-default-rtdb.firebaseio.com/products/${productId}.json`,
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
  return async (dispatch) => {
    // any async code you want
    const response = await fetch(
      // connecting to firebase
      'https://shop-app-19d81-default-rtdb.firebaseio.com/products.json',
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
      },
    });
  };
};

// UPDATE-EDIT PRODUCTS
export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
    const response = await fetch(
      // go to a particular product
      `https://shop-app-19d81-default-rtdb.firebaseio.com/products/${id}.json`,
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
