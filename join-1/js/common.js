/**
 * Created by wangyong on 14-9-24.
 */
;var playing = false,alowPlay = true;
var pos = [0,2300,3160,4140,5100,5700];
$(function(){
    select_mod($('#mn .select'));
    setInterval(function(){
        playbox(false);
    },3000);
   /* qq();*/
    $('#mn')
        .on('click','.nav a',function(){
            var index = $(this).index();

            $(document).scrollTop(pos[index]);
            $(this).addClass('cur').siblings().removeClass('cur');
        })
        .on('click','.tabs .ti a',function(){
            if($(this).hasClass('active')) return false;
            var active = $(this).hasClass('a-1')?0:1;
            $(this).addClass('active').siblings().removeClass('active');
            $(this).closest('.tabs').find('.box:eq('+active+')').show().siblings().hide();
        })
        .on('mouseover','.tabs .cnt',function(){
            alowPlay = false;
        })
        .on('mouseout','.tabs .cnt',function(){
            alowPlay = true;
        })
        .on('click','.tabs .ctrl',function(){
            playbox($(this).hasClass('left'));
        })
        .on('click','.form .submit',function(){

            var data = {
                name:$('#name').val(),
                mobile:$('#mobile').val(),
                weixin:$('#weixin').val(),
                address:$('#address').val(),
                qq:$('#qq').val(),
                email:$('#email').val(),
                recall:$('#recall').val(),
                notice:$('#notice').val(),
                source:$('#source').val(),
                other:$('#other').val()
            };
            var valid = validate(data);
            if(valid===true){
                //
                $.ajax({
                    type:'POST',
                    url:params.formUrl,
                    data:data,
                    dataType:'JSON',
                    success:function(req){
                        alert('提交成功');
                    },
                    error:function(req){
                        alert('网络出错')
                    }
                });
            }else{
                $('.error').html(valid['msg']||'填写有误');
            }

        })

        .on('click','.select-mod .ti',function(){
                var $ul = $(this).closest('.select-mod').find('ul');
                $ul.slideToggle('fast');

        })
        .on('click','.select-mod ul li',function(){
            var $mod = $(this).closest('.select-mod');
            var $ul = $mod.find('ul');
            var $em = $mod.find('em');
            var $select = $mod.prev('select');
            var val = $(this).data('value');
            $ul.slideUp('fast');
            $em.html($(this).find('a').html());
            $select.val(val);
            if($mod.hasClass('up')){
                //console.log('up'+val);
                var $other = $('#other').closest('.item');
                val==0 ? $other.show():$other.hide();
            }
            //console.log([$(this).data('value'),$select.val()])
        });
    $(window).scroll(function(){nav();});
    nav();
});

function select_mod($dom){
    for(var i=0;i<$dom.length;i++){
        var $select = $($dom[i]);
        $select.hide();
        var option = '';
        var $options = $select.find('option');
        for(var j=0;j< $options.length;j++)
            option += '<li data-value="'+$($options[j]).val()+'"><a href="javascript:;">'+$($options[j]).html()+'</a></li>';
        $select.after('<div class="select-mod '+($select.hasClass('up')?'up':'')+'"><div class="ti"><em>'+$($options[0]).html()+'</em><span></span></div><ul>'+option+'</ul></div>');
    }
}
/*
function qq(){
    var url = 'http://webpresence.qq.com/getonline?Type=1&';
    url += qqs.join(':')+':';
    $('#mn').append('<script src="'+url+'"></script>');
    setTimeout(function(){
        $('.tel .qq-id').each(function(i,v){
            $(v).html('<a title="点击这里直接与我QQ交谈" href="http://wpa.qq.com/msgrd?v=1&uin='+qqs[i]+'&site=qq&menu=yes">'+qqs[i]+'</a>');
            online[i]==1 && $(v).addClass('online');
        });
    },2000);
}*/

function playbox(flag){
    if(playing || !alowPlay) return false;
    playing = true;
    var marginTo = flag?0:-242;
    var $cnt = $('.tabs .box:visible');
    /*var $fst = $cnt.find('li:first');
    var $lst = $cnt.find('li:last');
    console.log([flag,$fst,$lst]);*/
    if(flag){
        $cnt.prepend($cnt.find('li:last')).css('margin-left','-242px');
        //$lst.remove();
    }
    $cnt.animate({
        marginLeft:marginTo
    },500,function(){
        if(!flag){
            $cnt.append($cnt.find('li:first')).css('margin-left','0');
            //$fst.remove();
        }
        playing = false;
    })
}

function validate(data){
    var exp = {
        required:/^.+$/,
        mobile:/^1[3|4|5|8][0-9]{9}$/
    };
    var reData = {};
    if(!exp.required.test(data.name))return {msg:'姓名不能为空'};
    if(data.name.length>12)return {msg:'姓名不能超过12个字符'};
    if(!exp.mobile.test(data.mobile))return {msg:'请输入正确的手机号码'};
    if(!exp.required.test(data.address))return {msg:'地址不能为空'};
    if(!exp.required.test(data.notice))return {msg:'还没写留言呀'};
    if(data.source<0)return {msg:'请选择在哪里看到流行美加盟信息'}
    return true;
}

function nav(){
    var top = $(document).scrollTop();
    console.log(top);
    for(var i=0;i<6;i++){
        if(top>pos[i]-100)$('.nav a').eq(i).addClass('cur').siblings().removeClass('cur');
    }
    if(top<2000)$('.nav a').eq(0).addClass('cur').siblings().removeClass('cur');
}