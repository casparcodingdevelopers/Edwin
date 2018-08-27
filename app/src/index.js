import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import 'semantic-ui-css/semantic.min.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import createStore from './store/createStore';
import App from './components/App';

const store = createStore();
const history = createHistory();
const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  rootElement
);
registerServiceWorker();
