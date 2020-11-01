var e = require("../../../utils/config.js"), t = require("../members-model.js"), a = require("../../../utils/function.js"), s = new t.Members();

Page({
    data: {
        url: e.Config.Url,
        msg_layer: !1,
        see_layer: !1
    },
    onLoad: function(e) {
        this.setData(e);
    },
    onShow: function() {
        this._loadData();
    },
    _loadData: function() {
        this.getOrderDetails();
    },
    getOrderDetails: function() {
        var e = this, t = {
            ordercode: e.data.ordercode
        };
        s.getOrderDetails(t, function(t) {
            e.setData({
                data: t.data,
                messages: t.data.messages
            });
        });
    },
    payOrder: function(e) {
        var t = this, r = a.getDataSet(e, "ordercode");
        s.wxPay(r, function(e) {
            200 == e.code ? (wx.showToast({
                title: "支付成功",
                duration: 2e3
            }), setTimeout(function() {
                t.getOrderDetails();
            }, 1e3)) : a.layer(e.msg);
        });
    },
    upStatus: function(e) {
        var t = this, r = a.getDataSet(e, "status"), o = {
            ordercode: a.getDataSet(e, "ordercode"),
            status: r
        };
        s.upOrderStatus(o, function(e) {
            200 == e.code ? t.getOrderDetails() : a.layer(e.msg);
        });
    },
    getValue: function(e) {
        var t = this, a = e.detail.value;
        t.setData({
            messages: a
        });
    },
    cancel: function() {
        this.setData({
            msg_layer: !1
        });
    },
    editMessages: function() {
        this.setData({
            msg_layer: !0
        });
    },
    editMessagesHandel: function() {
        var e = this, t = e.data.messages;
        if (t == e.data.data.messages) return e.cancel(), !1;
        wx.showLoading({
            title: "加载中...",
            mask: !0
        });
        var a = {
            members_guid: wx.getStorageSync("members").guid,
            ordercode: e.data.ordercode,
            messages: t
        };
        s.editMessagesHandel(a, function(t) {
            wx.hideLoading(), (t.code = 200) && (e.cancel(), e.getOrderDetails(), wx.showToast({
                title: "修改成功",
                duration: 1500
            }));
        });
    },
    delorder: function(e) {
        var t = this, r = {
            ordercode: a.getDataSet(e, "ordercode")
        };
        wx.showModal({
            title: "温馨提示",
            content: "您确定要删除吗？",
            success: function(e) {
                e.confirm && s.delOrder(r, function(e) {
                    200 == e.code ? t.orderdetails(t.data.ordercode) : a.layer(e.msg);
                });
            }
        });
    },
    searchMsg: function() {
        this.setData({
            see_layer: !0
        });
    },
    seeClose: function() {
        this.setData({
            see_layer: !1
        });
    }
});