/**
 * Created by wangyong on 14-9-24.
 */
;$(function(){
    //alert('1');
    select_mod($('#mn .select'));
    //alert('2');
    $('#mn')
        .on('click','.select-mod .ti',function(){
            //console.log('on');
            var $ul = $(this).closest('.select-mod').find('ul');
            $ul.slideToggle('fast');
        })
        .on('click','.select-mod ul li',function(){
            var $mod = $(this).closest('.select-mod');
            var $ul = $mod.find('ul');
            var $em = $mod.find('em');
            var $select = $mod.prev('select');
            $ul.slideUp('fast');
            $em.html($(this).find('a').html());
            $select.val($(this).data('value'));
            //console.log([$(this).data('value'),$select.val()])
        })
        .on('click','.radio-mod span',function(){
            var _self = this;
            var value= $(_self).data('value');
            $(this).addClass('active').siblings().removeClass('active');
            $(this).closest('.radio-mod').find('input').val(value);
        })
        .on('click','.pic li',function(){
            var _self = this;
            if($(_self).hasClass('add')){
                wx.chooseImage({
                    success:function(res){
                        var localIds = res.localIds;
                        /*var html = '';
                        for(var i=0;i<localIds.length;i++)
                            html += '<li data-id="'+localIds[i]+'"><img src="'+localIds[i]+'" /></li>';
                        $(_self).before(html);*/
                        upload(0,localIds);
                    }
                });
            }else{
                for(var i=0;i<serverIds.length;i++){
                    if(serverIds[i]==$(_self).data('id')){
                        serverIds.splice(i,1);
                        break;
                    }
                }
                $(_self).remove();
            }

        })
        .on('click','.submit',function(){
            var data = {
                appId:params['appId'],
                openid:params['openid'],
                suggestType:$('#advice').val(),//留言类型
                sex:$('#sex').val(),
                name:$('#name').val(),
                commInfo:$('#contact').val(),//联系方式
                content:$('#notice').val(),//留言内容
                pics:serverIds.join(';')
            };
            var mobileExp = /(^1[3|4|5|8][0-9]{9}$)|(^[1-9][0-9]{4,10}$)|(^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$)/;
            var contentExp = /^.{8,500}$/;
            if(!mobileExp.test(data.commInfo)){
                alert('请正确填写您的联系方式，必须是手机号码、QQ号码或者Email地址');
                return false;
            }
            if(!contentExp.test(data.content)){
                alert('留言内容最少8个字，最多500个字');
                return false;
            }
            $.ajax({
                type:'POST',
                url:'http://www.wxbinf.com/guestbook/guest.do?opType=save',
                data:data,
                dataType:'JSON',
                success:function(req){
                    $('section').eq(1).show().siblings().hide();
                },
                error:function(req){
                    alert('网络出错');
                }
            });
        });
});
var serverIds = [];
/*setTimeout(function(){alert(window['token'])},2000);*/
function upload(index,localIds){
    if(index<localIds.length){
        wx.uploadImage({
            localId:localIds[index],
            isShowProgressTips:1,
            success:function(res){
                var u = navigator.userAgent;

                var html = '<li data-id="'+res.serverId+'"><img src="http://file.api.weixin.qq.com/cgi-bin/media/get?access_token='+params['imgUrl']+'&media_id='+res.serverId+'" /></li>';
                $('.pic li.add').before(html);
                //alert(localIds[index]+$('.pic li.add').prev().html()+res.serverId);
                serverIds.push(res.serverId);
                upload(index+1,localIds);
            }
        });
    }
}
function select_mod($dom){
    for(var i=0;i<$dom.length;i++){
        var $select = $($dom[i]);
        $select.hide();
        var option = '';
        var $options = $select.find('option');
        for(var j=0;j< $options.length;j++)
            option += '<li data-value="'+$($options[j]).val()+'"><a href="javascript:;">'+$($options[j]).html()+'</a></li>';
        $select.after('<div class="select-mod"><div class="ti"><em>'+$($options[0]).html()+'</em><span> &#x25BC;</span></div><ul>'+option+'</ul></div>');
    }
}