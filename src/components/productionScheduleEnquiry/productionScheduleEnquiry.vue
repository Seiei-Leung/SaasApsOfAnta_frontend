<template>
    <div class="productionScheduleEnquiry-component">
        <div class="contentWrapper" v-bind:style="{width: msgOfCSS.widthOfWindow}">
			<!-- 表格 -->
            <v-seieiTable
                :heightOfRealTable="msgOfCSS.heightOfTable"
				:widthOfRealTable="msgOfCSS.widthOfTable"
                :dataOfSource="resultListOfShow"
                :columns="tableColumns"
                :loading="isTableLoading"
                :row-class-name="rowClassName"
                :isPaging="true"
            ></v-seieiTable>
            
        </div>
    </div>
</template>

<script>
import seieiTable from "../seieiTable/seieiTable";
import DateUtil from "../../common/DateUtil";
import CONST from "../../common/const";
import StrUtil from "../../common/strUtil";

export default {
    data: function() {
        return {
            resultListOfSource: [], // 源数据
            resultListOfShow: [], // 数据用于筛选显示
            tableColumns: [
                {
                    title: "生产组别",
                    key: "workgroup",
                    align: "center",
            		filter: {
              			type: 'Input'
            		},
                    width: 100
                },
                {
                    title: "生产车间",
                    key: "workshop",
                    align: "center",
            		filter: {
              			type: 'Input'
            		},
                    width: 100
                },
                {
                    title: "生产线",
                    key: "linecode",
                    align: "center",
            		filter: {
              			type: 'Input'
            		},
                    width: 100
                },
                {
                    title: "工作时数",
                    key: "workhours",
                    align: "center",
                    width: 100,
					sortable: 'custom'
                },
                {
                    title: "工作人数",
                    key: "peoplenum",
                    align: "center",
					sortable: 'custom',
                    width: 100
                },
                {
                    title: "制单号",
                    key: "orderno",
                    align: "center",
            		filter: {
              			type: 'Input'
            		},
                    width: 100
                },
                {
                    title: "款号",
                    key: "styleno",
                    align: "center",
            		filter: {
              			type: 'Input'
            		},
                    width: 100
                },
                {
                    title: "季节",
                    key: "season",
                    align: "center",
            		filter: {
              			type: 'Input'
            		},
                    width: 100
                },
                {
                    title: "款式",
                    key: "style",
                    align: "center",
            		filter: {
              			type: 'Input'
            		},
                    width: 100
                },
                {
                    title: "品类",
                    key: "goodname",
                    align: "center",
            		filter: {
              			type: 'Input'
            		},
                    width: 100
                },
                {
                    title: "SAM",
                    key: "sam",
                    align: "center",
					sortable: 'custom',
                    width: 100
                },
                {
                    title: "SAH",
                    key: "sah",
                    align: "center",
					sortable: 'custom',
                    width: 100
                },
                {
                    title: "订单类别",
                    key: "orderkind",
                    align: "center",
            		filter: {
              			type: 'Input'
            		},
                    width: 100
                },
                {
                    title: "制单数",
                    key: "ordernum",
                    align: "center",
					sortable: 'custom',
                    width: 100
                },
                {
                    title: "分批走数数",
                    key: "qtyofbatcheddelivery",
                    align: "center",
					sortable: 'custom',
                    width: 100
                },
                {
                    title: "完成数",
                    key: "qtyFinish",
                    align: "center",
					sortable: 'custom',
                    width: 100
                },
                {
                    title: "离厂期",
                    key: "deliveryoffactoryTime",
                    align: "center",
					sortable: 'custom',
                    width: 100
                },
                {
                    title: "计划离厂期",
                    key: "planningDeliveryOfFactoryTime",
                    align: "center",
					sortable: 'custom',
                    width: 100
                },
                {
                    title: "车缝开始时间",
                    key: "startTime",
                    align: "center",
					sortable: 'custom',
                    width: 100
                },
                {
                    title: "车缝完成时间",
                    key: "endTime",
                    align: "center",
					sortable: 'custom',
                    width: 100
                },
                {
                    title: "后整天数",
                    key: "backpartDaynum",
                    align: "center",
					sortable: 'custom',
                    width: 100
                },
                {
                    title: "货期延期天数",
                    key: "delayNum",
                    align: "center",
					sortable: 'custom',
                    width: 100
                },
                {
                    title: "计划开始挂片期",
                    key: "planningStartGuaPianDate",
                    align: "center",
					sortable: 'custom',
                    width: 120
                },
                {
                    title: "计划车印花完成期",
                    key: "planningEndCheYinHuaDate",
                    align: "center",
					sortable: 'custom',
                    width: 130
                },
                {
                    title: "计划裁剪完成期",
                    key: "planningEndCutDate",
                    align: "center",
					sortable: 'custom',
                    width: 120
                },
                {
                    title: "计划裁剪开始期",
                    key: "planningStartCutDate",
                    align: "center",
					sortable: 'custom',
                    width: 120
                },
                {
                    title: "计划批办日期",
                    key: "planningPiBanDate",
                    align: "center",
					sortable: 'custom',
                    width: 100
                },
                {
                    title: "计划布料入仓日期",
                    key: "planningBuLiaoRuCangDate",
                    align: "center",
					sortable: 'custom',
                    width: 130
                },
                {
                    title: "完成比率",
                    key: "doneRate",
                    align: "center",
                    width: 100
                },
                {
                    title: "完成状态",
                    key: "doneStatus",
                    align: "center",
            		filter: {
              			type: 'Input'
            		},
                    width: 100
                },
            ],
            isTableLoading: true, // 表格 Loading 状态
        }
    },
    computed: {
        msgOfCSS: function() {
            return {
                heightOfTable: this.windowHeight - CONST.cssData.pageHeaderHeight - CONST.cssData.containerPageTabHeight - 60, // 150 为表头的高度
                widthOfTable: window.innerWidth*0.95 - 4,
                widthOfWindow: window.innerWidth*0.95 + "px"
            }
        }
    },
    methods: {
        // 筛选数据
        filterData(searchObj) {
			// 获取筛选数据的属性名
			var titleList = Object.keys(searchObj)
			var resultListOfShow = [...this.resultListOfSource];
			titleList.forEach((item) => {
				var regExp = new RegExp(searchObj[item]);
				var resultListOfShowTemp = [];
				// 正则表达式，筛选数据
				resultListOfShow.forEach((item2) => {
					if (regExp.test(item2[item])) {
						resultListOfShowTemp.push(item2);
					}
				});
				resultListOfShow = resultListOfShowTemp;
			});
			this.resultListOfShow = resultListOfShow;
        },
        // 当货期延期天数为正数时，该列背景颜色为红色
        rowClassName (row, index) {
            if (row.delayNum > 0) {
                return 'red-row'
            }
            return '';
        },
        // 生产线获取工作人数
        getPeopleNumByDate(productLine, timeStamp) {
            var peopleNum = productLine.peopleNum;
            productLine.peopleNumOfLineList.forEach((item) => {
                if (item.startTime <= timeStamp && timeStamp <= item.endTime) {
                    peopleNum = item.peopleNum;
                }
            });
            return peopleNum;
        },
        // 生产线获取工作时长
        getWorkHoursByDate(productLine, timeStamp) {
            var workhours = productLine.workhours;
            productLine.workhoursOfLineList.forEach((item) => {
                if (item.startTime <= timeStamp && timeStamp <= item.endTime) {
                    workhours = item.workhours;
                }
            });
            return workhours;
        },
        // 计算计划离厂日期
        getPlanningDeliveryOfFactoryTime(progress) {
            var endTime = progress.endTime;
            var planningDeliveryOfFactoryTime = endTime + DateUtil.timeStampOfOneDay*progress.backpartDaynum;
            return DateUtil.timeStampToDate(planningDeliveryOfFactoryTime);
        },
        // 计算货期延期天数
        getDelayNum(progress, planningDeliveryOfFactoryTime) {
            var deliveryoffactoryTime = progress.deliveryoffactoryTime;
            return DateUtil.timeStampsToDayCount(DateUtil.strToTimeStamp(planningDeliveryOfFactoryTime), deliveryoffactoryTime);
        }
    },
    created: function() {
        var that = this;
        this.isTableLoading = true;
		this.axios.get(this.seieiURL + "/productionline/getResourceDataByUserId?time=" + DateUtil.firstTimeStampOfShow).then((response) => {
			if (response.data.status) {
				that.$Message.error(response.data.msg);
                that.isInvaildSession(response.data.status);
                that.isTableLoading = false;
            } else {
                // 获取自定义参数
                that.axios.get(that.seieiURL + "/argumentSetting/getAll").then((response2) => {
                    if (response2.data.status == 0) {
                        var checkMatchCutpartsDaynum = response2.data.data.checkMatchCutpartsDaynum;
                        var approveToStartcutDaynum = response2.data.data.approveToStartcutDaynum;
                        var beforeMaterialInstorageDaynum = response2.data.data.beforeMaterialInstorageDaynum;

                        var progductLineList = response.data.data;
				        /**
                         * 组装数据
                         */
                        var resultListOfSource = [];
                        var resultListOfShow = [];
                        // 循环生产线列表
                        for (var productLineIndex=0; productLineIndex<progductLineList.length; productLineIndex++) {
                            var productLine = progductLineList[productLineIndex]; // 生产线信息
                            var progressList = productLine.productionPlanningDetailList;
                            // 循环排产进度条
                            for (var progressIndex=0; progressIndex<progressList.length; progressIndex++) {
                                var progress = progressList[progressIndex]; // 排产进度条信息
                                var resultObj = {}; // 显示在表格的数据对象
                                resultObj.workgroup = productLine.workgroup;
                                resultObj.workshop = productLine.workshop;
                                resultObj.linecode = productLine.lineCode;
                                resultObj.orderno = progress.orderno;
                                resultObj.styleno = progress.styleno;
                                resultObj.season = progress.season;
                                resultObj.style = progress.style;
                                resultObj.goodname = progress.goodname;
                                resultObj.sam = progress.sam;
                                resultObj.sah = progress.sah;
                                resultObj.orderkind = progress.orderkind;
                                resultObj.ordernum = progress.ordernum;
                                resultObj.qtyofbatcheddelivery = progress.qtyofbatcheddelivery;
                                resultObj.qtyFinish = progress.qtyFinish;
                                resultObj.deliveryoffactoryTime = DateUtil.timeStampToDate(progress.deliveryoffactoryTime);
                                resultObj.startTime = DateUtil.timeStampToDate(progress.startTime);
                                resultObj.endTime = DateUtil.timeStampToDate(progress.endTime);
                                resultObj.backpartDaynum = progress.backpartDaynum;

                                // 计算工作人数、工作时间
                                resultObj.workhours = that.getWorkHoursByDate(productLine, progress.startTime);
                                resultObj.peoplenum = that.getPeopleNumByDate(productLine, progress.startTime);

                                var embroiderDaynum = progress.embroiderDaynum == null ? 0 : progress.embroiderDaynum;
                                var advancecuttingDaynum = progress.advancecuttingDaynum == null ? 0 : progress.advancecuttingDaynum;

                                // 计划离厂期， 货期延期天数
                                resultObj.planningDeliveryOfFactoryTime = that.getPlanningDeliveryOfFactoryTime(progress);
                                resultObj.delayNum = that.getDelayNum(progress, resultObj.planningDeliveryOfFactoryTime);

                                // 计划开始挂片期
                                var planningStartGuaPianTimeStamp = progress.startTime-2*DateUtil.timeStampOfOneDay;
                                resultObj.planningStartGuaPianDate = DateUtil.timeStampToDate(planningStartGuaPianTimeStamp);

                                // 计划车印花完成期
                                var planningEndCheYinHuaTimeStamp = planningStartGuaPianTimeStamp-checkMatchCutpartsDaynum*DateUtil.timeStampOfOneDay;
                                resultObj.planningEndCheYinHuaDate = DateUtil.timeStampToDate(planningEndCheYinHuaTimeStamp);

                                // 计划裁剪完成期
                                var planningEndCutTimeStamp = planningEndCheYinHuaTimeStamp - embroiderDaynum*DateUtil.timeStampOfOneDay;
                                resultObj.planningEndCutDate = DateUtil.timeStampToDate(planningEndCutTimeStamp);

                                // 计划裁剪开始期
                                var planningStartTimeStamp = planningEndCutTimeStamp - advancecuttingDaynum*DateUtil.timeStampOfOneDay;
                                resultObj.planningStartCutDate = DateUtil.timeStampToDate(planningStartTimeStamp);

                                // 计划批办日期
                                var planningPiBanTimeStamp = planningStartTimeStamp - approveToStartcutDaynum*DateUtil.timeStampOfOneDay;
                                resultObj.planningPiBanDate = DateUtil.timeStampToDate(planningPiBanTimeStamp);

                                // 计划布料入仓日期
                                var planningBuLiaoRuCangTimeStamp = planningPiBanTimeStamp - beforeMaterialInstorageDaynum*DateUtil.timeStampOfOneDay;
                                resultObj.planningBuLiaoRuCangDate = DateUtil.timeStampToDate(planningBuLiaoRuCangTimeStamp);

                                // 完成比率
                                resultObj.doneRate = StrUtil.decimalToPercent(progress.qtyFinish/progress.qtyofbatcheddelivery);

                                // 完成状态
                                if (progress.qtyFinish == 0) {
                                    resultObj.doneStatus = "未生产";
                                } else if (progress.qtyFinish < progress.qtyofbatcheddelivery) {
                                    resultObj.doneStatus = "生产中";
                                } else {
                                    resultObj.doneStatus = "已完成";
                                }

                                // 插入数据
                                resultListOfSource.push(resultObj);
                                resultListOfShow.push(resultObj);
                            }

				        }
                        // 赋值
                        that.resultListOfSource = resultListOfSource.sort(function(a, b){return DateUtil.strToTimeStamp(a.startTime) - DateUtil.strToTimeStamp(b.startTime)});
                        that.resultListOfShow = resultListOfShow.sort(function(a, b){return DateUtil.strToTimeStamp(a.startTime) - DateUtil.strToTimeStamp(b.startTime)});
                        that.isTableLoading = false;
                    } else {
                        that.$Message.error(response2.data.msg);
                        that.isInvaildSession(response2.data.status);
                        that.isTableLoading = false;
                    }
                }).catch((error2) => {
                    that.$Message.error({
                        content: "服务器异常,请刷新！！",
                        duration: 0,
                        closable: true
                    });
                    that.isTableLoading = false;
                    console.log(error2);
                });
			}
		}).catch((error) => {
            console.log(error);
            that.isTableLoading = false;
			that.$Message.error({
				content: "服务器异常,请刷新！！",
				duration: 0,
				closable: true
			});
		});
    },
    components: {
        'v-seieiTable': seieiTable
    }
}
</script>

<style>
.productionScheduleEnquiry-component .ivu-table {
    font-size: 12px;
}
.productionScheduleEnquiry-component .red-row td{
    background-color: pink;
}
.productionScheduleEnquiry-component .ivu-table-cell {
    padding: 0px 5px;
}
.productionScheduleEnquiry-component .contentWrapper {
    margin: auto;
}
</style>