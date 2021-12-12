import React, { useEffect, useCallback, useReducer } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButtom from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/productActions';
import Input from '../../components/UI/Input';

const FORM_UPDATE = 'FORM_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValued = {
      ...state.inputValues, // old input value
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities, // old input validity
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      // if there are all true so the form is valid
      updatedFormIsValid = updatedValidities[key] && updatedFormIsValid;
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValued,
    };
  }
  return state;
};

const EditProduct = (props) => {
  // get the IDs using params and navigation
  const productId = props.navigation.getParam('productId');
  // get the state of the product from the store
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === productId)
  );

  // START DECLARING STATE
  // useReducer from react native is used to manage a lot states
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '', // to know if it is an edit or add
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });
  // FINISH DECLARING STATE

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    // check input validations before submit
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form', [
        { text: 'Okay' },
      ]);
      return;
    }
    // dispatch depending on whether we are editing or adding a product
    if (editedProduct) {
      // if the state of edit mode true
      // this change the state on the store
      dispatch(
        productActions.updateProduct(
          productId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        // this change the state on the store
        productActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price // +price is a conversion to number
        )
      );
    }
    props.navigation.goBack(); // go back to the previous screen after save
  }, [dispatch, productId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        // this gonna go directly to the form reducer
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView // to avoid the keyboard to cover the input
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="title"
            errorText="Please enter a valid title"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initialIsValid={!!editedProduct}
            required // prop from Input component
            keyboardType="default" // normal keyboard
            autoCapitalize="sentences" // capitalize first letter of each word
            autoCorrect={false} // disable auto correction
            returnKeyType="next" // next button on keyboard instead of done
            onEndEditing={() => console.log('onEndEditing')} // when the user is done typing
            onSubmitEditing={() => console.log('onSubmitEditing')} // when the user is done typing and presses the enter key
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initialValidity={!!editedProduct}
            required
            keyboardType="default" // normal keyboard
            returnKeyType="next" // next button on keyboard instead of done
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
              keyboardType="decimal-pad" // decinal pad keyboard
              returnKeyType="next" // next button on keyboard instead of done
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description"
            onInputChange={inputChangeHandler}
            required
            initialValue={editedProduct ? editedProduct.description : ''}
            initialValidity={!!editedProduct}
            required
            minLength={5}
            keyboardType="default" // normal keyboard
            autoCapitalize="sentences" // capitalize first letter of each word
            autoCorrect={false} // disable auto correction
            multiline={true} // enable multiline
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProduct.navigationOptions = (navData) => {
  const submitFunction = navData.navigation.getParam('submit');

  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFunction}
        />
      </HeaderButtons>
    ),
  };
};

export default EditProduct;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});
