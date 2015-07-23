/**
 * Created by wangyong on 2015/7/23.
 */
$(function(){
    $(window).resize(function(){
        var marginTop = ($('.ppt').height()-$('.ppt>div').height())/2+'px';
        console.log(marginTop);
        $('.game,.diamond,.ppt>.result').css('margin-top',marginTop);
    });
    $(window).resize();
    $('.ppt .game').on('click','.btn',function(){
        $(this).hide();
        $('.num').show();
        console.log('start');

        ajax('raceControl.do',{stepId:6,stepStatus:1},function(req){
            if(req['errorMsg']!=2)game.start();
            else{ alert('活动已经结束，请后台重新启动！')}

        });
    });
    $('.ppt .diamond').on('click','.ctrl a',function(){
        var $index = $(this).index();
        if($index==0){
            diamond.start();
        }else if($index==1) {
            diamond.ok();
        }else{
            diamond.jump();
        }
    })
});
var game = {
    txt:['准备！','3','2','1','开始！','游戏结束'],
    $target:$('.ppt .game .num'),
    $gifTarget:$('.ppt .game .runs'),
    liveTime:3000,
    timer:'',
    dirPos:[],
    top:90,
    ceil:35,
    start:function(){
        var _self = this;
        console.log('start');
        //var index = 0;
        txt(0);
        function txt(index){
            if(index<=4) _self.playTxt(index,function(i){
                console.log(i);
                txt(i);
            });
            else _self.playGif();
        }

    },
    playTxt:function(index,fun){
        console.log(index);
        var _self = this;
        this.$target.css({'textIndent':-200,'opacity':0}).html(_self.txt[index]);
        this.$target.animate({
            textIndent:0,
            opacity:1
        },300,function(){
            _self.timer = setTimeout(function(){
                _self.$target.animate({
                    textIndent:100,
                    opacity:0
                },100,function(){
                    fun(index+1);
                })
            },600)
        })
    },
    playGif:function(){console.log('gif');
        var html = '';
        var _self = this;
        this.dirPos = [];
        for(var i=0;i<10;i++){
            html += '<img id="run-'+i+'" style="top:'+(this.top+this.ceil*i)+'px; left:0px" src="./images/ppt/run0'+(Math.ceil(Math.random()*6))+'.gif" >';
            this.dirPos.push(Math.random()*300+500);
        }
        this.dirPos[Math.ceil(Math.random()*10)] = 800;
        this.$gifTarget.html(html);
        for(var i=0;i<10;i++)
            $('#run-'+i).animate({
                left:_self.dirPos[i]
            },35000);
        var t = setInterval(function(){
            if(_self.liveTime>0)_self.liveTime--;
            else{
                _self.gameOver();
                clearInterval(t);
            }
            $('.ppt .game .head').html('剩余时间<em>'+
            parseInt(_self.liveTime/100)+
            (_self.liveTime%100<10?'.0':'.')
            +_self.liveTime%100+'</em>秒');
        },10);
    },
    gameOver:function(){
        console.log('gameOver');
        this.playTxt(5,function(){
            $('.ppt .game .runs img').remove();
            $('.ppt .game .result').slideDown();
        });
        ajax('raceResult.do',{stepId:6},function(req){
            var html = '<ul>';
            for(var i=0;i<req['data'].length;i++){
                html+= '<li>'+(i+1)+' '+req['data'][i].areaName+'-'+req['data'][i].userName+'</li>';
            };
            html += '</ul>';
            $('.ppt .game .result').html(html);
        });
        /*this.playTxt(5,4,function(){

         })*/
        /**/
    }
}

var diamond = {
    speed:1,
    speedMin:1,
    speedMax:10,
    dir:true,
    num:0,
    sNum:50,
    cur:0,
    userData : [],
    curData : null,
    $target:null,
    start:function(){
        var _self = this;
        console.log('start');
        this.$target = $('.ppt .diamond .avatar');
        this.num=0;
        this.dir=true;
        var html = '<img src="./images/ppt/who.jpg">';
        for(var i=1;i<=10;i++) html += '<img src="./images/ppt/r0'+i+'.jpg">';
        $('.ppt .diamond .avatar').html(html);
        this.run();
        ajax('getSomeActivityUserInfo.do',{stepId:8},function(req){
            _self.curData = req['userData'];
            //_self.userData.push(req['userData']);

            console.log(req);
        });
    },
    ok:function(){
        ajax('selectVoteUser.do',{stepId:8,activityUserId:this.curData.activityUserId},function(){
            $('.ppt .diamond .ctrl a:eq(0)').show().siblings().hide();
        });
    },
    jump:function(){
        $('.ppt .diamond .ctrl a:eq(0)').show().siblings().hide();
    },
    run:function(){
        this.num++;
        if(this.dir&&this.speed<this.speedMax) this.speed++;
        if(this.num==this.sNum){
            if(this.curData){
                this.dir=false;
                this.userData.push(this.curData);
                $('.ppt .diamond .avatar img:eq(8)').after('<img src="'+this.curData['photoUrl']+'">');
            }else{
                this.num=0;
            }
        }
        if(!this.dir&&this.speed>this.speedMin) this.speed--;
        //console.log('run:'+this.speed+':'+this.num);
        var _self = this;
        this.$target.animate({
            textIndent:"-200px"
        },1000/this.speed,function(){
            _self.$target.append(_self.$target.find('img:first')).css('text-indent','0');
            if(_self.speed>1)
                _self.run();
            else{
                $('.ppt .diamond .ctrl a:eq(0)').hide().siblings().show();
            }
        });
    }
}

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