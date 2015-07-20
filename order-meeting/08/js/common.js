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
});

