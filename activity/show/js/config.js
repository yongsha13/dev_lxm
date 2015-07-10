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
            render('game');
        },
        '/rule':function(){
            render('rule');
        },
        '/prod-cat':function(){
            render('prodCate');
        },
        '/prod-list':function(){
            render('prodList');
        },
        '/homepage':function(){
            render('homepage');
        },
        '/discount':function(){
            render('discount');
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

