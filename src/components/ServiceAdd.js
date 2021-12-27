import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeAddServiceField, addService } from '../actions/actionCreators.js';

export default function ServiceAdd(props) {
  const { item, loading, error } = useSelector((state) => state.serviceAdd);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const {name, value} = event.target;
    dispatch(changeAddServiceField(name, value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addService(dispatch, item.name, item.price);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-msg">Произошла ошибка!</div>}
      <input name='name' onChange={handleChange} value={item.name} />
      <input name='price' onChange={handleChange} value={item.price} />
      {!loading && <button type='submit' disabled={loading}>Save</button>}
      {loading && <div className='loading'></div>}
    </form>
  );
}