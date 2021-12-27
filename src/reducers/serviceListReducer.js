import { REMOVE_SERVICE, FETCH_SERVICES_REQUEST, FETCH_SERVICES_FAILURE, FETCH_SERVICES_SUCCESS, CHANGE_SERVICES_INIT} from '../actions/actionTypes.js';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function serviceListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SERVICES_REQUEST:
      return {...state, loading: true, error: null};
    case FETCH_SERVICES_FAILURE:
      const { error } = action.payload;
      return {...state, loading: false, error};
    case FETCH_SERVICES_SUCCESS: 
      const { data } = action.payload;
      return {...state, items: data, loading: false, error: null};
    case REMOVE_SERVICE:
      const removeItem = action.payload;
      return state.items.filter((service) => service.id !== removeItem.id);
    case CHANGE_SERVICES_INIT:
      return {...state, loading: false, error: null};
    default:
      return state;
  }
}