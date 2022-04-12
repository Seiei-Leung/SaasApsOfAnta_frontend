<template>
    <div class="seieiTable-component">
        <Table
            border
            :height="heightOfRealTable"
            :width="widthOfRealTable"
            :data="dataListOfShow"
            :columns="columns"
            :loading="loading"
            @on-row-dblclick="dblclickTable"
            @on-selection-change="handleSelectRow"
            @on-sort-change="sortData"
            :row-class-name="rowClassName"
        ></Table>
        <div style="margin: 10px 0;text-align: center;" v-if="isPaging">
            <Page
                :total="dataListOfFilter.length"
                :page-size="pageSize"
                show-elevator
                show-total
                :current="currentPageIndex"
                @on-change="changePage" />
        </div>
    </div>
</template>

<script>
import DateUtil from "../../common/DateUtil";

export default {
    name: "seieiTable",
    props: {
        columns: Array, //列描述数据对象
        dataOfSource: {
			type: Array,
            default: function() {
                return [];
            }
		}, //表格源数据
        heightOfRealTable: Number, // 详细内容表格高度
        widthOfRealTable: Number, // 表格宽度
        loading: Boolean, // 表格loading 状态
        isPaging: {
            type: Boolean,
            default: false
        }, // 是否分页
        pageSize: {
			type: Number,
			default: 10
		}, // 一页显示多少行
        rowClassName: {
            Function, // 用于表格中列的样式
            defalut: function(row, index) {
                return '';
            },
        }
    },
    data: function() {
        return {
            dataListOfFilter: [], // 筛选过的表格数据
            dataListOfShow: [], // 用于显示的表格数据
            searchObj: {}, // 过滤条件保存的对象，键名 为表的列字段名，值 为筛选的数值
            currentPageIndex: 1, // 当前页码
        }
    },
    methods: {
        // 排序
        sortData: function(params) {
            if (this.dataListOfFilter.length == 0) {
                return;
            }
            var firstRow = this.dataListOfFilter[0];
            var key = params.key;
            var order = params.order;
            var cellItemOfFirstRow = firstRow[key];
            // 点击升序
            if (order == "asc") {
                // 检查是否为数字类型
                if (!isNaN(cellItemOfFirstRow)) {
                    console.log(this.dataListOfFilter);
                    this.dataListOfFilter = this.dataListOfFilter.sort(function(a, b) {return a[key] - b[key]});
                    console.log(this.dataListOfFilter);
                }
                // 检查是否为日期类型
                else if (DateUtil.isDateStr(cellItemOfFirstRow)) {
                    this.dataListOfFilter = this.dataListOfFilter.sort(function(a, b) {return DateUtil.strToTimeStamp(a[key]) - DateUtil.strToTimeStamp(b[key])});
                }
            } 
            // 降序
            else {
                // 检查是否为数字类型
                if (!isNaN(cellItemOfFirstRow)) {
                    this.dataListOfFilter = this.dataListOfFilter.sort(function(a, b) {return b[key] - a[key]});
                }
                // 检查是否为日期类型
                else if (DateUtil.isDateStr(cellItemOfFirstRow)) {
                    this.dataListOfFilter = this.dataListOfFilter.sort(function(a, b) {return DateUtil.strToTimeStamp(b[key]) - DateUtil.strToTimeStamp(a[key])});
                }
            }
            this.reloadDataListOfShow();
        },
        // 点击页码
        changePage: function(pageIndex) {
            this.currentPageIndex = pageIndex;
            this.reloadDataListOfShow();
        },
        // 重载显示表格数据
        reloadDataListOfShow: function() {
            if (this.isPaging) {
                var startIndex = (this.currentPageIndex-1)*this.pageSize;
                var endIndex = startIndex + this.pageSize;
                this.dataListOfShow = [...this.dataListOfFilter].slice(startIndex, endIndex);
            } else {
                this.dataListOfShow = [...this.dataListOfFilter];
            }
        },
        // 自定义表头
        renderHeader: function(h, params) {
            var column = params.column;
            return h('div', [
                h('div', column.title),
                h('input', {
                    attrs: {
                        placeholder: "筛选",
                    },
                    style: {
                        marginTop: "10px",
                        display: "inlineBlock",
                        width: "100%",
                        height: "32px",
                        lineHeight: "1.5",
                        padding: "4px 7px",
                        fontSize: "14px",
                        color: "#515a6e",
                        backgroundColor: "#fff",
                        position: "relative",
                        cursor: "text",
                        border: "none",
                        outline: "none",
                        
                    },
                    // 筛选逻辑
                    on: {
                        input: val => {
                            var filterTxt = val.target.value == null ? "" : val.target.value;
                            this.searchObj[column.key] = filterTxt.trim();
                            this.filterHandler();
                        }
                    }
                })
            ]);
        },
        // 筛选逻辑
        filterHandler: function() {
			// 获取筛选数据的属性名
            var dataListOfFilter = this.dataOfSource;
            var searchObj = this.searchObj;
			var titleList = Object.keys(this.searchObj);
            titleList.forEach((title) => {
                if (searchObj[title] != "") {
                    var regExp = new RegExp(searchObj[title]);
                    var dataListTemp = [];
                    dataListOfFilter.forEach((dataItem) => {
					    if (regExp.test(dataItem[title])) {
                            dataListTemp.push(dataItem);
					    }
                    });
                    dataListOfFilter = dataListTemp;
                }
            });
            this.dataListOfFilter = dataListOfFilter;
            this.currentPageIndex = 1;
            this.reloadDataListOfShow();
        },
        // 双击表格，激活父组件绑定事件
        dblclickTable(data, index) {
            var obj = {};
            obj.data = data;
            obj.index = index;
            // 提交，激活父组件事件
            this.$emit("on-row-dblclick", obj);
        },
        // 选择表格事件
        handleSelectRow:function(selection) {
            // 提交，激活父组件事件
            this.$emit("on-selection-change", selection);
        }
    },
    watch: {
        dataOfSource(val) {
            this.dataListOfFilter = [...val];
            this.reloadDataListOfShow();
        }
    },
    created: function() {
        // 绑定表头部的 render
        this.columns.forEach((columnsItem) => {
            if (columnsItem.filter != null && columnsItem.filter.type != null) {
                if (columnsItem.filter.type == "Input") {
                    columnsItem.renderHeader = this.renderHeader;
                }
            }
        });
        this.dataListOfFilter = [...this.dataOfSource];
        this.reloadDataListOfShow();
    }
}
</script>

<style scoped>
</style>