import { ADD_SERVICE, CHANGE_SERVICE_FIELD, CHANGE_ADD_SERVICE_FIELD, CHANGE_SERVICE, CHANGE_SERVICE_CANCEL, FETCH_SERVICES_REQUEST, FETCH_SERVICES_FAILURE, FETCH_SERVICES_SUCCESS, FETCH_SERVICES_END_LOADING, IS_LOADING_REQUEST, IS_LOADING_FAILURE, ADD_SERVICES_REQUEST, ADD_SERVICES_FAILURE, ADD_SERVICES_SUCCESS, CHANGE_SERVICES_REQUEST, CHANGE_SERVICES_FAILURE, CHANGE_SERVICES_SUCCESS, CHANGE_SERVICES_INIT, IS_LOADING_SUCCESS } from './actionTypes.js';

export function changeAddServiceField(nameField, value) {
  return {type: CHANGE_ADD_SERVICE_FIELD, payload: {nameField, value}};
}

export function changeServiceField(nameField, value) {
  return {type: CHANGE_SERVICE_FIELD, payload: {nameField, value}};
}

export function changeServiceCancel () {
  return {type: CHANGE_SERVICE_CANCEL};
}

export function fetchServiceRequest () {
  return {type: FETCH_SERVICES_REQUEST};
}

export function fetchServiceFailure(error) {
  return {type: FETCH_SERVICES_FAILURE, payload: {error}};
}

export function fetchServiceSuccess(items) {
  return {type: FETCH_SERVICES_SUCCESS, payload: items}
}

export function addServiceRequest () {
  return {type: ADD_SERVICES_REQUEST};
}

export function addServiceFailure(error) {
  return {type: ADD_SERVICES_FAILURE, payload: {error}};
}

export function addServiceSuccess() {
  return {type: ADD_SERVICES_SUCCESS};
}

export function changeServiceRequest () {
  return {type: CHANGE_SERVICES_REQUEST};
}

export function changeServiceFailure(error) {
  return {type: CHANGE_SERVICES_FAILURE, payload: {error}};
}

export function changeServiceSuccess() {
  return {type: CHANGE_SERVICES_SUCCESS};
}

export function changeServiceInit(data) {
  return {type: CHANGE_SERVICES_INIT, payload: data}
}

export function fetchServiceEndLoading() {
  return {type: FETCH_SERVICES_END_LOADING};
}

export function isLoadingRequest() {
  return {type: IS_LOADING_REQUEST};
}

export function isLoadingFailure(error) {
  return {type: IS_LOADING_FAILURE, payload: {error}};
}
export function isLoadingSuccess() {
  return {type: IS_LOADING_SUCCESS};
}

export const fetchService = async (dispatch, id = null) => {
  dispatch(fetchServiceRequest());
  const url = id ? `${process.env.REACT_APP_LOCAL_URL}/${id}` : process.env.REACT_APP_LOCAL_URL;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    if (id) {
      dispatch(changeServiceInit(data));
    } else {
      dispatch(fetchServiceSuccess({data}));
    }
  } catch (e) {
    dispatch(fetchServiceFailure({error: e.message}));
  }
};

export const addService = async(dispatch, name, price, id) => {
  dispatch(addServiceRequest());
  try {
    await fetch(process.env.REACT_APP_LOCAL_URL, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
      },
        body: JSON.stringify({name, price}),
    });
    if (id) {
      dispatch(changeServiceSuccess());
    } else {
      dispatch(addServiceSuccess());
      fetchService(dispatch);
    }
  } catch (e) {
    dispatch(addServiceFailure(e.message));
  }
};


export const changeService = async (dispatch, id, name, price, content, goBack) => {
  dispatch(changeServiceRequest());
  try {
    const resp = await fetch(process.env.REACT_APP_LOCAL_URL, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
      },
      body: JSON.stringify({id, name, price, content}),
    });
    dispatch(changeServiceSuccess());
  } catch (e) {
    console.log(e);
    dispatch(changeServiceFailure({error: e.message}));
  }
}

export const removeService = async (dispatch, id) => {
  dispatch(isLoadingRequest());
  try {
    await fetch(`${process.env.REACT_APP_LOCAL_URL}/${id}`, {
      method: 'DELETE',
    });
  } catch (e) {
    dispatch(isLoadingFailure(e.message));
  } finally {
    dispatch(isLoadingSuccess());
    fetchService(dispatch);
  }  
};