/**
 * Created by wangyong on 14-9-24.
 */
;$(function(){
    window.router = Router(routes).configure({ recurse: 'forward' });
    router.init();
    location.hash.length>0 || (location.hash = '/step/0');

    $('#mn')
        .on('click','.js-submit',function(){
            var mobileExp = /^(13|15|18)[0-9]{9}$/;

            var data = {
                name:$('#name').val(),
                sex:$('input[name=sex]:checked').val(),
                mobile:$('#mobile').val(),
                address:$('address').val(),
                hangye:$('#hangye').val(),
                dir:$('#dir').val()
            };
            if(mobileExp.test(data.mobile)){
                $('form .error').hide();
                ajax(data,function(req){
                    var storage = window.localStorage;
                    storage.setItem('code',req['code']);//把返回的对象req中的code写到本地
                    location.hash='#/step/5'
                })
            }else{
                $('form .error').show();
            }
        })
});



function ajax(data,fun){
    data['fromOpenid'] = params['fromOpenid'];
    /*alert(JSON.stringify(params));*/
    $.ajax({
        type:'POST',
        url:'/luckyDraw/drawLucky.do',
        data:data,
        dataType:'JSON',
        success:function(req){
            //alert('success:'+JSON.stringify(req));
            if(req['errorCode']==0 || req['errorCode']==1000){
                fun(req);
            }else{
                $('.js-error-msg-cnt').html(req['errorMsg']);
                location.hash = '/index/error';
            }
        },
        error:function(msg){
            //alert('error:'+JSON.stringify(msg));
            $('.js-error-msg-cnt').html('网络故障，请检查手机网络是否正常');
            location.hash = '/index/error';
        }
    });
}

