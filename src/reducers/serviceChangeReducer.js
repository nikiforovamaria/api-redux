import { CHANGE_SERVICE_FIELD, CHANGE_SERVICES_REQUEST, CHANGE_SERVICES_FAILURE, CHANGE_SERVICES_SUCCESS, CHANGE_SERVICES_INIT } from '../actions/actionTypes.js';

const initialState = {
  item: {
    id: '',
    name: '',
    price: '',
    content: '',
  },
  chLoading: false,
  chError: null,
};

export default function serviceAddReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SERVICE_FIELD:
      const {nameField, value} = action.payload;
      return {...state, item: {
        ...state.item,
        [nameField]: value
      }};

    case CHANGE_SERVICES_REQUEST:
      return {...state, chLoading: true, chError: null};

    case CHANGE_SERVICES_FAILURE:
      const { error } = action.payload;
      return {...state, chLoading: false, chError: error};

    case CHANGE_SERVICES_SUCCESS:
      return {...initialState};

    case CHANGE_SERVICES_INIT:
      console.log(action.payload);
      const { id, name, price, content } = action.payload;
      return {...state,
        chLoading: false,
        chError: null,
        item: {
          id,
          name,
          price,
          content
        }};

    default:
      return state;
  }
}