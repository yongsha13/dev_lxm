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
        '/sign':function(){
            render('sign');
        },
        '/sign/success':function(){
            render('signSuccess');
        },
        '/sign/error':function(){
            render('signError');
        },
        '/top-list/:id':function(id){
            switch (parseInt(id)){
                case 2: chooseTitle(0);break;
                case 3: chooseTitle(1);break;
                case 4: chooseTitle(2);break;
                case 5: chooseTitle(3);break;
                case 15:chooseTitle(4);break;
            }
            if(id<10)
                ajax('queryVoteInfo.do',{stepId:id,fromUser:params.openId},function(req){
                    tplData.topList.list = req['data'];
                    console.log(req);
                    render('topList');
                });
            else
                ajax('queryTeamInfo.do',{stepId:id-10,fromUser:params.openId},function(req){
                    tplData.topList.list = req['data'];
                    console.log(req);
                    render('topList');
                });
            function chooseTitle(index){
                tplData.topList.title = tplData.start.list[index].name;
            }
            //render('topList');
        },
        '/homepage/:id':function(id){
            render('homepage');
        },
        '/error':function(){
            render('voteError');
        },
        '/shake':function(){
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

