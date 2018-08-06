import * as rebateCustomer from './action';

let initialState = {
	items: [],
	columns: []
};

const rebateCustomerData = (state = initialState, action = {}) => {
	switch(action.type) {
		case rebateCustomer.REBATE_CUSTOMER_INIT:
			return {
				...state,
				items: action.items, 
				columns: action.columns
			};
		default:
			return state;
	}
};

export default rebateCustomerData;