// to suppress the warning: javascript:; not allowed in <a href>
Blaze._allowJavascriptUrls();

//momentjs设置成中文
moment.locale('cn', {
    months : "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
    monthsShort : "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
    weekdays : "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
    weekdaysShort : "周日_周一_周二_周三_周四_周五_周六".split("_"),
    weekdaysMin : "日_一_二_三_四_五_六".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: "[今天] LT",
        nextDay: '[明天] LT',
        nextWeek: 'dddd [下周] LT',
        lastDay: '[昨天] LT',
        lastWeek: 'dddd [上周] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "%s后",
        past : "%s前",
        s : "%d秒",
        m : "%d分钟",
        mm : "%d分钟",
        h : "%d小时",
        hh : "%d小时",
        d : "%d天",
        dd : "%d天",
        M : "%d月",
        MM : "%d月",
        y : "%d年",
        yy : "%d年"
    },
    ordinal : function (number) {
        return number;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});