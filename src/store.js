import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import logger from 'redux-logger';

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk, logger),
);

export const { dispatch } = store;

export default store;
