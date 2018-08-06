import {createStore, combineReducers, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/es/storage';
import thunk from 'redux-thunk';
import * as login from './login/reducer';

const store = createStore(
  	combineReducers({
	...login
	}),
	applyMiddleware(thunk)
);

const persistor = persistStore(store);

export { store, persistor };