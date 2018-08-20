import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import HomePage from './containers/HomePage';
import configureStore from './store/configureStore';

const store = configureStore();

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
