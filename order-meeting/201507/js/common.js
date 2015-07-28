/**
 * Created by wangyong on 14-9-24.
 */


;$(function(){
    //localStorage.setItem('openId',200);
    window.router = Router(routes).configure({ recurse: 'forward' });
    router.init();
    if(!$.cookie('openId')) location.hash = '/index/sign';
    location.hash.length>0 || (location.hash = '/index/start');
    $('#mn')
        .on('click','.back',function(){
            history.go(-1);
        })
        .on('click','.preview .btn',function(){
            //alert('inBtn');
            wx.uploadImage({
                localId:tplData.preview.img,
                isShowProgressTips:1,
                success:function(res){
                    var serverId = res.serverId;
                    //alert('inAjax');
                    $.ajax({
                        url:'/orderMeeting2/OiOMForVote/getUserPic.do',
                        type:'POST',
                        dataType:'JSON',
                        data:{activityUserId:$.cookie('openId'),picId:serverId},
                        success:function(req){
                            location.hash = '#/index/show-success';
                            /*alert('上传成功');
                            console.log(req);*/
                        },
                        error:function(){
                            alert('上传失败');
                        }
                    });
                }
            });
        })
        .on('click','.show.list img',function(){
            var index = $(this).closest('li').index();
            tplData.showDetail = tplData.showList.list[index];
            location.hash='#/index/show-detail'
        })
        .on('click','.show.detail .btn',function(){
            $.ajax({
                url:'/orderMeeting2/OiOMForVote/addVote.do',
                type:'POST',
                dataType:'JSON',
                data:{activityStepId:8,toUserId:tplData.showDetail.activityUserId,activityUserId:$.cookie('openId')},
                success:function(req){
                    if(req['errorCode']==0){
                        tplData.showList.list[index].counter++;
                        tplData.showDetail.counter++;
                        alert('投票成功，谢谢参与');
                        render('showDetail');
                    }else{
                        alert(req['errorMsg']);
                    }

                }
            });
        })
        .on('click','.sign .box span',function(){
            tplData.sign.areaId = $(this).index()+1;
            tplData.sign.areaName = $(this).html();
            $(this).addClass('cur').siblings().removeClass('cur');
        })
        .on('click','.shake .btn',function(){
            ajax('raceStepInfo.do',{stepId:6},function(req){
                if(req['data']['stepStatus']==0){
                    alert('活动还未开始')
                }else if(req['data']['stepStatus']==1){
                    location.hash = '#/index/shake-game';
                }else{
                    alert('活动已经结束');
                }
            });
        })
        .on('click','.sign .btn',function(){
            var data = {
                openid:$.cookie('openId'),
                userName:$('#name').val(),
                mobilePhone:$('#phone').val(),
                areaId:tplData.sign.areaId
            };
            var mobileExp = /^1[3|4|5|8][0-9]{9}$/;
            if(!mobileExp.test(data.mobilePhone)){
                alert('手机号码填写不正确，请重新填写!');
                return false;
            }
            /*tplData.signSuccess['name'] = data.userName;
            tplData.signSuccess['phone'] = data.mobilePhone;
            tplData.signSuccess['area'] = tplData.sign.areaName;
            tplData.signError['name'] = data.userName;
            tplData.signError['phone'] = data.mobilePhone;
            tplData.signError['area'] = tplData.sign.areaName;*/
            ajax('signin.do',data,function(req){
                $.cookie('openId',req['userInfo']['activityUserId']);
                $.cookie('userName',data.userName);
                $.cookie('mobilePhone',data.mobilePhone);
                $.cookie('area',tplData.sign.areaName);
                $.cookie('serialNo',req['userInfo']['serialNo']);
                tplData.signSuccess.num = req['userInfo']['serialNo'];
                tplData.signError.num = req['userInfo']['serialNo'];
                console.log([req['userInfo']['isChecked']=='否',req['userInfo']['isChecked']=='是',req]);
                /*if(req['userInfo']['isChecked']=='否'){
                    location.hash = '#/index/sign/error';
                }*/
                if(req['userInfo']['isChecked']=='true'){
                    location.hash = '#/index/sign/success';
                }else{
                    location.hash = '#/index/sign/error';
                }
            },function(){
            });
        })
        .on('click','.show .upload li',function(){

            if($(this).index()==0)
                var method = 'camera';
            else
                var method = 'album';
            wx.chooseImage({
                count:1,
                sizeType:['original'],
                sourceType:[method],
                success:function(res){
                    tplData.preview.img = res.localIds[0];
                    location.hash = '#/index/preview'
                }
            });
        })
        .on('click','.top-list .js-vote',function(){
            var index = $(this).closest('li').index();
            var id = $(this).closest('li').data('id');
            //tplData.topList.votes.push({activeUserId:id});
            /*if(tplData.topList.hasVoteNum<=0){
                for(var i=0;i<tplData.topList.list.length;i++)
                    tplData.topList.list[i]['canVote']=='0';
            }*/
            ajax('vote.do',{activityUserId:$.cookie('openId'),stepId:tplData.topList.stepId,toUserId:id},function(req){
                if(req['errorCode']==0){
                    tplData.topList.list[index]['canVote'] = '0';
                    tplData.topList.list[index]['counter']++;
                    tplData.topList.hasVoteNum --;
                    render('topList');
                }else{
                    alert(req['errorMsg']);
                }

            });

            //console.log($(this).closest('li').data('id'));
        })

    $(window).scroll(function(){
        console.log('scroll');
    });
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
        ajax('race.do',{stepId:6,activityUserId:$.cookie('openId'),percent:100},function(){
            location.hash='#/index/shake-success'
        });
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

jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options = $.extend({}, options);
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};