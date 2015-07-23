/**
 * Created by wangyong on 2015/7/24.
 */
$(function(){
    $(window).resize(function(){
        var marginTop = ($('.ppt').height()-$('.ppt>div').height())/2+'px';
        console.log(marginTop);
        $('.game,.diamond,.result').css('margin-top',marginTop);
    });
    $(window).resize();
    setInterval(function(){
        ajax(params.stepId>10?'queryTeamInfo.do':'queryVoteInfo.do',{stepId:params.stepId},function(req){
            var html = '';
            if(params.stepId>10||params.stepId==5)
                for(var i=0;i<req['data'].length;i++)
                    html += '<li><strong>'+
                    req['data'][i].areaName+
                    '</strong>'+
                    '<span class="vote">'+
                    req['data'][i].counter+
                    '票</span></li>'
            else
            for(var i=0;i<req['data'].length;i++)
                html += '<li><strong>'+
                req['data'][i].areaName+
                '</strong>-'+
                (req['data'][i].otherName||req['data'][i].userName)+
                '<span class="vote">'+
                req['data'][i].counter+
                '票</span></li>';
            $('ul').html(html);
        });

    },5000);

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