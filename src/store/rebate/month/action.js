import API from '@/api/api';

export const REBATE_MONTH_INIT = 'REBATE_MONTH_INIT';
export const REBATE_MONTH_ADD = 'REBATE_MONTH_ADD';


const rebateMonthInit = (columns, data) => {
	return {
		type: REBATE_MONTH_INIT,
		columns: columns,
		items: data
	};
};

const rebateMonthAdd = (data, editingKeys) => {
	return {
		type: REBATE_MONTH_ADD,
		items: data,
		editingKeys: editingKeys
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

export const addItem = (data, preEditingKeys) => dispatch => {
	const newItem = {
		rebMonthRuleCode: "M-00" + (data.length + 1), 
		rebMonthRuleDesc: "", 
		rebBaseUnitPrice: 0, 
		rebMinPriceGap: 0, 
		rebValidYear: 0, 
		rebBonusLev1: 0,
		rebBonusLev2: 0,
		rebBonusLev3: 0
	};
	const items = [...data, newItem];
	const editingKeys = [...preEditingKeys, newItem.rebMonthRuleCode];
	dispatch(rebateMonthAdd(items, editingKeys));
};