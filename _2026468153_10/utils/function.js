function t(t) {
    var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    if (!t) return !1;
    "redirectTo" == n ? wx.redirectTo({
        url: t
    }) : wx.navigateTo({
        url: t,
        fail: function(n) {
            wx.switchTab({
                url: t
            });
        }
    });
}

var n = require("config.js");

module.exports = {
    linkTo: t,
    layer: function(t) {
        wx.showToast({
            title: t,
            icon: "none",
            duration: 1500
        });
    },
    getDataSet: function(t, n) {
        return t.currentTarget.dataset[n];
    },
    isLogin: function() {
        wx.getStorageSync("admin") || t("/pages/Admin/login/login");
    },
    getConfig: function(t, e) {
        wx.request({
            url: n.Config.restUrl + "Custom/getConfig",
            data: {
                fields: t
            },
            method: "post",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                e && e(t.data.data);
            }
        });
    },
    formatAudioProcess: function(t) {
        if ((t = parseInt(t)) > 60) {
            if (e = t % 60, (n = parseInt(t / 60)) < 10) var n = "0" + n;
            if (e < 10) var e = "0" + e;
            t = n + ":" + e;
        } else {
            t < 10 && (t = "0" + t);
            var t = "00:" + t;
        }
        return t;
    }
};