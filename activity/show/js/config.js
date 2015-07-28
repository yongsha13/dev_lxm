/**
 * Created by wangyong on 14-9-26.
 */

/**
 * jQuery validate 配置
 * @type {{contactEdit: {debug: boolean, errorClass: string, errorElement: string, rules: {name: {required: boolean, minlength: number}, nick: {minlength: number}, address: {maxlength: number}, explain: {maxlength: number}, mobile: {number: boolean, rangelength: number[]}}}}}
 */

//微信配置
if(window['wx']){
    wx.config({
        debug: false,
        appId: params['appId'],
        timestamp: params['timestamp'],
        nonceStr: params['nonceStr'],
        signature: params['signature'],
        jsApiList: ['chooseImage', 'uploadImage','onMenuShareTimeline', 'onMenuShareAppMessage','hideMenuItems'] // 功能列表，我们要使用JS-SDK的什么功能
    });
    wx.error(function (res) {
        //alert("error: "+ res.errMsg);
    });
}

function wxReady(){
    wx.ready(function () {

        wx.checkJsApi({
            jsApiList: [
                'chooseImage', 'uploadImage','onMenuShareTimeline', 'onMenuShareAppMessage','hideMenuItems'
            ]
        });

        var shareData = {
            title: '翻牌就有礼，流行美2015夏季新品上市送礼来了！',
            desc: '翻牌就有礼，一大波精美发饰、化妆品等您哦！',
            link: 'http://www.wxbinf.com/newPrd/index.jsp?fromOpenid='+params['openid'],
            imgUrl: 'http://www.wxbinf.com/newPrd/images/newPrd_logo.jpg'
        };
        //wx.onMenuShareAppMessage(shareData);
        wx.onMenuShareAppMessage({
            title: '翻牌就有礼，流行美2015夏季新品上市送礼来了！',
            desc: '翻牌就有礼，一大波精美发饰、化妆品等您哦！',
            link: 'http://www.wxbinf.com/newPrd/index.jsp?fromOpenid='+params['openid'],
            imgUrl: 'http://www.wxbinf.com/newPrd/images/newPrd_logo.jpg',
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                //alert('用户点击发送给朋友');
            },
            success: function (res) {
                //alert('已分享');
            },
            cancel: function (res) {
                //alert('已取消');
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });
        wx.onMenuShareTimeline(shareData);
        // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        wx.hideMenuItems({
            menuList: [
                'menuItem:copyUrl',
                'menuItem:openWithQQBrowser',
                'menuItem:openWithSafari',
                'menuItem:share:qq',
                'menuItem:share:email',
                'menuItem:originPage'
            ]
        });
        //hide
        //wx.hideAllNonBaseMenuItem();
        //wx.hideOptionMenu();
    });
}

;function render(name){
    $('#mn').html($.templates[name].render(tplData[name]));
}

;var routes = {
    '/index':{
        on:function(){
            $('#mn>div').hide();
            window['wx'] && wxReady();
            window.scrollTo(0,0);
            console.log('/index');
        },
        '/start':function(){
            render('start');
        },
        '/game':function(){
            //alert(tplData.game.prizeNum);
            if(tplData.game.prizeRemoteNum<0)
                render('game');
            else
                location.hash = '#/index/prize/'+tplData.game.prizeRemoteNum;
            game.start();
        },
        '/prize/:id':function(id){
            var name = 'gamePrize';
            if(id==0) name='gamePrizeNone';
            $('#mn').html($.templates[name].render(tplData['gamePrize']['prizes'][id]));
        },
        '/address':function(){
            render('gameAddress');
        },
        '/address/success':function(){
            render('gameAddressSuccess');
        },
        '/rule':function(){
            render('rule');
        },
        '/menu':function(){
            render('menu');
        },
        '/prod-cat':function(){
            render('prodCate');
        },
        '/prod-list':function(){
            render('prodList');
        },
        '/top-list/:id':function(id){
            tplData.topList.isLoading = true;
            tplData.topList.areaId = id?id:0;
            render('topList');
            ajax('photoService.do',{
                opType:'getPhotoList',
                activityId:'newPRD201507',
                areaId:tplData.topList.areaId,
                fromOpenid:params['openId'],
                startNum:tplData.topList.lastId,
                batchNum:10
            },function(req){
                tplData.topList.isLoading = false;
                console.log(req);
                if(req['batchNum']<10) tplData.topList.isListEnd = true;
                tplData.topList.lastId += 10;
                for(var i=0;i<req['photoData'].length;i++)
                tplData.topList.list.push({
                    url:'javascript:;',
                    src:req['photoData'][i]['smallPhotoUrl'],
                    bigSrc:req['photoData'][i]['bigPhotoUrl'],
                    praise:req['photoData'][i]['praiseNum'],
                    sort:req['photoData'][i]['sortNum'],
                    openId:req['photoData'][i]['userId']
                });
                console.log('页面');
                render('topList');
            });
        },
        '/homepage':function(){
            render('homepage');
        },
        '/discount':function(){
            render('discount');
        },
        '/show':function(){
            render('show');
        },
        '/preview':function(){
            render('preview');
        },
        '/show/address':function(){
            render('showAddress');
        }
    },
    '/step':{
        on:function(){
            $('#mn>div').hide();
            window.scrollTo(0,0);
            console.log('/index');
        },
        '/0':function(){},
        '/1':function(){},
        '/2':function(){},
        '/3':function(){}
    }
};

