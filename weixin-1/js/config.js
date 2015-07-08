/**
 * Created by wangyong on 14-9-26.
 */

/**
 * jQuery validate 配置
 * @type {{contactEdit: {debug: boolean, errorClass: string, errorElement: string, rules: {name: {required: boolean, minlength: number}, nick: {minlength: number}, address: {maxlength: number}, explain: {maxlength: number}, mobile: {number: boolean, rangelength: number[]}}}}}
 */
;var routes = {
    '/step':{
        on:function(){
            $('#mn>div').hide();
            window.scrollTo(0,0);
            console.log('/index');
        },
        '/0':function(){$('#step-0').show();},
        '/1':function(){$('#step-1').show();},
        '/2':function(){$('#step-2').show();},
        '/3':function(){$('#step-3').show();},
        '/4':function(){
            $('#step-4').show();
            var storage = window.localStorage;
            if(storage.getItem('code')!==null){
                $('form').hide();
                $('.js-show').show();
            }else{
                $('form').show();
                $('.js-show').hide();
            }
        },
        '/5':function(){
            $('#step-5').show();
            var storage = window.localStorage;
            if(storage.getItem('code')!==null){
                $('.js-code').html(storage.getItem('code'));//读取本地数据
            }else{
                $('.js-code').html('没有获得券');
            }
        },
        '/6':function(){
            var storage = window.localStorage;
            storage.clear();//当访问的地址是#/step/6 时，清理礼品券
        },
        '/7':function(){
            var storage = window.localStorage;
            storage.setItem('code','测试礼品券');
        }
    }
};
