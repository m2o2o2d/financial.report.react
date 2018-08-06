import {createStore, combineReducers, applyMiddleware} from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import * as login from './login/reducer';

export const store = createStore(
  combineReducers({...login}),
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);