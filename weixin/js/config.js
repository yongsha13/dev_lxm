/**
 * Created by wangyong on 14-9-26.
 */

/**
 * jQuery validate 配置
 * @type {{contactEdit: {debug: boolean, errorClass: string, errorElement: string, rules: {name: {required: boolean, minlength: number}, nick: {minlength: number}, address: {maxlength: number}, explain: {maxlength: number}, mobile: {number: boolean, rangelength: number[]}}}}}
 */
;var routes = {
    '/index':{
        on:function(){
            $('#mn>div').hide();
            window.scrollTo(0,0);
            console.log('/index');
        },
        '/start':function(){
            $('#start').show();
        },
        '/start/:type':function(type){
            console.log('/start');
            $('.js-ticket').hide();
            $('#start .ticket').hide();
            $('#start .js-ticket').hide();
            $('.js-ticket:eq('+params['award_a']+')').show();
            $('.js-luck-cnt').hide();
            if(params['leftLuckyDraw']==0)$('.js-luck-cnt:eq(0)').show();
            else $('.js-luck-cnt:eq(1)').show()
            $('.js-luck-num').html(params['leftLuckyDraw']);
            if(type=='lib')$('#start .ticket:eq(0)').show();
        },
        '/detail':function(){
            console.log('/detail');
            $('#detail').show()
        },
        '/game':function(){
            if(params['award_b']==1) location.hash = '/index/start/lib';
            else{
                $('#game').show();
                $('#game section.win').hide();
                puzz.init();
            }

        },
        '/nowin':function(){
            $('#nowin').show();
        },
        '/gift':function(){
            $('#gift').show();
        },
        '/none':function(){},
        '/sign':function(){
            $('#sign').show();
        },
        '/close':function(){
            $('#close').show();
            setTimeout(function(){location.hash='/index/open'},1000);
        },
        '/open':function(){
            $('#open').show();
            ajax({opType:'getMyLucky'},function(req){
                if(req['isLucky']) location.hash='/index/gift';
                else location.hash='/index/nowin';
            })
        },
        '/rule':function(){
            $('#rule').show();
        },
        '/error':function(){
            $('#error').show()
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
