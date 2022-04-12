/* 参数设置 */
<template>
    <div class="argumentSetting-component" ref="rightBlockTabpaneWrapper">
        <div class="aboutMinusAndChangeEfficiency" style="padding-left: 30px;">
            <Divider class="headerDivider">减 数 及 修 改 效 率 设 置</Divider>
            <div class="item">
                <div class="title">
                    减数后自动顺延：
                </div>
                <div class="content">
                    <i-switch v-model="afterMinusHasamend">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    减数及修改效率后自动消除时间空隙：
                </div>
                <div class="content">
                    <i-switch v-model="afterMinusorchangeefficiencyHasremovegapmodel">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    计算排产推算开始期的生产线人数：
                </div>
                <div class="content">
                    <InputNumber style="width: 55px;" :step="1" :min="0" v-model="inputPeopleNum"></InputNumber>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    计算排产推算开始期的每天工作时长：
                </div>
                <div class="content">
                    <InputNumber style="width: 55px;" :step="0.1" :min="0" v-model="inputWorkHours"></InputNumber>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    查片配片天数:
                </div>
                <div class="content">
                    <InputNumber style="width: 55px;" :step="1" :min="0" v-model="inputCheckMatchCutpartsDaynum"></InputNumber>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    批办至开裁天数:
                </div>
                <div class="content">
                    <InputNumber style="width: 55px;" :step="1" :min="0" v-model="inputApproveToStartcutDaynum"></InputNumber>
                </div>
            </div>
            <div class="item">
                <div class="title">
                    布料入仓前置天数:
                </div>
                <div class="content">
                    <InputNumber style="width: 55px;" :step="1" :min="0" v-model="inputBeforeMaterialInstorageDaynum"></InputNumber>
                </div>
            </div>
        </div>
        <div class="btnWrapper">
          <Button type="success" style="width: 200px;" size="large" @click="submit" :loading="isSubmitloading">
            保 存 设 置
          </Button>
        </div>
    </div>
</template>

<script>
import CONST from "../../common/const";

export default {
    data: function() {
        return {
            inputId: null, // 参数设置主键
            afterMinusorchangeefficiencyHasremovegapmodel: false, // 减数，修改效率之后是否自动消除时间空隙
            afterMinusHasamend: false, // 减数后是否后续计划进行调整
            isSubmitloading: false, // 提交 loading
            inputPeopleNum: 0, // 计算排产推算开始期的生产线人数
            inputWorkHours: 0, // 计算排产推算开始期的每天工作时长
            inputCheckMatchCutpartsDaynum: 0, // 查片配片天数
            inputApproveToStartcutDaynum: 0, // 批办至开裁天数
            inputBeforeMaterialInstorageDaynum: 0, // 布料入仓前置天数
        }
    },
    methods: {
        // 重载数据
        reload: function() {
            var that = this;
            this.axios.get(this.seieiURL + "/argumentSetting/getAll").then((response) => {
                if (response.data.status == 0) {
                    that.afterMinusorchangeefficiencyHasremovegapmodel = response.data.data.afterMinusorchangeefficiencyHasremovegapmodel;
                    that.afterMinusHasamend = response.data.data.afterMinusHasamend;
                    that.inputId = response.data.data.id;
                    that.inputPeopleNum = response.data.data.peopleNum;
                    that.inputWorkHours = response.data.data.workhours;
                    that.inputCheckMatchCutpartsDaynum = response.data.data.checkMatchCutpartsDaynum;
                    that.inputApproveToStartcutDaynum = response.data.data.approveToStartcutDaynum;
                    that.inputBeforeMaterialInstorageDaynum = response.data.data.beforeMaterialInstorageDaynum;
                } else {
                    that.$Message.error(response.data.msg);
                    that.isInvaildSession(response.data.status);
                }
            }).catch((error) => {
                that.$Message.error({
                    content: "服务器异常,请刷新！！",
                    duration: 0,
                    closable: true
                });
                console.log(error)
            });
        },
        // 提交数据
        submit: function() {
            var that = this;
            this.isSubmitloading = true;
            var obj = {};
            obj.id = this.inputId;
            obj.afterMinusorchangeefficiencyHasremovegapmodel = this.afterMinusorchangeefficiencyHasremovegapmodel;
            obj.afterMinusHasamend = this.afterMinusHasamend;
            obj.peopleNum = this.inputPeopleNum;
            obj.workhours = this.inputWorkHours;
            obj.checkMatchCutpartsDaynum = this.inputCheckMatchCutpartsDaynum;
            obj.approveToStartcutDaynum = this.inputApproveToStartcutDaynum;
            obj.beforeMaterialInstorageDaynum = this.inputBeforeMaterialInstorageDaynum;
            this.axios.post(this.seieiURL + "/argumentSetting/update", obj).then((response) => {
                if (response.data.status == 0) {
                    that.$Message.success({
                        content: response.data.msg
                    })
                    that.reload();
                } else {
                    that.$Message.error(response.data.msg);
                    that.isInvaildSession(response.data.status);
                }
                that.isSubmitloading = false;
            }).catch((error) => {
                that.$Message.error({
                    content: "服务器异常,请刷新！！",
                    duration: 0,
                    closable: true
                });
                console.log(error)
            });
        }
    },
    created: function() {
        // 页面初始化设置高度
        this.$nextTick(() => {
            this.$refs["rightBlockTabpaneWrapper"].style.height = this.windowHeight - CONST.cssData.pageHeaderHeight - CONST.cssData.containerPageTabHeight - CONST.cssData.rightBlockTabpaneWrapperPaddingBottom + "px";
        });
        this.reload();
    }
}
</script>

<style scoped>
.argumentSetting-component .item {
    line-height: 50px;
}
.argumentSetting-component .item .title {
    display: inline-block;
    width: 250px;
    vertical-align: top;
}
.argumentSetting-component .item .content {
    display: inline-block;
    margin-left: 10px;
    vertical-align: top;
}
.btnWrapper {
    margin-top: 30px;
    text-align: center;
}
</style>