// 时间工具
export default class DateUtil {
    constructor() {
    }

    // 一天的总时间戳
    static get timeStampOfOneDay() {
        return 24*60*60*1000;
    }

    // 月份或日期补零
    static zeroFillOfMonthOrDay(str) {
        return (str + "").length == 2 ? str : "0" + str; 
    }

    // 获取某年某月的总天数
    static getDayCountOfMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }
    
    // 日期转时间戳
    // 形如 "2019-11-18"
    static strToTimeStamp(dateStr) {
        var dateStrList = dateStr.split("-");
        var year = dateStrList[0];
        var month = DateUtil.zeroFillOfMonthOrDay(dateStrList[1]);
        var day = DateUtil.zeroFillOfMonthOrDay(dateStrList[2]);
        return new Date(year + "/" + month + "/" + day + " 00:00:00").getTime();
    }

    // 时间戳转日期
    // 输出结果，格式形如 "2019-11-18"
    static timeStampToDate(timeStamp) {
        var time = new Date(timeStamp);
        return (time.getFullYear() + "-" + DateUtil.zeroFillOfMonthOrDay(time.getMonth() + 1) + "-" + DateUtil.zeroFillOfMonthOrDay(time.getDate()));
    }

    /**
     * 获取今天0时0点0秒的时间戳
     */
     static get getTimeStampOfToday() {
        var now = new Date().getTime();
        return DateUtil.strToTimeStamp(DateUtil.timeStampToDate(now));
    }

    // 显示的第一天时间戳
    static get firstTimeStampOfShow() {
        var now = DateUtil.getTimeStampOfToday;
        var fifteenDayAgo = now - 15 * DateUtil.timeStampOfOneDay; // 15 天之前的时间戳
        return fifteenDayAgo;
    }

    /**
     * 计算时间戳的差值，并转化为天数
     * @param {*} sTimeStamp 开始时间
     * @param {*} eTimeStamp 结束时间
     * @returns 
     */
    static timeStampsToDayCount(sTimeStamp, eTimeStamp) {
        var timeStamp = sTimeStamp - eTimeStamp;
        return Math.ceil(timeStamp / DateUtil.timeStampOfOneDay)
    }

    /**
     * 检查是否为标准的日期字符串，如 "2022-03-04"
     * @param {*} dataStr 
     */
    static isDateStr(dataStr) {
        var regExp = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
        return regExp.test(dataStr);
    }
}