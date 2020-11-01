var a = require("../../utils/config.js"), e = require("../custom-model.js"), t = require("../Members/members-model.js"), d = require("../../utils/function.js"), o = new e.Custom(), n = new t.Members();

Page({
    data: {
        url: a.Config.Url,
        buy_num: 1,
        week_num: 1,
        comfirm: !1,
        messages: "",
        week: {},
        calendar: !1,
        year: 0,
        month: 0,
        date: [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ],
        dateArr: [],
        isToday: 0,
        isTodayWeek: !1,
        todayIndex: 0
    },
    onLoad: function(a) {
        var e = this;
        e.setData(a);
        var t = new Date(), d = t.getFullYear(), o = t.getMonth() + 1;
        e.dateInit(), e.setData({
            year: d,
            month: o,
            isToday: "" + d + o + t.getDate()
        }), e._loadData();
    },
    _loadData: function() {
        var a = this;
        a.getGoodsDetails(), a.getConfig();
    },
    onShow: function() {
        this.getCheckeAddress();
    },
    getConfig: function() {
        var a = this;
        d.getConfig("discount", function(e) {
            a.setData({
                discount: e.discount
            });
        });
    },
    upWeek: function(a) {
        var e = this, t = d.getDataSet(a, "type"), o = parseInt(e.data.week_num);
        if (1 == t) o++; else {
            if (o <= 1) return !1;
            o--;
        }
        e.setData({
            week_num: o
        }), e.weekChange();
    },
    weekChange: function() {
        var a = this, e = {
            week: a.data.week_num
        };
        o.weekChange(e, function(e) {
            a.setData({
                week: e
            }), a.getPayMoney();
        });
    },
    comfirmChange: function() {
        var a = this, e = a.data.pay;
        a.data.comfirm ? (e.code = 201, e.msg = "请确认订单信息") : e.code = 200, a.setData({
            comfirm: !a.data.comfirm,
            pay: e
        });
    },
    getCheckeAddress: function() {
        var a = this, e = a.data.address_guid, t = !1, t = {
            members_guid: wx.getStorageSync("members").guid
        };
        e && (t.address_guid = e), n.getCheckedAddress(t, function(e) {
            a.setData({
                address: e.data
            });
        });
    },
    getMembersCoupon: function() {
        var a = this, e = {
            members_guid: wx.getStorageSync("members").guid,
            status: 0
        };
        n.getUseCoupon(e, function(e) {
            e.data.length > 0 && a.setData({
                coupon: e.data,
                coupon_checked: e.data[0]
            }), a.getPayMoney();
        });
    },
    getGoodsDetails: function() {
        var a = this, e = {
            goods_guid: a.data.goods_guid
        };
        o.getGoodsDetails(e, function(e) {
            a.weekChange(), a.setData({
                goods: e.data
            }), e.data.old_price > 0 && a.getMembersCoupon();
        });
    },
    upNum: function(a) {
        var e = this, t = d.getDataSet(a, "type"), o = parseInt(e.data.buy_num), n = parseInt(e.data.goods.max_num);
        if (1 == t) {
            if (o >= n) return d.layer("最多可预订" + n + "份"), !1;
            o++;
        } else {
            if (o <= 1) return !1;
            o--;
        }
        e.setData({
            buy_num: o
        }), e.getPayMoney();
    },
    couponeChange: function(a) {
        var e = this, t = a.detail.value;
        if (e.data.coupon[t].guid == e.data.coupon_checked.guid) return !1;
        var d = e.data.coupon[t];
        e.setData({
            coupon_checked: d
        }), e.getPayMoney();
    },
    getPayMoney: function() {
        var a = this, e = a.data.week, t = a.data.coupon_checked, d = s = a.data.goods.old_price * a.data.buy_num, o = 200, n = "正常支付";
        if (200 == e.code) var s = s * a.data.week_num, d = d * a.data.week_num;
        i = (s - (d = s * a.data.discount)).toFixed(2);
        if (t) var i = (s - (d = s * t.discount)).toFixed(2);
        if (a.data.address <= 0) var o = 201, n = "请先添加送餐地址";
        if (201 == e.code) var o = 201, n = e.data.msg;
        if (!a.data.comfirm) var o = 201, n = "请确认订单信息";
        a.setData({
            pay: {
                discount: a.data.discount,
                jian_money: i,
                paymoney: d.toFixed(2),
                code: o,
                msg: n
            }
        });
    },
    messages: function(a) {
        var e = a.detail.value;
        this.setData({
            messages: e
        });
    },
    link: function(a) {
        var e = d.getDataSet(a, "surl");
        d.linkTo(e);
    },
    layerDate: function() {
        this.setData({
            calendar: !0
        });
    },
    dateInit: function(a, e) {
        var t = this, d = [], o = 0, n = a ? new Date(a, e) : new Date(), s = a || n.getFullYear(), i = 0, r = e || n.getMonth(), u = r + 1 > 11 ? 1 : r + 1, c = new Date(s + "/" + (r + 1) + "/1").getDay(), g = new Date(s, u, 0).getDate(), m = {}, h = 0;
        r + 1 > 11 && (i = s + 1, g = new Date(i, u, 0).getDate()), o = c + g;
        for (var f = 0; f < o; f++) m = f >= c ? {
            isToday: "" + s + (r + 1) + (h = f - c + 1),
            dateNum: h,
            weight: 5
        } : {}, d[f] = m;
        t.setData({
            dateArr: d
        });
        var y = new Date(), l = y.getFullYear(), w = y.getMonth() + 1, _ = y.getDay(), D = a || l, k = e >= 0 ? e + 1 : w;
        l == D && w == k ? t.setData({
            isTodayWeek: !0,
            todayIndex: _
        }) : t.setData({
            isTodayWeek: !1,
            todayIndex: -1
        });
    },
    lastMonth: function() {
        var a = this, e = a.data.month - 2 < 0 ? a.data.year - 1 : a.data.year, t = a.data.month - 2 < 0 ? 11 : a.data.month - 2;
        a.setData({
            year: e,
            month: t + 1
        }), a.dateInit(e, t);
    },
    nextMonth: function() {
        var a = this, e = a.data.month > 11 ? a.data.year + 1 : a.data.year, t = a.data.month > 11 ? 0 : a.data.month;
        a.setData({
            year: e,
            month: t + 1
        }), a.dateInit(e, t);
    },
    closeCalendar: function() {
        this.setData({
            calendar: !1
        });
    },
    payHandel: function(a) {
        var e = this;
        if (e.data.address) if (e.data.comfirm) {
            var t = {
                start_date: e.data.week.data.start_date.y + "-" + e.data.week.data.start_date.m + "-" + e.data.week.data.start_date.d,
                end_date: e.data.week.data.end_date.y + "-" + e.data.week.data.end_date.m + "-" + e.data.week.data.end_date.d
            }, n = {
                ordercode: e.data.goods.ordercode,
                members_guid: wx.getStorageSync("members").guid,
                address_guid: e.data.address.guid,
                goods_guid: e.data.goods.guid,
                messages: e.data.messages,
                buy_num: e.data.buy_num,
                week: t
            };
            e.data.coupon_checked && (n.coupon_guid = e.data.coupon_checked.guid), wx.showLoading({
                title: "付款中...",
                mask: !0
            }), o.addOrder(n, function(a) {
                if (wx.hideLoading(), 200 == a.code) e.data.goods.old_price > 0 ? e.wxPay(a.ordercode) : (wx.showToast({
                    title: "提交成功",
                    duration: 2e3
                }), setTimeout(function() {
                    d.linkTo("/pages/share/share");
                }, 1500)); else {
                    if (202 == a.code) return !1;
                    wx.showToast({
                        title: a.msg,
                        icon: "none",
                        duration: 5e3
                    });
                }
            });
        } else d.layer("请先确认订单信息"); else d.layer("请添加收货地址");
    },
    wxPay: function(a) {
        n.wxPay(a, function(a) {
            200 == a.code ? (wx.showToast({
                title: "支付成功",
                duration: 2e3
            }), setTimeout(function() {
                d.linkTo("/pages/share/share");
            }, 1500)) : d.linkTo("/pages/Members/order/order?status=10");
        });
    }
});