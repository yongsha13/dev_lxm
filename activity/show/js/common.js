/**
 * Created by wangyong on 14-9-24.
 */
;$(function(){
    window.router = Router(routes).configure({ recurse: 'forward' });
    router.init();
    location.hash.length>0 || (location.hash = '/index/start');
    $('#mn')
        .on('click','h1',function(){
            history.go(-1);
        })
        .on('click','.game .tips',function(){
            $(this).hide();
        })
        .on('click','.game ul li',function(){
            game.select($(this).index());


        })
});
var game = {
    start:function(){
        tplData.game.turnImages = [1,2,3,4,5,6,7,8,9];
        tplData.game.turnImages.sort(function(){return Math.random() >.5?-1:1});
        setTimeout(function(){
            $('#mn .game .box').html($.templates['gamePoke'].render(tplData.game));
            $('#mn .game .box ul').slideDown(function(){
                $('#mn .game .tips').show();
            });

        },3000);
    },
    select:function(index){
        if(tplData.game.prizeNum==0){
            var $prizes = $('.game ul li');
            var curPrize = $prizes[index];
            var curPrizeImg = $(curPrize).find('img');
            var prizeNum = tplData.game.prizeRemoteNum;
            tplData.game.prizeNum = index+1;
            if(prizeNum==0) prizeNum = Math.ceil(Math.random()*6) + 3;
            tplData.game.turnImages.splice(prizeNum-1,1);
            this.turnPoke(curPrizeImg,tplData.game.baseUrl+'images/prize-'+prizeNum+'.png',function(){
                var i=0;
                $('.game ul li img').each(function(n,v){
                    if(!$(this).parent().parent().hasClass('cur')){
                        if(tplData.game.turnImages[i]==tplData.game.prizeRemoteNum)i++;
                        game.turnPoke($(v),tplData.game.baseUrl+'images/prize-'+tplData.game.turnImages[i]+'.png');
                        i++;
                    }
                });
                setTimeout(function(){
                    location.hash = '#/index/prize/'+tplData.game.prizeRemoteNum;
                },2000);
            });
        }
    },
    turnPoke:function(curPrizeImg,src,fun){
        curPrizeImg.animate({
            width:0
        },300,function(){
            $(curPrizeImg).attr('src',src).animate({
                width:'100%'
            },300,function(){
                fun && $(curPrizeImg).parent().parent().addClass('cur');
                fun && typeof fun=='function'&& fun();
            })
        })
    }
}
