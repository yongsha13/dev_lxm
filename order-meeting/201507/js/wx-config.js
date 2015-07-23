/**
 * Created by wangyong on 2015/7/20.
 */
var cfg = params.wxArgs;
cfg['debug'] = true;
cfg['jsApiList'] = ['chooseImage','previewImage','uploadImage'];
alert(JSON.stringify(cfg));
wx.config(cfg);