import axios from 'axios';
import envconfig from '@/envconfig/envconfig';
import { sortString } from '@/utils/funcUtils';

class API {

	static getInstance() {
		if(!this.instance) {
			this.instance = new API();
		}
		return this.instance;
	}

	/* Get user data */
	getUser(params = {}) {
		return axios.get(envconfig.baseURL + `/userdata/${params.userID}`);
	}

	/* Get month rebate table columns */
	getRebateMonthCols() {
		return [
			{key: 'rebMonthRuleCode', title: '月度返利编码', dataIndex: 'rebMonthRuleCode', sorter: (a, b) => sortString(a.rebMonthRuleCode, b.rebMonthRuleCode)}, 
			{key: 'rebMonthRuleDesc', title: '返利规则描述', dataIndex: 'rebMonthRuleDesc'}, 
			{key: 'rebBaseUnitPrice', title: '基准单价(元)', dataIndex: 'rebBaseUnitPrice', sorter: (a, b) => a.rebBaseUnitPrice - b.rebBaseUnitPrice}, 
			{key: 'rebMinPriceGap', title: '最大价差(元)', dataIndex: 'rebMinPriceGap', sorter: (a, b) => a.rebMinPriceGap - b.rebMinPriceGap}, 
			{key: 'rebValidYear', title: '适用年度', dataIndex: 'rebValidYear'}, 
			{key: 'rebBonusLev1', title: '一级返利(元)', dataIndex: 'rebBonusLev1'}, 
			{key: 'rebBonusLev2', title: '二级返利(元)', dataIndex: 'rebBonusLev2'}, 
			{key: 'rebBonusLev3', title: '三级返利(元)', dataIndex: 'rebBonusLev3'}
		];
	}

	/* Get month rebate data */
	getRebateMonthData() {
		return [
            {key: "1", rebMonthRuleCode: "M-001", rebMonthRuleDesc: "2018年 一级经销商返利", rebBaseUnitPrice: 80, rebMinPriceGap: 10, rebValidYear: 2018, rebBonusLev1: 5},
            {key: "2", rebMonthRuleCode: "M-002", rebMonthRuleDesc: "2018年 二级经销商返利", rebBaseUnitPrice: 70, rebMinPriceGap: 20, rebValidYear: 2018, rebBonusLev1: 5, rebBonusLev2: 1},
            {key: "3", rebMonthRuleCode: "M-003", rebMonthRuleDesc: "2018年 二级经销商返利", rebBaseUnitPrice: 60, rebMinPriceGap: 30, rebValidYear: 2018, rebBonusLev1: 5, rebBonusLev2: 2, rebBonusLev3: 1},
            {key: "4", rebMonthRuleCode: "M-003", rebMonthRuleDesc: "2018年 二级经销商返利", rebBaseUnitPrice: 60, rebMinPriceGap: 30, rebValidYear: 2018, rebBonusLev1: 5, rebBonusLev2: 2, rebBonusLev3: 1},
            {key: "5", rebMonthRuleCode: "M-003", rebMonthRuleDesc: "2018年 二级经销商返利", rebBaseUnitPrice: 60, rebMinPriceGap: 30, rebValidYear: 2018, rebBonusLev1: 5, rebBonusLev2: 2, rebBonusLev3: 1},
            {key: "6", rebMonthRuleCode: "M-003", rebMonthRuleDesc: "2018年 二级经销商返利", rebBaseUnitPrice: 60, rebMinPriceGap: 30, rebValidYear: 2018, rebBonusLev1: 5, rebBonusLev2: 2, rebBonusLev3: 1},
        ];
	}

	/* Get year rebate table columns */
	getRebateYearCols() {
		return [
			{key: 'rebYearRuleCode', title: '年度返利编码', dataIndex: 'rebYearRuleCode', sorter: (a, b) => sortString(a.rebYearRuleCode, b.rebYearRuleCode)}, 
			{key: 'rebYearRuleDesc', title: '年度返利描述', dataIndex: 'rebYearRuleDesc'}, 
			{key: 'rebRevLowerLimit', title: '销售额度下限(万元)-不含', dataIndex: 'rebRevLowerLimit', sorter: (a, b) => a.rebRevLowerLimit - b.rebRevLowerLimit}, 
			{key: 'rebRebUpperLimit', title: '销售额度上限(万元)-含', dataIndex: 'rebRebUpperLimit', sorter: (a, b) => a.rebRebUpperLimit - b.rebRebUpperLimit}, 
			{key: 'rebValidYear', title: '适用年度', dataIndex: 'rebValidYear'}, 
			{key: 'rebBonusRate', title: '返利点(%)', dataIndex: 'rebBonusRate'}
		];
	}

	/* Get year rebate data */
	getRebateYearData() {
		return [
            {key: "1", rebYearRuleCode: "Y-001", rebYearRuleDesc: "2018年 一级经销商年返", rebRevLowerLimit: 10, rebRebUpperLimit: 50, rebValidYear: 2018, rebBonusRate: 1},
            {key: "2", rebYearRuleCode: "Y-002", rebYearRuleDesc: "2018年 二级经销商年返", rebRevLowerLimit: 50, rebRebUpperLimit: 100, rebValidYear: 2018, rebBonusRate: 1.5},
            {key: "3", rebYearRuleCode: "Y-003", rebYearRuleDesc: "2018年 二级经销商年返", rebRevLowerLimit: 100, rebRebUpperLimit: 500, rebValidYear: 2018, rebBonusRate: 2.5},
            {key: "4", rebYearRuleCode: "Y-003", rebYearRuleDesc: "2018年 二级经销商年返", rebRevLowerLimit: 100, rebRebUpperLimit: 500, rebValidYear: 2018, rebBonusRate: 2.5},
            {key: "5", rebYearRuleCode: "Y-003", rebYearRuleDesc: "2018年 二级经销商年返", rebRevLowerLimit: 100, rebRebUpperLimit: 500, rebValidYear: 2018, rebBonusRate: 2.5},
            {key: "6", rebYearRuleCode: "Y-003", rebYearRuleDesc: "2018年 二级经销商年返", rebRevLowerLimit: 100, rebRebUpperLimit: 500, rebValidYear: 2018, rebBonusRate: 2.5},
        ];
	}

	/* Get customer rebate table columns */
	getRebateCustomerCols() {
		return [
			{key: 'rebCustomerCode', title: '客户编码', dataIndex: 'rebCustomerCode', sorter: (a, b) => sortString(a.rebCustomerCode, b.rebCustomerCode)}, 
			{key: 'rebCustomerName', title: '客户名称', dataIndex: 'rebCustomerName', sorter: (a, b) => sortString(a.rebCustomerName - b.rebCustomerName)}, 
			{key: 'rebMonthRuleCode', title: '月度返利规则', dataIndex: 'rebMonthRuleCode', sorter: (a, b) => sortString(a.rebMonthRuleCode - b.rebMonthRuleCode)}, 
			{key: 'rebYearRuleCode', title: '年度返利规则', dataIndex: 'rebYearRuleCode', sorter: (a, b) => sortString(a.rebYearRuleCode - b.rebYearRuleCode)}
		];
	}

	/* Get customer rebate data */
	getRebateCustomerData() {
		return [
            {key: "1", rebCustomerCode: "kh001", rebCustomerName: "上海客户", rebMonthRuleCode: "M-001", rebYearRuleCode: "Y-001 2018年 一级经销商年返"},
            {key: "2", rebCustomerCode: "kh002", rebCustomerName: "浙江客户", rebMonthRuleCode: "M-001", rebYearRuleCode: "Y-001 2018年 一级经销商年返"},
            {key: "3", rebCustomerCode: "kh003", rebCustomerName: "全国大客户", rebMonthRuleCode: "M-001", rebYearRuleCode: "Y-001 2018年 一级经销商年返"},
            {key: "4", rebCustomerCode: "kh003", rebCustomerName: "全国大客户", rebMonthRuleCode: "M-001", rebYearRuleCode: "Y-001 2018年 一级经销商年返"},
            {key: "5", rebCustomerCode: "kh003", rebCustomerName: "全国大客户", rebMonthRuleCode: "M-001", rebYearRuleCode: "Y-001 2018年 一级经销商年返"},
            {key: "6", rebCustomerCode: "kh003", rebCustomerName: "全国大客户", rebMonthRuleCode: "M-001", rebYearRuleCode: "Y-001 2018年 一级经销商年返"},
        ];
	}
}

export default API.getInstance();