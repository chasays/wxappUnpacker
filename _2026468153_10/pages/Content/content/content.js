var t = require("../../../utils/config.js"), e = require("../content-model.js"), n = (require("../../../utils/function.js"), 
new e.Content());

Page({
    data: {
        url: t.Config.Url
    },
    onLoad: function(t) {
        this._loadData(t.type);
    },
    _loadData: function(t) {
        this.getContent(t);
    },
    getContent: function(t) {
        var e = this, a = {
            type: t
        };
        n.getContent(a, function(t) {
            e.setData({
                data: t.data
            }), wx.setNavigationBarTitle({
                title: t.data.title
            });
        });
    }
});