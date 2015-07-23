/**
 * Created by wangyong on 2015/7/23.
 */
$(function(){
    $(window).resize(function(){
        var marginTop = ($('.ppt').height()-$('.game').height())/2+'px';
        console.log(marginTop);
        $('.game').css('margin-top',marginTop);
    });
    $(window).resize();
    $('.ppt').on('click','.btn',function(){
        $(this).hide();
        $('.num').show();
        console.log('start');
        game.start();
    });
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
        })
        /*this.playTxt(5,4,function(){

         })*/
        /**/
    }
}