import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AUTH } from '../actions/authActions';

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token, // store the token
        userId: action.userId, // store the userId
        didTryAutoLogin: true, // auto login success
      };
    case SET_DID_TRY_AUTH:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return { ...initialState }; // reset the state
    default:
      return state;
  }
};
