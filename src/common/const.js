export default class Const {
    
    constructor() {
    }

    // 用户信息枚举
    static get CONSTOFUSER() {
        return {
	        "IS_ONLINE": "isOnline",
            "CURRENT_USER_MSG": "currentUserMsg",
        }
    }

    // 用户级别
    static get RANKOFUSER() {
        return {
            "ISADMIN": 1
        }
    }

    // css 样式信息
    static get cssData() {
        return {
            pageHeaderHeight: 40, // 最顶部标题栏的高度
            containerPageTabHeight: 49, // 分页栏的高度
            topWrapperTitleHeight: 30, // 权限设置页面中左侧小栏目的标题高度
            topWrapperTitleMarginTop: 5, // 权限设置页面中左侧小栏目的margin-top
            rightBlockTabpaneWrapperPaddingBottom: 30, // 右侧小栏目底部的空隙高度
            borderHeight: 1
        }
    }

    // 筛选表格组件样式
    static get STYLEOFFILTERTABLE() {
        return {
            heightOfFilterTable: 88, // 筛选标题的高度
            heightOfRow: 48, // 行高
            widthOfScrollBar: 15// 滚动条高度
        }
    }

}