import API from '@/api/api';

export const REBATE_MONTH_INIT = 'REBATE_MONTH_INIT';
export const REBATE_MONTH_SAVE_SUCCESS = 'REBATE_MONTH_SAVE_SUCCESS';

const rebateMonthInit = (columns, data) => {
	return {
		type: REBATE_MONTH_INIT,
		columns: columns,
		items: data
	};
};

const rebateMonthSaveSuccess = (data) => {
	return {
		type: REBATE_MONTH_SAVE_SUCCESS,
		items: data
	};
};

export const getRebateMonthCols = () => dispatch => {
	const columns = API.getRebateMonthCols();
	return columns;
}

export const initData = (columns) => dispatch => {
	const data = API.getRebateMonthData();
	dispatch(rebateMonthInit(columns, data));
};

export const save = (newItems) => dispatch => {
	const data = API.saveRebateMonthData(newItems);
	dispatch(rebateMonthSaveSuccess(data));
};