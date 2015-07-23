/**
 * Created by wangyong on 14-9-24.
 */
;$(function(){
    window.router = Router(routes).configure({ recurse: 'forward' });
    router.init();
    //if(!localStorage.getItem('userActivityUserId')) location.hash = '/index/sign';
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
                areaId:tplData.sign.areaId
            };
            var mobileExp = /^1[3|4|5|8][0-9]{9}$/;
            if(!mobileExp.test(data.mobilePhone)){
                alert('手机号码填写不正确，请重新填写!');
                return false;
            }
            tplData.signSuccess['name'] = data.userName;
            tplData.signSuccess['phone'] = data.mobilePhone;
            tplData.signSuccess['area'] = tplData.sign.areaName;
            tplData.signError['name'] = data.userName;
            tplData.signError['phone'] = data.mobilePhone;
            tplData.signError['area'] = tplData.sign.areaName;
            ajax('signin.do',data,function(req){
                localStorage.setItem('userActivityUserId',req['activityUserId'])
                location.hash = '#/index/sign/success';
            },function(){
                location.hash = '#/index/sign/error';
            });
        })
        .on('click','.show li',function(){

            if($(this).index()==0)
                var method = 'album';
            else
                var method = 'camera';


            wx.chooseImage({
                count:1,
                sizeType:['original'],
                sourceType:[method],
                success:function(res){
                    alert('a');
                    var localIds = res.localIds;
                    console.log(localIds);
                }
            });
        })
});


function ajax(url,data,callback,errorback){
    errorback = errorback || function(req){alert(req['errorMsg'])}
    $.ajax({
        url:params.ajaxBaseUrl+"/"+url,
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
var w = 0;
var SHAKE_THRESHOLD = 800;
var last_update = 0;
var x = y = z = last_x = last_y = last_z = 0;



function deviceMotionHandler(eventData) {
    var acceleration = eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();

    if ((curTime - last_update) > 100) {
        var diffTime = curTime - last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
        var status = document.getElementById("status");

        if (speed > SHAKE_THRESHOLD) {
            doResult();
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}

function doResult() {
    //alert("摇动了");
    if(w<18)w += 1;
    else{
        ajax('race.do',{},function(){});
    }
    $('.shake .banner .em').css('width',w+'rem');
    /*document.getElementById("result").className = "result";
    document.getElementById("loading").className = "loading loading-show";
    setTimeout(function(){
        //document.getElementById("hand").className = "hand";
        document.getElementById("result").className = "result result-show";
        document.getElementById("loading").className = "loading";
    }, 1000);*/
}