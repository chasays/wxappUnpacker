var t = require("../../../utils/config.js"), i = require("../content-model.js"), n = require("../../../utils/function.js"), a = new i.Content();

Page({
    data: {
        url: t.Config.Url
    },
    onLoad: function() {
        this._loadData();
    },
    _loadData: function() {
        this.getNewsList();
    },
    getNewsList: function() {
        var t = this;
        a.getNewsList(!1, function(i) {
            t.setData({
                data: i.data
            });
        });
    },
    link: function(t) {
        var i = n.getDataSet(t, "surl");
        n.linkTo(i);
    }
});