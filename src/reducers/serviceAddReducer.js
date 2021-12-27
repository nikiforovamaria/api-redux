import { CHANGE_ADD_SERVICE_FIELD, ADD_SERVICE, CHANGE_SERVICE, CHANGE_SERVICE_CANCEL, ADD_SERVICES_REQUEST, ADD_SERVICES_SUCCESS, ADD_SERVICES_FAILURE } from '../actions/actionTypes.js';

const initialState = {
  item: { name: '', price: '', },
  loading: false,
  error: null,
};

export default function serviceAddReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ADD_SERVICE_FIELD:
      const {nameField, value} = action.payload;
      return {...state, item: {
        ...state.item,
        [nameField]: value
      }};

    case ADD_SERVICES_REQUEST:
      return {...state, loading: true, error: null};
    case ADD_SERVICES_SUCCESS:
      return {...initialState};
    case ADD_SERVICES_FAILURE:
      const { error } = action.payload;
      return {...state, loading: false, error}

    // case CHANGE_SERVICE:
    //   const {id, name, price} = action.payload;
    //   return {id, name, price};

    // case ADD_SERVICE:
    //   return {...initialState};

    // case CHANGE_SERVICE_CANCEL:
    //   return {...initialState};

    default:
      return state;
  }
}