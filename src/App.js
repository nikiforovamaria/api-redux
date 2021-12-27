import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom';
import ServiceList from './components/ServiceList.js';
import ServiceChange from './components/ServiceChange.js';


export default function App(props) {
  // const urlEnv = process.env.REACT_APP_LOCAL_URL;
  const url = window.location.pathname;
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path={`${url}services/:id`} component={ServiceChange} />
          <Route path={`${url}services`} component={ServiceList} />
          <Redirect exact from={`${url}`} to={`${url}services`} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}
