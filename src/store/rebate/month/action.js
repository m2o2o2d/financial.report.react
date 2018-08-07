import API from '@/api/api';

export const REBATE_MONTH_INIT = 'REBATE_MONTH_INIT';
// export const REBATE_MONTH_ADD = 'REBATE_MONTH_ADD';
export const REBATE_MONTH_SAVE_SUCCESS = 'REBATE_MONTH_SAVE_SUCCESS';

const rebateMonthInit = (columns, data) => {
	return {
		type: REBATE_MONTH_INIT,
		columns: columns,
		items: data
	};
};

// const rebateMonthAdd = (editingKey) => {
// 	return {
// 		type: REBATE_MONTH_ADD,
// 		newEditingKey: editingKey
// 	};
// };

const rebateMonthSaveSuccess = (data) => {
	return {
		type: REBATE_MONTH_SAVE_SUCCESS,
		items: data
	};
};

export const initData = () => dispatch => {
	const columns = API.getRebateMonthCols();
	const data = API.getRebateMonthData();
	dispatch(rebateMonthInit(columns, data));
};

// export const addItem = (editingKey) => dispatch => {
// 	dispatch(rebateMonthAdd(editingKey));
// };

export const save = (newItems) => dispatch => {
	const data = API.saveRebateMonthData(newItems);
	dispatch(rebateMonthSaveSuccess(data));
};