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

$(function(){
    $('#source').on('change',function(){
        if($(this).val()==0) $('#other-box').show();
        else $('#other-box').hide();
        //alert($(this).val());
    })
    $('body')
        .on('click','header .menu-btn',function(){
            $('header ul').toggleClass('hide');
        })
        .on('click','header ul li',function(){
            $('header ul').addClass('hide');
            var index = $(this).index();
            /*var pos = [0,2100,2655,300,400,500];
            $(window).scrollTop(pos[index]);*/
        })
        .on('click','.submit',function(){
            var data = {
                src:'wap',
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
                $('#error').html('');
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
                $('#error').slideUp(function(){
                    $('#error').html(valid.msg);
                    $('#error').slideDown();
                });

            }
        })
});