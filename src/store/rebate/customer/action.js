import API from '@/api/api';

export const REBATE_CUSTOMER_INIT = 'REBATE_CUSTOMER_INIT';


const rebateCustomerInit = (columns, data) => {
	return {
		type: REBATE_CUSTOMER_INIT,
		columns: columns,
		items: data
	};
};

const getRebateCustomerCols = () => {
	return API.getRebateCustomerCols();
};

const getRebateCustomerData = () => {
	return API.getRebateCustomerData();
};

export const initData = () => dispatch => {
	const columns = getRebateCustomerCols();
	const data = getRebateCustomerData();
	dispatch(rebateCustomerInit(columns, data));
};