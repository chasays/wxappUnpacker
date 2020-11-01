App({
    onLaunch: function() {
        var t = wx.getLaunchOptionsSync().query;
        t.top_guid && wx.setStorage({
            key: "top_guid",
            data: t.top_guid
        });
    }
});