/**
 * Created by wangyong on 14-9-26.
 */

/**
 * jQuery validate 配置
 * @type {{contactEdit: {debug: boolean, errorClass: string, errorElement: string, rules: {name: {required: boolean, minlength: number}, nick: {minlength: number}, address: {maxlength: number}, explain: {maxlength: number}, mobile: {number: boolean, rangelength: number[]}}}}}
 */



;function render(name){
    $('#mn').html($.templates[name].render(tplData[name]));
}

;var routes = {
    '/index':{
        on:function(){
            $('#mn>div').hide();
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

