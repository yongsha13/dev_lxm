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
        '/show':function(){
            render('show');
        },
        '/preview':function(){
            render('preview');
        },
        '/show-success':function(){
            render('showSuccess');
        },
        '/show-list':function(){
            $.ajax({
                url:'/orderMeeting2/OiOMForVote/queryVoteResult.do',
                type:'POST',
                dataType:'JSON',
                data:{stepId:8},
                success:function(req){
                    tplData.showList.list = req['userDatas']
                    render('showList');
                }
            })
        },
        '/show-detail':function(){
            render('showDetail');
        },
        '/sign':function(){
            var obj = {
                baseUrl:baseUrl,
                openId:localStorage.getItem('openId'),
                name:localStorage.getItem('userName'),
                area:localStorage.getItem('areaName'),
                phone:localStorage.getItem('mobilePhone')
            };
            /*if(obj.openId){
                tplData.signSuccess = obj;
                location.hash = '#/index/sign/success'
            }*/
            render('sign');
        },
        '/sign/success':function(){
            tplData.signSuccess.num = localStorage.getItem('serialNo');
            render('signSuccess');
        },
        '/sign/error':function(){
            tplData.signError.num = localStorage.getItem('serialNo');
            render('signError');
        },
        '/top-list/:id':function(id){
            if(id>10) tplData.topList.title = '优胜团队';
            else if(id==5) tplData.topList.title = '蒙眼化妆';
            else tplData.topList.title = '最具人气模特奖';
            /*switch (parseInt(id)){
                case 2: chooseTitle(0);break;
                case 3: chooseTitle(1);break;
                case 4: chooseTitle(2);break;
                case 5: chooseTitle(3);break;
                case 15:chooseTitle(4);break;
            }*/
            if(id<10)
                ajax('queryVoteInfo.do',{stepId:id,activityUserId:params.openId},function(req){
                    console.log(req);
                    tplData.topList.list = req['data'];
                    tplData.topList.hasVoteNum = req['personalVoteInfo']?3 - req['personalVoteInfo'].length:3;
                    //tplData.topList.votes = req['personalVoteInfo']||[];
                    tplData.topList.stepId = req['stepId'];
                    /*if(tplData.topList.hasVoteNum<=0){
                        for(var i=0;i<tplData.topList.list.length;i++){
                            tplData.topList.list[i]['canVote']=='0';
                            console.log('a');
                        }

                    }*/
                    /*if(tplData.topList.votes.length>=3){
                        for(var i=0;i<tplData.topList.list.length;i++)
                            tplData.topList.list[i]['getVoted']==true;
                    }
                    if(req['personalVoteInfo']){
                        for(var i=0;i<req['personalVoteInfo'].length;i++)
                            for(var j=0;j<tplData.topList.list.length;j++)
                                if(req['personalVoteInfo'][i].toUserId==tplData.topList.list[j].activityUserId)tplData.topList.list[j]['getVoted'] = true
                    }
                    console.log(req);*/
                    render('topList');
                });
            else
                ajax('queryTeamInfo.do',{stepId:id-10,fromUser:params.openId},function(req){
                    tplData.topList.list = req['data'];
                    console.log(req);
                    render('topList');
                });
            /*function chooseTitle(index){
                tplData.topList.title = tplData.start.list[index].name;
            }*/
            //render('topList');
        },
        '/homepage/:id':function(id){
            render('homepage');
        },
        '/error':function(){
            render('voteError');
        },
        '/shake':function(){
            /*request();
            function request(){
                ajax('raceStepInfo.do',{stepId:6},function(req){
                    console.log(req);

                    if(req['data']['stepStatus']=="0"){
                        console.log('活动未开始');
                        tplData.shake.title = '活动未开始，请稍候...';
                        setTimeout(function(){request()},3000);
                    }else if(req['data']['stepStatus']=="1"){
                        console.log('开始');
                        tplData.shake.leftSecond = req['data']['leftSecond'];
                        location.hash = '#/index/shake-game';
                    }else{
                        console.log('活动结束');
                        tplData.shake.title = '活动已结束';
                    }
                });
            }

            var skt = setInterval(function(){

            },1000);*/
            render('shake');
        },
        '/shake-game':function(){
            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', deviceMotionHandler, false);
            } else {
                alert('本设备不支持devicemotion事件');
            }
            render('shakeGame');
        },
        '/shake-success':function(){
            render('shakeSuccess');
        }
    }
};

