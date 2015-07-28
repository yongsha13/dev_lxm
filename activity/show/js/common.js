/**
 * Created by wangyong on 14-9-24.
 */
;$(function(){
    window.router = Router(routes).configure({ recurse: 'forward' });
    router.init();
    if(params['topList'])location.hash = '/index/top-list/0';
    else location.hash.length>0 || (location.hash = '/index/start');
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
        .on('click','.js-share',function(){
            wx.onMenuShareTimeline({
                title:'别问那么多,我就是要送你奖品',
                link:'http://www.wxbinf.com/newPrd/index.jsp',
                imgUrl:'http://www.wxbinf.com/newPrd/images/newPrd_logo.jpg',
                success:function(){
                    alert('分享成功，请重新进入抽奖环节');
                }
            });
        })
        .on('click','.game-address .btn',function(){
            ajax('luckyService.do',{
                opType:'saveLuckyUserInfo',
                fromOpenid:params['openid'],
                activityId:'201507',
                userName:$('#name').val(),
                userPhone:$('#phone').val(),
                userAddress:$('#address').val()
            },function(){
                location.hash = '#/index/address/success'
            });
        })
        .on('click','.show ul li',function(){
            var index = $(this).index();
            var ar = ['camera','album'];
            alert(ar[index]);
            alert(JSON.stringify(params));
            wx.chooseImage({
                count:1,
                sizeType: ['original', 'compressed'],
                sourceType:[ar[index]],
                success:function(res){
                    tplData.preview.localId = res.localIds[0];
                    wx.uploadImage({
                        localId:res.localIds[0],
                        isShowProgressTips:1,
                        success:function(res){
                            tplData.preview.serverId = res.serverId;
                            location.hash = '#/index/preview';
                        }
                    })
                }
            })
        })
        .on('click','.preview .btn',function(){
            ajax('photoService.do',{
                opType:'savePic',
                mediaId:tplData.preview.serverId,
                fromOpenid:params['openid']
            },function(req){
                alert('上传图片成功');
                location.hash = '#/index/show';
            })
        })
        .on('click','.top-list .more',function(){
            ajax('photoService.do',{
                opType:'getPhotoList',
                activityId:'newPRD201507',
                areaId:tplData.topList.areaId,
                fromOpenid:params['openId'],
                startNum:tplData.topList.lastId,
                batchNum:10
            },function(req){
                if(req['batchNum']<10) tplData.topList.isListEnd = true;
                tplData.topList.lastId += 10;
                for(var i=0;i<req['photoData'].length;i++)
                    tplData.topList.list.push({
                        url:'userInfo.html?userId='+req['photoData'][i]['userId'],
                        src:req['photoData'][i]['smallPhotoUrl'],
                        bigSrc:req['photoData'][i]['bigPhotoUrl'],
                        praise:req['photoData'][i]['praiseNum'],
                        sort:req['photoData'][i]['sortNum'],
                        openId:req['photoData'][i]['userId']
                    });
                $('.top-list .more').remove();
                render('topList');
                //$('.top-list ul').html($.templates['topListUl'].render(tplData.topList));

            });
        })
        .on('change','#area',function(){
            tplData.topList.list = [];
            tplData.topList.lastId =1;
            location.hash = '#/index/top-list/'+$(this).val();
        })
});
var game = {
    start:function(){
        tplData.game.turnImages = [1,2,3,4,5,6,7,8,9];
        tplData.game.turnImages.sort(function(){return Math.random() >.5?-1:1});
        //alert(JSON.stringify(params));
        ajax('luckyService.do',{
            opType:'queryMyAwards',
            fromOpenid:params['openid']
        },function(req){
            if(req['leftLuckyDraw']==0){
                tplData.menu.ticketNum = req['award_0'];
                tplData.menu.chanceNum = 0;
                location.hash = '#/index/menu';
            }

            if(req['award_1']=='1')tplData.game.prizeRemoteNum=1;
            else if(req['award_2']=='1')tplData.game.prizeRemoteNum=2;
            else if(req['award_3']=='1')tplData.game.prizeRemoteNum=3;
            else if(req['award_0']=='1')tplData.game.prizeRemoteNum=0;
            else tplData.game.prizeRemoteNum=-1;
            tplData.game.prizeTimes = req['leftLuckyDraw'];
            if(req['leftLuckyDraw']==0){
                if(tplData.game.prizeRemoteNum>0) location.hash = '#/index/prize/'+tplData.game.prizeRemoteNum;
                else location.hash = '#/index/menu';
                return false;
            }else{
                ajax('luckyService.do',{
                    opType:'getMyLucky',
                    fromOpenid : params['openid']
                },function(req){

                    if(req['award_1']=='1')tplData.game.prizeRemoteNum=1;
                    else if(req['award_2']=='1')tplData.game.prizeRemoteNum=2;
                    else if(req['award_3']=='1')tplData.game.prizeRemoteNum=3;
                    else if(req['award_0']=='1')tplData.game.prizeRemoteNum=0;
                    else tplData.game.prizeRemoteNum=-1;

                    if(tplData.game.prizeRemoteNum<0)
                        $('#mn .game .box').html(req['errorMsg']);
                    else{
                        $('#mn .game .box').html($.templates['gamePoke'].render(tplData.game));
                        $('#mn .game .box ul').slideDown(function(){
                            $('#mn .game .tips').show();
                        });
                    }
                })
            }



        });
    },
    select:function(index){
        var _self = this;
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
                _self.gameOver();
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
    },
    gameOver:function(){
        setTimeout(function(){
            location.hash = '#/index/prize/'+tplData.game.prizeRemoteNum;
        },1000);
        /*ajax('luckyService.do',{
            opType:'getMyLucky',
            fromOpenid:params['openid']
        },function(req){
            tplData.gamePrize.prizes[0].times = req['leftLuckyDraw'];
            setTimeout(function(){
                location.hash = '#/index/prize/'+tplData.game.prizeRemoteNum;
            },1000);

        });*/
    }
}

function ajax(url,data,callback,errorback){
    errorback = errorback || function(req){alert(req['errorMsg'])}
    $.ajax({
        url:"http://www.wxbinf.com/newPrd/"+url,
        type:'POST',
        dataType:'JSON',
        data:data,
        success:function(req){
            console.log(req);
            if(parseInt(req['errorCode'])==0) callback(req);
            else errorback(req);
        },
        error:function(){
            errorback({errorMsg:'网络通讯错误，请确定网络是否稳定'+url});
        }
    })
}

var a = {errorCode:0,errorMsg:'成功',areaId:0,activityId:'newPRD201507',startNum:1,batchNum:5,photoData:[{userId:6,smallPhotoUrl:'http:\/\/www.wxbinf.com\/newPrd\/userImgs\/abc123_small.jpg',bigPhotoUrl:'http:\/\/www.wxbinf.com\/newPrd\/userImgs\/1507271853200123.jpg',praiseNum:10,sortNum:1},{userId:7,smallPhotoUrl:'http:\/\/www.wxbinf.com\/newPrd\/userImgs\/abc123_small.jpg',bigPhotoUrl:'http:\/\/www.wxbinf.com\/newPrd\/userImgs\/abc123.jpg',praiseNum:4,sortNum:2},{userId:9,smallPhotoUrl:'http:\/\/www.wxbinf.com\/newPrd\/userImgs\/abc123_small.jpg',bigPhotoUrl:'http:\/\/www.wxbinf.com\/newPrd\/userImgs\/abc123.jpg',praiseNum:2,sortNum:3},{userId:8,smallPhotoUrl:'http:\/\/www.wxbinf.com\/newPrd\/userImgs\/abc123_small.jpg',bigPhotoUrl:'http:\/\/www.wxbinf.com\/newPrd\/userImgs\/abc123.jpg',praiseNum:1,sortNum:4},{userId:12,smallPhotoUrl:'http:\/\/file.api.weixin.qq.com\/cgi-bin\/media\/get?access_token=yc5utzOBIhb0RYlz3TPcsR_dhLDKne_QurZxW_4DUzX1lhwpy7KIbQUroZ9Cc3g2iUETgLHC-9vSn6SN9jSE5pO3GyG2fe9MT6H8EC289dc&media_id=DGticBAP-8XeZ0_Kpo3PG0B264Qw7xjPBZYO3eUQH2rQjRlOP2COmtPatEjnp3ry',bigPhotoUrl:'http:\/\/file.api.weixin.qq.com\/cgi-bin\/media\/get?access_token=yc5utzOBIhb0RYlz3TPcsR_dhLDKne_QurZxW_4DUzX1lhwpy7KIbQUroZ9Cc3g2iUETgLHC-9vSn6SN9jSE5pO3GyG2fe9MT6H8EC289dc&media_id=DGticBAP-8XeZ0_Kpo3PG0B264Qw7xjPBZYO3eUQH2rQjRlOP2COmtPatEjnp3ry',praiseNum:0,sortNum:5}]}