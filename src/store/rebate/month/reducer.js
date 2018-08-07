import * as rebateMonth from './action';

let initialState = {
	items: [],
	columns: [],
	// editingKeys: []
};

const rebateMonthData = (state = initialState, action = {}) => {
	switch(action.type) {
		case rebateMonth.REBATE_MONTH_INIT:
			return {...state, items: action.items, columns: action.columns};
		// case rebateMonth.REBATE_MONTH_ADD:
		// 	return {...state, editingKeys: [...state.editingKeys, action.newEditingKey]};
		case rebateMonth.REBATE_MONTH_SAVE_SUCCESS:
			return {...state, items: action.items};
		default:
			return state;
	}
};

export default rebateMonthData;