import * as rebateMonth from './action';

let initialState = {
	items: [],
	columns: []
};

const rebateMonthData = (state = initialState, action = {}) => {
	switch(action.type) {
		case rebateMonth.REBATE_MONTH_INIT:
			return {...state, columns: action.columns, items: action.items};
		default:
			return state;
	}
};

export default rebateMonthData;