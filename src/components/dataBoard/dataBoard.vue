<template>
    <div class="dataBoard-component">
        <div v-show="!isLoading" class="contentWrapper">
            <div class="rowWrapper">
                <div class="itemWrapper">
                    <div class="title">
                        今日在线用户
                    </div>
                    <div class="content">
                        {{onLineNumber}}
                    </div>
                    <div class="unit">
                        个
                    </div>
                </div>
                <div class="itemWrapper">
                    <div class="title">
                        今日排单数量累计
                    </div>
                    <div class="content">
                        {{schedulingNumberOfToday}}
                    </div>
                    <div class="unit">
                        件
                    </div>
                </div>
                <div class="itemWrapper">
                    <div class="title">
                        未来一周交期订单数
                    </div>
                    <div class="content">
                        {{deliveryOrderNumberOfWeek}}
                    </div>
                    <div class="unit">
                        个
                    </div>
                </div>
            </div>
            <div class="rowWrapper">
                <div class="itemWrapper">
                    <div class="title">
                        今日车缝完成制单数
                    </div>
                    <div class="content">
                        {{completeSewingNumberOfToday}}
                    </div>
                    <div class="unit">
                        个
                    </div>
                </div>
                <div class="itemWrapper">
                    <div class="title">
                        交期异常订单数
                    </div>
                    <div class="content">
                        {{abnormalOrderNumber}}
                    </div>
                    <div class="unit">
                        个
                    </div>
                </div>
                <div class="itemWrapper">
                    <div class="title">
                        未来一个月空闲产能
                    </div>
                    <div class="content">
                        {{capacityOfNextMonth}}
                    </div>
                    <div class="unit">
                        小时
                    </div>
                </div>
            </div>
            <div class="rowWrapper">
                <div class="itemWrapper">
                    <div class="title">
                        未来三个月空闲产能
                    </div>
                    <div class="content">
                        {{capacityOfNextThreeMonth}}
                    </div>
                    <div class="unit">
                        小时
                    </div>
                </div>
                <div class="itemWrapper">
                    <div class="title">
                        未来六个月空闲产能
                    </div>
                    <div class="content">
                        {{capacityOfNextSixMonth}}
                    </div>
                    <div class="unit">
                        小时
                    </div>
                </div>
                <div class="itemWrapper emptyItemWrapper">
                </div>
            </div>
        </div>
        <div class="loadingWrapper">
            <Spin size="large" fix v-show="isLoading"></Spin>
        </div>
    </div>
</template>

<script>
import DateUtil from "../../common/DateUtil";

export default {
    data: function() {
        return {
            onLineNumber: 0,
            schedulingNumberOfToday: 0,
            deliveryOrderNumberOfWeek: 0,
            completeSewingNumberOfToday: 0,
            abnormalOrderNumber: 0,
            capacityOfNextMonth: 0,
            capacityOfNextThreeMonth: 0,
            capacityOfNextSixMonth: 0,
            isLoading: true,
        }
    },
    created: function() {
        var that = this;
        this.isLoading = true;
        this.axios.get(this.seieiURL + "/dataBoard/getAll?searchTime=" + DateUtil.getTimeStampOfToday).then((response) => {
            if (response.data.status) {
                that.$Message.error(response.data.msg);
                that.isInvaildSession(response.data.status);
                that.$Spin.hide();
                return;
            }
            that.onLineNumber = response.data.data.onLineNumber;
            that.schedulingNumberOfToday = response.data.data.schedulingNumberOfToday;
            that.deliveryOrderNumberOfWeek = response.data.data.deliveryOrderNumberOfWeek;
            that.completeSewingNumberOfToday = response.data.data.completeSewingNumberOfToday;
            that.abnormalOrderNumber = response.data.data.abnormalOrderNumber;
            that.capacityOfNextMonth = response.data.data.capacityOfNextMonth;
            that.capacityOfNextThreeMonth = response.data.data.capacityOfNextThreeMonth;
            that.capacityOfNextSixMonth = response.data.data.capacityOfNextSixMonth;
            that.isLoading = false;
        }).catch((error) => {
            that.$Message.error({
                content: "服务器异常,请刷新！！",
                duration: 0,
                closable: true
            });
            console.log(error);
            that.isLoading = false;
        });
    }
}
</script>

<style scoped>
.dataBoard-component .rowWrapper {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}
.dataBoard-component .rowWrapper .itemWrapper {
    box-sizing: border-box;
    padding: 20px;
    width: 33%;
    border-radius: 4px;
    text-align: center;
    background-color: #028458;
    color: #fff;
    height: 150px;
}
.dataBoard-component .rowWrapper .emptyItemWrapper {
    background-color: transparent;
}
.dataBoard-component .rowWrapper .itemWrapper .title {
    font-size: 30px;
    line-height: 1.5em;
}
.dataBoard-component .rowWrapper .itemWrapper .content {
    font-size: 30px;
    line-height: 1.5em;
}
.dataBoard-component .rowWrapper .itemWrapper .unit {
    font-size: 20px;
    line-height: 1.5em;
    text-align: right;
}
.dataBoard-component .loadingWrapper {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 300px;
}
</style>