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

// const getRebateCustomerData = () => {
// 	return API.getRebateCustomerData();
// };

export const initData = () => dispatch => {
	const columns = getRebateCustomerCols();
	// const data = getRebateCustomerData();
	API.getRebateCustomerData()
	.then(
		response => {
			if(response.status >= 200 && response.status <300 && response.data !== "") {
				dispatch(rebateCustomerInit(columns, response.data));
			} else {
				const error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
		}
	)
	.catch(
		error => { console.log("Get rebate customer data failed, ", error); }
	);
};