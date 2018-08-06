import {createStore, combineReducers, applyMiddleware} from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import login from './login/reducer';
import rebateMonth from './rebate/month/reducer';
import rebateYear from './rebate/year/reducer';
import rebateCustomer from './rebate/customer/reducer';

const rootReducer = combineReducers({
	auth: login,
	rebateMonth: rebateMonth,
	rebateYear: rebateYear,
	rebateCustomer: rebateCustomer
});

const store = createStore(
  	rootReducer,
	applyMiddleware(thunk)
);

const persistor = persistStore(store);

export { store, persistor };