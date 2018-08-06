import * as rebateYear from './action';

let initialState = {
	items: [],
	columns: []
};

const rebateYearData = (state = initialState, action = {}) => {
	switch(action.type) {
		case rebateYear.REBATE_YEAR_INIT:
			return {...state, columns: action.columns, items: action.items};
		default:
			return state;
	}
};

export default rebateYearData;