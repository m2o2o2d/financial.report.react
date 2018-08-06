import API from '@/api/api';

export const REBATE_MONTH_INIT = 'REBATE_MONTH_INIT';


const rebateMonthInit = (columns, data) => {
	return {
		type: REBATE_MONTH_INIT,
		columns: columns,
		items: data
	};
};

const getRebateMonthCols = () => {
	return API.getRebateMonthCols();
};

const getRebateMonthData = () => {
	return API.getRebateMonthData();
};

export const initData = () => dispatch => {
	const columns = getRebateMonthCols();
	const data = getRebateMonthData();
	dispatch(rebateMonthInit(columns, data));
};