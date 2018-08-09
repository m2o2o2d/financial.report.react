import API from '@/api/api';

export const REBATE_YEAR_INIT = 'REBATE_YEAR_INIT';
export const REBATE_YEAR_SAVE_SUCCESS = 'REBATE_YEAR_SAVE_SUCCESS';


const rebateYearInit = (columns, data) => {
	return {
		type: REBATE_YEAR_INIT,
		columns: columns,
		items: data
	};
};

const rebateYearSaveSuccess = (data) => {
	return {
		type: REBATE_YEAR_SAVE_SUCCESS,
		items: data
	};
};

const getRebateYearCols = () => {
	return API.getRebateYearCols();
};

const getRebateYearData = () => {
	return API.getRebateYearData();
};

export const initData = (columns) => dispatch => {
	const data = getRebateYearData();
	dispatch(rebateYearInit(columns, data));
};

export const save = (newItems) => dispatch => {
	const data = API.saveRebateYearData(newItems);
	dispatch(rebateYearSaveSuccess(data));
};