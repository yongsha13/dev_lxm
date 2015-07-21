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
        '/top-list':function(){
            render('topList');
        },
        '/homepage/:id':function(id){
            render('homepage');
        },
        '/error':function(){
            render('voteError');
        }
    }
};

