import API from '@/api/api';

export const REBATE_YEAR_INIT = 'REBATE_YEAR_INIT';


const rebateYearInit = (columns, data) => {
	return {
		type: REBATE_YEAR_INIT,
		columns: columns,
		items: data
	};
};

const getRebateYearCols = () => {
	return API.getRebateYearCols();
};

const getRebateYearData = () => {
	return API.getRebateYearData();
};

export const initData = () => dispatch => {
	const columns = getRebateYearCols();
	const data = getRebateYearData();
	dispatch(rebateYearInit(columns, data));
};