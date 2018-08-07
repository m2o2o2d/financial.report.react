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

	tableProperty = {
		colWidthS: 80,
		colWidthM: 150,
		colWidthL: 200
	}

	/* Get user data */
	getUser(params = {}) {
		return axios.get(envconfig.baseURL + `/userdata/${params.userID}`);
	}

	/* Get month rebate table columns */
	getRebateMonthCols() {
		const colWidthS = 160;
		const colWidthM = 260;
		return [
			{key: 'rebMonthRuleCode', title: '月度返利编码', dataIndex: 'rebMonthRuleCode', width: colWidthS, editable: false, sorter: (a, b) => sortString(a.rebMonthRuleCode, b.rebMonthRuleCode)}, 
			{key: 'rebBaseUnitPrice', title: '基准单价(元)', dataIndex: 'rebBaseUnitPrice', width: colWidthS, editable: true, inputType: 'number', sorter: (a, b) => a.rebBaseUnitPrice - b.rebBaseUnitPrice}, 
			{key: 'rebMinPriceGap', title: '最大价差(元)', dataIndex: 'rebMinPriceGap', width: colWidthS, editable: true, inputType: 'number', sorter: (a, b) => a.rebMinPriceGap - b.rebMinPriceGap}, 
			{key: 'rebValidYear', title: '适用年度', dataIndex: 'rebValidYear', width: colWidthS, editable: true, inputType: 'number'}, 
			{key: 'rebBonusLev1', title: '一级返利(元)', dataIndex: 'rebBonusLev1', width: colWidthS, editable: true, inputType: 'number'}, 
			{key: 'rebBonusLev2', title: '二级返利(元)', dataIndex: 'rebBonusLev2', width: colWidthS, editable: true, inputType: 'number'}, 
			{key: 'rebBonusLev3', title: '三级返利(元)', dataIndex: 'rebBonusLev3', width: colWidthS, editable: true, inputType: 'number'},
			{key: 'rebMonthRuleDesc', title: '返利规则描述', dataIndex: 'rebMonthRuleDesc', editable: true}
		];
	}

	/* Get month rebate data */
	getRebateMonthData() {
  		return [
            {rebMonthRuleCode: "M-001", rebMonthRuleDesc: "2018年 一级经销商返利", rebBaseUnitPrice: 80, rebMinPriceGap: 10, rebValidYear: 2018, rebBonusLev1: 5},
            {rebMonthRuleCode: "M-002", rebMonthRuleDesc: "2018年 二级经销商返利", rebBaseUnitPrice: 70, rebMinPriceGap: 20, rebValidYear: 2018, rebBonusLev1: 5, rebBonusLev2: 1},
            {rebMonthRuleCode: "M-003", rebMonthRuleDesc: "2018年 二级经销商返利", rebBaseUnitPrice: 60, rebMinPriceGap: 30, rebValidYear: 2018, rebBonusLev1: 5, rebBonusLev2: 2, rebBonusLev3: 1},
            {rebMonthRuleCode: "M-004", rebMonthRuleDesc: "2018年 二级经销商返利", rebBaseUnitPrice: 60, rebMinPriceGap: 30, rebValidYear: 2018, rebBonusLev1: 5, rebBonusLev2: 2, rebBonusLev3: 1},
            {rebMonthRuleCode: "M-005", rebMonthRuleDesc: "2018年 二级经销商返利", rebBaseUnitPrice: 60, rebMinPriceGap: 30, rebValidYear: 2018, rebBonusLev1: 5, rebBonusLev2: 2, rebBonusLev3: 1},
            {rebMonthRuleCode: "M-006", rebMonthRuleDesc: "2018年 二级经销商返利", rebBaseUnitPrice: 60, rebMinPriceGap: 30, rebValidYear: 2018, rebBonusLev1: 5, rebBonusLev2: 2, rebBonusLev3: 1},
        ];
	}

	/* Get year rebate table columns */
	getRebateYearCols() {
		const colWidthS = 160;
		const colWidthM = 200;
		return [
			{key: 'rebYearRuleCode', title: '年度返利编码', dataIndex: 'rebYearRuleCode', width: colWidthS, sorter: (a, b) => sortString(a.rebYearRuleCode, b.rebYearRuleCode)}, 
			{key: 'rebRevLowerLimit', title: '销售额度下限(万元)-不含', dataIndex: 'rebRevLowerLimit', width: colWidthM, sorter: (a, b) => a.rebRevLowerLimit - b.rebRevLowerLimit}, 
			{key: 'rebRebUpperLimit', title: '销售额度上限(万元)-含', dataIndex: 'rebRebUpperLimit', width: colWidthM, sorter: (a, b) => a.rebRebUpperLimit - b.rebRebUpperLimit}, 
			{key: 'rebValidYear', title: '适用年度', dataIndex: 'rebValidYear', width: colWidthS}, 
			{key: 'rebBonusRate', title: '返利点(%)', dataIndex: 'rebBonusRate', width: colWidthS},
			{key: 'rebYearRuleDesc', title: '年度返利描述', dataIndex: 'rebYearRuleDesc'}
		];
	}

	/* Get year rebate data */
	getRebateYearData() {
  		return [
            {rebYearRuleCode: "Y-001", rebYearRuleDesc: "2018年 一级经销商年返", rebRevLowerLimit: 10, rebRebUpperLimit: 50, rebValidYear: 2018, rebBonusRate: 1},
            {rebYearRuleCode: "Y-002", rebYearRuleDesc: "2018年 二级经销商年返", rebRevLowerLimit: 50, rebRebUpperLimit: 100, rebValidYear: 2018, rebBonusRate: 1.5},
            {rebYearRuleCode: "Y-003", rebYearRuleDesc: "2018年 二级经销商年返", rebRevLowerLimit: 100, rebRebUpperLimit: 500, rebValidYear: 2018, rebBonusRate: 2.5},
            {rebYearRuleCode: "Y-004", rebYearRuleDesc: "2018年 二级经销商年返", rebRevLowerLimit: 100, rebRebUpperLimit: 500, rebValidYear: 2018, rebBonusRate: 2.5},
            {rebYearRuleCode: "Y-005", rebYearRuleDesc: "2018年 二级经销商年返", rebRevLowerLimit: 100, rebRebUpperLimit: 500, rebValidYear: 2018, rebBonusRate: 2.5},
            {rebYearRuleCode: "Y-006", rebYearRuleDesc: "2018年 二级经销商年返", rebRevLowerLimit: 100, rebRebUpperLimit: 500, rebValidYear: 2018, rebBonusRate: 2.5},
        ];
	}

	/* Get customer rebate table columns */
	getRebateCustomerCols() {
		const colWidthS = 160;
		const colWidthM = 200;
		return [
			{key: 'customerCode', title: '客户编码', dataIndex: 'customerCode', width: colWidthS, sorter: (a, b) => sortString(a.customerCode, b.customerCode)}, 
			{key: 'customerName', title: '客户名称', dataIndex: 'customerName', width: colWidthS, sorter: (a, b) => sortString(a.customerName, b.customerName)}, 
			{key: 'rebMonthRuleCode', title: '月度返利规则', dataIndex: 'rebMonthRuleCode', width: colWidthS, sorter: (a, b) => sortString(a.rebMonthRuleCode, b.rebMonthRuleCode)}, 
			{key: 'rebYearRuleCode', title: '年度返利规则', dataIndex: 'rebYearRuleCode', width: colWidthS, sorter: (a, b) => sortString(a.rebYearRuleCode, b.rebYearRuleCode)},
			{key: 'createdAt', title: '创建时间', dataIndex: 'createdAt', width: colWidthS},
			{key: 'updatedAt', title: '更新时间', dataIndex: 'updatedAt', width: colWidthS}
		];
	}

	/* Get customer rebate data */
	getRebateCustomerData() {
		return axios.get(envconfig.baseURL + `/rebatecustomer`);
		// return [
  //           {key: "1", customerCode: "kh001", customerName: "上海客户", rebMonthRuleCode: "M-001", rebYearRuleCode: "Y-001 2018年 一级经销商年返"},
  //           {key: "2", customerCode: "kh002", customerName: "浙江客户", rebMonthRuleCode: "M-001", rebYearRuleCode: "Y-001 2018年 一级经销商年返"},
  //           {key: "3", customerCode: "kh003", customerName: "全国大客户", rebMonthRuleCode: "M-001", rebYearRuleCode: "Y-001 2018年 一级经销商年返"},
  //           {key: "4", customerCode: "kh003", customerName: "全国大客户", rebMonthRuleCode: "M-001", rebYearRuleCode: "Y-001 2018年 一级经销商年返"},
  //           {key: "5", customerCode: "kh003", customerName: "全国大客户", rebMonthRuleCode: "M-001", rebYearRuleCode: "Y-001 2018年 一级经销商年返"},
  //           {key: "6", customerCode: "kh003", customerName: "全国大客户", rebMonthRuleCode: "M-001", rebYearRuleCode: "Y-001 2018年 一级经销商年返"},
  //       ];
	}
}

export default API.getInstance();