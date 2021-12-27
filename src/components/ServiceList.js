import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeService, fetchService } from '../actions/actionCreators.js';
import ServiceAdd from './ServiceAdd.js';

export default function ServiceList(props) {
  const { match, history} = props;
  const { items, loading, error } = useSelector((state) => state.serviceList);
  const { isLoading, isError } = useSelector((state) => state.serviceIsLoadng);
  const dispatch = useDispatch();

  useEffect (() => {
    fetchService(dispatch);
  },[dispatch])

  const handleRemove = id => {
    removeService(dispatch, id);
  };

  const handleChange = (id) => {
    history.push(`${match.url}/${id}`);
  };

  const handleRefresh = () => {
    fetchService(dispatch);
  };

  if (loading) {
    return <div className='loading'></div>
  }

  if (error) {
    return (
      <React.Fragment>
        <div className="error-msg">Произошла ошибка!</div>
        <div onClick={handleRefresh}>Refresh</div>
      </React.Fragment>
    );
  }

console.log(match.url)

  return (
    <React.Fragment>
      <ServiceAdd />
      <ul>
        {items && items.map((o) => <li key={o.id}>
          {o.name} {o.price}
          <button className="material-icons" onClick={() => handleChange(o.id)}>create</button>
          <button className="material-icons" onClick={() => handleRemove(o.id)} disabled={isLoading}>clear</button>
          {/* {isLoading && <div className='loading'></div>} */}
        </li>)}
      </ul>
    </React.Fragment>
  );
}