import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer as friends, initialState } from './friend.module';

export default () => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');

    middlewares.push(logger);
  }

  const rootReducer = combineReducers({ friends });

  const store = createStore(
    rootReducer,
    { friends: initialState },
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  return store;
};
