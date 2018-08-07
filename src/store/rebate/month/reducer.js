import * as rebateMonth from './action';

let initialState = {
	items: [],
	columns: [],
	editingKeys: []
};

const rebateMonthData = (state = initialState, action = {}) => {
	switch(action.type) {
		case rebateMonth.REBATE_MONTH_INIT:
			return {...state, columns: action.columns, items: action.items};
		case rebateMonth.REBATE_MONTH_ADD:
			return {...state, items: action.items, editingKeys: action.editingKeys};
		default:
			return state;
	}
};

export default rebateMonthData;