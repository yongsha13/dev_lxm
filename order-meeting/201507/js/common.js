/**
 * Created by wangyong on 14-9-24.
 */
;$(function(){
    window.router = Router(routes).configure({ recurse: 'forward' });
    router.init();
    location.hash.length>0 || (location.hash = '/index/start');
    $('#mn')
        .on('click','.back',function(){
            history.go(-1);
        })
        .on('click','.sign .box span',function(){
            tplData.sign.areaId = $(this).index()+1;
            tplData.sign.areaName = $(this).html();
            $(this).addClass('cur').siblings().removeClass('cur');
        })
        .on('click','.sign .btn',function(){
            var data = {
                openid:params.openId,
                userName:$('#name').val(),
                mobilePhone:$('#phone').val(),
                fromAreaId:tplData.sign.areaId
            };
            var mobileExp = /^1[3|4|5|8][0-9]{9}$/;
            if(!mobileExp.test(data.mobilePhone)) alert('手机号码填写不正确，请重新填写!');
            tplData.signSuccess['name'] = data.userName;
            tplData.signSuccess['phone'] = data.mobilePhone;
            tplData.signSuccess['area'] = tplData.sign.areaName;
            tplData.signError['name'] = data.userName;
            tplData.signError['phone'] = data.mobilePhone;
            tplData.signError['area'] = tplData.sign.areaName;
            ajax('signin.do',data,function(req){
                location.hash = '#/index/sign/success';
            },function(){
                location.hash = '#/index/sign/error';
            });
        })
});

function ajax(url,data,callback,errorback){
    errorback = errorback || function(req){alert(req['errorMsg'])}
    $.ajax({
        url:params.ajaxBaseUrl+url,
        type:'POST',
        dataType:'JSON',
        data:data,
        success:function(req){
            if(!req['errorCode']) errorback(req);
            else callback(req);
        },
        error:function(){
            errorback({errorMsg:'网络通讯错误，请确定网络是否稳定'});
        }
    })
}