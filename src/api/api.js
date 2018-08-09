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

	materialData = [
		{cInvCode: "30100015", cInvName: "蟹味菇-125g(1)中文膜水印箱6KG", cInvStd: "125g/盒*48"},
		{cInvCode: "30100016", cInvName: "蟹味菇-125g(2)中文膜水印箱6KG", cInvStd: "125g/盒*48"},
		{cInvCode: "30100019", cInvName: "蟹味菇-125g(1)中文膜水印箱5KG", cInvStd: "125g/盒*40"},
		{cInvCode: "30100020", cInvName: "蟹味菇-125g(2)中文膜水印箱5KG", cInvStd: "125g/盒*40"},
		{cInvCode: "30100021", cInvName: "蟹味菇-150g(1)中文膜泡沫箱6KG", cInvStd: "150g/盒"},
		{cInvCode: "30100022", cInvName: "蟹味菇-150g(2)中文膜泡沫箱6KG", cInvStd: "150G/盒"},
		{cInvCode: "30100023", cInvName: "蟹味菇-150g(1)中文膜彩印箱6KG", cInvStd: "150G/盒"},
		{cInvCode: "30100024", cInvName: "蟹味菇-150g(2)中文膜彩印箱6KG", cInvStd: "150G/盒"},
		{cInvCode: "30100025", cInvName: "蟹味菇-150g(1)中文膜水印箱6KG", cInvStd: "150G/盒"},
		{cInvCode: "30100026", cInvName: "蟹味菇-150g(2)中文膜水印箱6KG", cInvStd: "150G/盒"}
	];

	rebateMonthData = [
        {rebMonthRuleCode: "M001", rebMonthRuleDesc: "2018年 一级经销商返利", rebBaseUnitPrice: 80, rebMinPriceGap: 10, rebValidYear: 2018, rebBonusLev1: 5},
        {rebMonthRuleCode: "M002", rebMonthRuleDesc: "2018年 二级经销商返利", rebBaseUnitPrice: 70, rebMinPriceGap: 20, rebValidYear: 2018, rebBonusLev1: 5, rebBonusLev2: 1},
        {rebMonthRuleCode: "M003", rebMonthRuleDesc: "2018年 二级经销商返利", rebBaseUnitPrice: 60, rebMinPriceGap: 30, rebValidYear: 2018, rebBonusLev1: 5, rebBonusLev2: 2, rebBonusLev3: 1},
        {rebMonthRuleCode: "M004", rebMonthRuleDesc: "2018年 二级经销商返利", rebBaseUnitPrice: 60, rebMinPriceGap: 30, rebValidYear: 2017, rebBonusLev1: 5, rebBonusLev2: 2, rebBonusLev3: 1},
        {rebMonthRuleCode: "M005", rebMonthRuleDesc: "2018年 二级经销商返利", rebBaseUnitPrice: 60, rebMinPriceGap: 30, rebValidYear: 2017, rebBonusLev1: 5, rebBonusLev2: 2, rebBonusLev3: 1},
        {rebMonthRuleCode: "M006", rebMonthRuleDesc: "2018年 二级经销商返利", rebBaseUnitPrice: 60, rebMinPriceGap: 30, rebValidYear: 2017, rebBonusLev1: 5, rebBonusLev2: 2, rebBonusLev3: 1},
        {rebMonthRuleCode: "M007", rebMonthRuleDesc: "2018年 二级经销商返利", rebBaseUnitPrice: 60, rebMinPriceGap: 30, rebValidYear: 2017, rebBonusLev1: 5, rebBonusLev2: 2, rebBonusLev3: 1},
        {rebMonthRuleCode: "M008", rebMonthRuleDesc: "2018年 二级经销商返利", rebBaseUnitPrice: 60, rebMinPriceGap: 30, rebValidYear: 2017, rebBonusLev1: 5, rebBonusLev2: 2, rebBonusLev3: 1},
    ];

    rebateYearData = [
        // {rebYearRuleCode: "Y001", rebYearRuleDesc: "2018年 一级经销商年返", rebRevLowerLimit: 10, rebRebUpperLimit: 50, rebValidYear: 2018, rebBonusRate: 1},
        // {rebYearRuleCode: "Y002", rebYearRuleDesc: "2018年 二级经销商年返", rebRevLowerLimit: 50, rebRebUpperLimit: 100, rebValidYear: 2018, rebBonusRate: 1.5},
        // {rebYearRuleCode: "Y003", rebYearRuleDesc: "2018年 二级经销商年返", rebRevLowerLimit: 100, rebRebUpperLimit: 500, rebValidYear: 2018, rebBonusRate: 2.5},
        // {rebYearRuleCode: "Y004", rebYearRuleDesc: "2018年 二级经销商年返", rebRevLowerLimit: 100, rebRebUpperLimit: 500, rebValidYear: 2018, rebBonusRate: 2.5},
        // {rebYearRuleCode: "Y005", rebYearRuleDesc: "2018年 二级经销商年返", rebRevLowerLimit: 100, rebRebUpperLimit: 500, rebValidYear: 2018, rebBonusRate: 2.5},
        // {rebYearRuleCode: "Y006", rebYearRuleDesc: "2018年 二级经销商年返", rebRevLowerLimit: 100, rebRebUpperLimit: 500, rebValidYear: 2018, rebBonusRate: 2.5},
        {rebYearRuleCode: "Y001", rebValidYear: 2018, 
        	rules: [
        		{rebYearRuleIndex: "1", rebYearRuleDesc: "2018年 一级经销商年返", rebRevLowerLimit: 10, rebRebUpperLimit: 50, rebBonusRate: 1},
        		{rebYearRuleIndex: "2", rebYearRuleDesc: "2018年 二级经销商年返", rebRevLowerLimit: 50, rebRebUpperLimit: 100, rebBonusRate: 1.5},
        		{rebYearRuleIndex: "3", rebYearRuleDesc: "2018年 二级经销商年返", rebRevLowerLimit: 100, rebRebUpperLimit: 500, rebBonusRate: 2.5},
        	]
        },
        {rebYearRuleCode: "Y002", rebValidYear: 2017, 
        	rules: [
        		{rebYearRuleIndex: "1", rebYearRuleDesc: "2017年 一级经销商年返", rebRevLowerLimit: 10, rebRebUpperLimit: 50, rebBonusRate: 1},
        		{rebYearRuleIndex: "2", rebYearRuleDesc: "2017年 二级经销商年返", rebRevLowerLimit: 50, rebRebUpperLimit: 100, rebBonusRate: 1.5},
        		{rebYearRuleIndex: "3", rebYearRuleDesc: "2017年 二级经销商年返", rebRevLowerLimit: 100, rebRebUpperLimit: 500, rebBonusRate: 2.5},
        		{rebYearRuleIndex: "4", rebYearRuleDesc: "2017年 二级经销商年返", rebRevLowerLimit: 100, rebRebUpperLimit: 500, rebBonusRate: 2.5},
        	]
        },
        {rebYearRuleCode: "Y003", rebValidYear: 2016, 
        	rules: [
        		{rebYearRuleIndex: "1", rebYearRuleDesc: "2016年 一级经销商年返", rebRevLowerLimit: 10, rebRebUpperLimit: 50, rebBonusRate: 1},
        		{rebYearRuleIndex: "2", rebYearRuleDesc: "2016年 二级经销商年返", rebRevLowerLimit: 50, rebRebUpperLimit: 100, rebBonusRate: 1.5},
        		{rebYearRuleIndex: "3", rebYearRuleDesc: "2016年 二级经销商年返", rebRevLowerLimit: 100, rebRebUpperLimit: 500, rebBonusRate: 2.5},
        	]
        }
    ];

    rebateMaterialData = [
    	{key: "1", cInvCode: "30100015", cInvName: "蟹味菇-125g(1)中文膜水印箱6KG", cInvStd: "125g/盒*48", rebMonthRuleCode: "M001", rebYearRuleCode: "Y001"},
    	{key: "2", cInvCode: "30100016", cInvName: "蟹味菇-125g(2)中文膜水印箱6KG", cInvStd: "125g/盒*48", rebMonthRuleCode: "M001", rebYearRuleCode: "Y001"},
    	{key: "3", cInvCode: "30100019", cInvName: "蟹味菇-125g(1)中文膜水印箱5KG", cInvStd: "125g/盒*40", rebMonthRuleCode: "M002", rebYearRuleCode: "Y001"},
    	{key: "4", cInvCode: "30100020", cInvName: "蟹味菇-125g(2)中文膜水印箱5KG", cInvStd: "125g/盒*40", rebMonthRuleCode: "M002", rebYearRuleCode: "Y002"},
    	{key: "5", cInvCode: "30100021", cInvName: "蟹味菇-150g(1)中文膜水印箱6KG", cInvStd: "150g/盒", rebMonthRuleCode: "M003", rebYearRuleCode: "Y002"},
    	{key: "6", cInvCode: "30100022", cInvName: "蟹味菇-150g(2)中文膜水印箱6KG", cInvStd: "150g/盒", rebMonthRuleCode: "M003", rebYearRuleCode: "Y003"},
    ];

    rebateCustomerData = [
    	{key: "1", customerCode: "C001", customerName: "上海客户", rebMonthRuleCode: "M001", rebYearRuleCode: "Y001"},
        {key: "2", customerCode: "C002", customerName: "浙江客户", rebMonthRuleCode: "M001", rebYearRuleCode: "Y001"},
        {key: "3", customerCode: "C003", customerName: "全国大客户", rebMonthRuleCode: "M002", rebYearRuleCode: "Y002"},
        {key: "4", customerCode: "C004", customerName: "全国大客户", rebMonthRuleCode: "M002", rebYearRuleCode: "Y002"},
        {key: "5", customerCode: "C005", customerName: "全国大客户", rebMonthRuleCode: "M003", rebYearRuleCode: "Y003"},
        {key: "6", customerCode: "C006", customerName: "全国大客户", rebMonthRuleCode: "M003", rebYearRuleCode: "Y003"},
    ];

	/* Get user data */
	getUser(params = {}) {
		return axios.get(envconfig.baseURL + `/userdata/${params.userID}`);
	}

	/* Get material table columns */
	getMaterialCols() {
		const colWidthS = '10%';
		const colWidthM = '12%';
		const colWidthL = '30%';
		return [
			{key: 'cInvCode', title: '产品编号', dataIndex: 'cInvCode', width: colWidthM, editable: false, sorter: (a, b) => sortString(a.cInvCode, b.cInvCode)}, 
			{key: 'cInvName', title: '产品名称', dataIndex: 'cInvName', width: colWidthM, editable: true, sorter: (a, b) => sortString(a.cInvName, b.cInvName)}, 
			{key: 'cInvStd', title: '产品规格', dataIndex: 'cInvStd', width: colWidthM, editable: true}
		];
	}

	/* Get material data */
	getMaterialData() {
  		return this.materialData;
	}

	/* Get rebate material table columns */
	getRebateMaterialCols() {
		const colWidthS = '10%';
		const colWidthM = '12%';
		const colWidthL = '30%';
		return [
			{key: 'cInvCode', title: '产品编号', dataIndex: 'cInvCode', width: colWidthM, editable: true, sorter: (a, b) => sortString(a.cInvCode, b.cInvCode)}, 
			{key: 'cInvName', title: '产品名称', dataIndex: 'cInvName', width: colWidthM, editable: false, sorter: (a, b) => sortString(a.cInvName, b.cInvName)}, 
			{key: 'cInvStd', title: '产品规格', dataIndex: 'cInvStd', width: colWidthM, editable: false},
			{key: 'rebMonthRuleCode', title: '月度返利编码', dataIndex: 'rebMonthRuleCode', width: colWidthM, editable: false},
			{key: 'rebYearRuleCode', title: '年度返利编码', dataIndex: 'rebYearRuleCode', width: colWidthM, editable: false},
		];
	}

	/* Get rebate material data */
	getRebateMaterialData(colName, values) {
		if(colName) {
			const results =  this.rebateMaterialData.filter(
				item => {
					return values.includes(item[colName], 0);
				}
			);
			return results;
		}
		return this.rebateMaterialData;
	}

	/* Save material rebate data */
	saveRebateMaterialData(newItems) {
		return this.rebateMonthData = [...this.rebateMaterialData, ...newItems];
	}

	/* Get month rebate table columns */
	getRebateMonthCols() {
		const colWidthS = '10%';
		const colWidthM = '12%';
		const colWidthL = '30%';
		return [
			{key: 'rebMonthRuleCode', title: '月度返利编码', dataIndex: 'rebMonthRuleCode', width: colWidthM, editable: false, sorter: (a, b) => sortString(a.rebMonthRuleCode, b.rebMonthRuleCode)}, 
			{key: 'rebBaseUnitPrice', title: '基准单价(元)', dataIndex: 'rebBaseUnitPrice', width: colWidthM, editable: true, inputType: 'number', sorter: (a, b) => a.rebBaseUnitPrice - b.rebBaseUnitPrice}, 
			{key: 'rebMinPriceGap', title: '最大价差(元)', dataIndex: 'rebMinPriceGap', width: colWidthM, editable: true, inputType: 'number', sorter: (a, b) => a.rebMinPriceGap - b.rebMinPriceGap}, 
			{key: 'rebValidYear', title: '适用年度', dataIndex: 'rebValidYear', width: colWidthS, editable: true, inputType: 'number', sorter: (a, b) => a.rebValidYear - b.rebValidYear}, 
			{key: 'rebBonusLev1', title: '一级返利(元)', dataIndex: 'rebBonusLev1', width: colWidthS, editable: true, inputType: 'number'}, 
			{key: 'rebBonusLev2', title: '二级返利(元)', dataIndex: 'rebBonusLev2', width: colWidthS, editable: true, inputType: 'number'}, 
			{key: 'rebBonusLev3', title: '三级返利(元)', dataIndex: 'rebBonusLev3', width: colWidthS, editable: true, inputType: 'number'},
			{key: 'rebMonthRuleDesc', title: '返利规则描述', dataIndex: 'rebMonthRuleDesc', editable: true}
		];
	}

	/* Get month rebate data */
	getRebateMonthData() {
  		return this.rebateMonthData;
	}

	/* Save month rebate data */
	saveRebateMonthData(newItems) {
		return this.rebateMonthData = [...this.rebateMonthData, ...newItems];
	}

	/* Get year rebate table columns */
	getRebateYearCols(colType) {
		const colWidthS = "12%";
		const colWidthM = "20%";
		const colWidthL = "40%";
		if(colType === "detail") {
			return [
				// {key: 'rebYearRuleIndex', title: '年度返利编码', dataIndex: 'rebYearRuleIndex', width: colWidthS, editable: false, sorter: (a, b) => sortString(a.rebYearRuleIndex, b.rebYearRuleIndex)}, 
				{key: 'rebRevLowerLimit', title: '销售额度下限(万元)-不含', dataIndex: 'rebRevLowerLimit', width: colWidthM, editable: true, inputType: 'number', sorter: (a, b) => a.rebRevLowerLimit - b.rebRevLowerLimit}, 
				{key: 'rebRebUpperLimit', title: '销售额度上限(万元)-含', dataIndex: 'rebRebUpperLimit', width: colWidthM, editable: true, inputType: 'number', sorter: (a, b) => a.rebRebUpperLimit - b.rebRebUpperLimit}, 
				{key: 'rebBonusRate', title: '返利点(%)', dataIndex: 'rebBonusRate', width: colWidthS, editable: true, inputType: 'number'},
				{key: 'rebYearRuleDesc', title: '返利规则描述', dataIndex: 'rebYearRuleDesc', editable: true}
			];
		}
		return [
			{key: 'rebYearRuleCode', title: '年度返利编码', dataIndex: 'rebYearRuleCode', width: colWidthL, editable: false, sorter: (a, b) => sortString(a.rebYearRuleCode, b.rebYearRuleCode)},
			{key: 'rebValidYear', title: '适用年度', dataIndex: 'rebValidYear', width: colWidthL, editable: true, inputType: 'number'}
		];
		// const colWidthS = 160;
		// const colWidthM = 200;
		// return [
		// 	{key: 'rebYearRuleCode', title: '年度返利编码', dataIndex: 'rebYearRuleCode', width: colWidthS, sorter: (a, b) => sortString(a.rebYearRuleCode, b.rebYearRuleCode)}, 
		// 	{key: 'rebRevLowerLimit', title: '销售额度下限(万元)-不含', dataIndex: 'rebRevLowerLimit', width: colWidthM, sorter: (a, b) => a.rebRevLowerLimit - b.rebRevLowerLimit}, 
		// 	{key: 'rebRebUpperLimit', title: '销售额度上限(万元)-含', dataIndex: 'rebRebUpperLimit', width: colWidthM, sorter: (a, b) => a.rebRebUpperLimit - b.rebRebUpperLimit}, 
		// 	{key: 'rebValidYear', title: '适用年度', dataIndex: 'rebValidYear', width: colWidthS}, 
		// 	{key: 'rebBonusRate', title: '返利点(%)', dataIndex: 'rebBonusRate', width: colWidthS},
		// 	{key: 'rebYearRuleDesc', title: '返利规则描述', dataIndex: 'rebYearRuleDesc'}
		// ];
	}

	/* Get year rebate data */
	getRebateYearData(dataType, rebYearRuleCode) {
		if(dataType === "detail") {
			const item = this.rebateYearData.find((item) => {
				return item.rebYearRuleCode === rebYearRuleCode;
			});
			return item && item.rules;
		}
  		return this.rebateYearData;
	}

	/* Save year rebate data */
	saveRebateYearData(newItems) {
		return this.rebateYearData = [...this.rebateYearData, ...newItems];
	}

	/* Get customer rebate table columns */
	getRebateCustomerCols() {
		const colWidthS = 160;
		const colWidthM = 200;
		return [
			{key: 'customerCode', title: '客户编码', dataIndex: 'customerCode', width: colWidthS, editable: true, sorter: (a, b) => sortString(a.customerCode, b.customerCode)}, 
			{key: 'customerName', title: '客户名称', dataIndex: 'customerName', width: colWidthS, editable: false, sorter: (a, b) => sortString(a.customerName, b.customerName)}, 
			{key: 'rebMonthRuleCode', title: '月度返利规则', dataIndex: 'rebMonthRuleCode', width: colWidthS, editable: false, sorter: (a, b) => sortString(a.rebMonthRuleCode, b.rebMonthRuleCode)}, 
			{key: 'rebYearRuleCode', title: '年度返利规则', dataIndex: 'rebYearRuleCode', width: colWidthS, editable: false, sorter: (a, b) => sortString(a.rebYearRuleCode, b.rebYearRuleCode)},
			// {key: 'createdAt', title: '创建时间', dataIndex: 'createdAt', width: colWidthS},
			// {key: 'updatedAt', title: '更新时间', dataIndex: 'updatedAt', width: colWidthS}
		];
	}

	/* Get customer rebate data */
	getRebateCustomerData(colName, values) {
		// return axios.get(envconfig.baseURL + `/rebatecustomer`);
		if(colName) {
			const results =  this.rebateCustomerData.filter(
				item => {
					return values.includes(item[colName], 0);
				}
			);
			return results;
		}
		return this.rebateCustomerData;
	}
}

export default API.getInstance();