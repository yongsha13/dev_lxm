/**
 * Created by wangyong on 2015/6/14.
 */
var materObj = ['','布衣','合金','铜','法国板材','其他'];
var persion = {
    "persion_0": "成人",
    "persion_1": "小孩"
};
var staticCode = {
    "H700001": "扎发",
    "H700002": "编发",
    "H700003": "发髻",
    "H700004": "花苞",
    "H700005": "半披",
    "H700006": "全披",
    "H800001": "长发",
    "H800002": "中发",
    "H900001": "较多",
    "H900002": "中等",
    "H900003": "较少",
    "H1000001": "椭圆形脸",
    "H1000002": "倒三角形脸",
    "H1000003": "圆形",
    "H1000004": "长形",
    "H1000005": "方形脸",
    "H1000006": "菱形脸",
    "H1000007": "正三角形脸"
};

$(function(){
    if(params['prodId']&&params['prodId']>0)
        var thisUrl = params['ajaxUrl']+'queryHairJewelryProdInfoDtl.do?productId='+params['prodId'];
    else if(params['hairId']&&params['hairId']>0)
        //var thisUrl = './js/hair.json'
        var thisUrl = params['ajaxUrl']+'queryHairDoProdInfoDtl.do?hairId='+params['hairId'];
    else{
        alert('参数错误,prodId:['+params['prodId']+'],hairId:['+params['hairId']+']');
        return false;
    };
    $.ajax({
        url:thisUrl,
        type:'POST',
        dataType:'JSON',
        data:{},
        success:function(req){
            req = dataFormat(req);
            if(req['resultCode']=='0000'){
                if(params['prodId']&&params['prodId']>0){
                    var html = $(TPL.prod).render(req);
                }else{
                    var html = $(TPL.hair).render(req);
                }
                $('#mn').html(html);

                initPic('.js-pic');
                initSlider();
            }else{
                req['url'] = params['imgUrl'];
                var html = $(TPL.error).render(req);
                $('#mn').html(html);
                //alert(req['resultMes']);
            }

        }
    });


    $('#mn')
        .on('click','.tabs .ti span',function(){
            if($(this).hasClass('cur')) return false;
            $(this).addClass('cur').siblings().removeClass('cur');
            $(this).closest('.tabs').find('section').hide().eq($(this).data('num')).show();
            
        })
        .on('click','ul.detail li span.more',function(){
            if($(this).html()=='+'){
                $(this).html('-');
                $(this).next('.m').hide().next('.m').show();
            }else{
                $(this).html('+');
                $(this).next('.m').show().next('.m').hide();
            }
        })
        .on('touchstart','.slider-1',function(){
            clearInterval(timer_1);
        })
        .on('touchend','.slider-1',function(){
            timer_1 = setInterval(function(){
                $('.slider-1 .btn-next').click();
            },5000);
        })
        .on('touchstart','.slider-2',function(){
            clearInterval(timer_2);
        })
        .on('touchend','.slider-2',function(){
            timer_2 = setInterval(function(){
                $('.slider-2 .btn-next').click();
            },5000);
        })
        .on('click','.color-ctrl li,.color-ctrl q',function(){
            //$(this).addClass('cur').siblings().removeClass('cur');
            var index = $(this).index();
            var id = $(this).closest('.color-ctrl').data('id');
            var $children = $('#'+id+' .ctrl li');
            var len = $children.length;
            var toIndent = 0;

            if(index<=len-3&&index>2) toIndent = (index-2)*4.1;

            if(index>len-3) toIndent = (len-5)*4.1;
            if(index<=2) toIndent = 0;
console.log([len,index,toIndent]);
            $('#'+id+' .ctrl li').eq(index).addClass('cur').siblings().removeClass('cur');
            var $pic = $('#'+id+' .full');
            var $ctrl = $('#'+id+' .ctrl');
            $pic.animate({
                textIndent:-index+'00%'
            },500);
            $ctrl.animate({
                textIndent:-toIndent+'rem'
            },500);
        })
});
function initSlider(){
        $('.pic-slider ul').touchSlider({
            flexible:true,
            speed:200,
            btn_prev:$('.pic-slider .btn-prev'),
            btn_next:$('.pic-slider .btn-next'),
            paging:$('.pic-slider .ctrl a'),
            counter:function(e){
                $('.pic-slider .ctrl a').removeClass('cur').eq(e.current-1).addClass('cur');
            }
        });
        var timer = setInterval(function(){
            $('.pic-slider .btn-next').click();
        },5000);
}
function initPic(select){
    $(select).each(function(i,v){
        $(v).find('img').each(function(i,v){
            $(v).data('index',i);
        });
    });
    var p1,p2;
    $(select)
        .on('touchstart','img',function(e){
            if(e.originalEvent.targetTouches.length>1) return false;
            p1 =  pos(e);
            p2 = null;
        })
        .on('touchmove','img',function(e){
            p2 =  pos(e);
        })
        .on('touchend','img',function(e){
            console.log([p1,p2]);
            //console.log([p1[0],p1[1],p2[0],p2[1]]);

            if(p2&&(p1[0]!=p2[0] ||p1[1]!=p2[1])) return false;

            var $boxHtml = $('<div class="pic-box"></div>');
            var $imgHtml = $('<ul></ul>');
            var $txtHtml = $('<ol></ol>');
            var $lis = $(this).closest(select).find('li img,li input');
            var count = $lis.length;
            var index = $(this).data('index')+1;
            var width = $(window).width();
            var height = $(window).height();
            /*$boxHtml.data('count',$lis.length);
            $boxHtml.data('index',$(this).closest('li').index()+1);*/
            for(var i=0;i<$lis.length;i++){
                $imgHtml.append('<img src="'+($($lis[i]).data('src')||$($lis[i]).attr('src'))+'"/>');
                var txt = $($lis[i]).attr('alt')||'';
                //console.log($($lis[i]).find('p').html());
                $txtHtml.append('<p>'+txt+'</p>');
            }

            $imgHtml.css('text-indent',-(index-1)*width+'px');
            $boxHtml.append($imgHtml);
            $boxHtml.append($txtHtml);
            $boxHtml.append('<div class="num">'+index+'/'+count+'</div>');
            var sX = 0;
            var eX = 0;
            var indent = 0;
            $boxHtml
                .on('touchstart',function(e){
                    if(e.originalEvent.targetTouches.length>1) return false;
                    sX = pos(e)[0];
                    indent = parseInt($imgHtml.css('text-indent'));
                })
                .on('touchmove',function(e){
                    if(e.originalEvent.targetTouches.length>1) return false;
                    eX = pos(e)[0];
                    if(sX!=0){
                        $imgHtml.css('text-indent', (eX - sX + indent)+'px');
                        $txtHtml.css('text-indent', (eX - sX + indent)+'px')
                    }
                })
                .on('touchend',function(e){
                    toPage(eX==0?eX:eX-sX);
                    sX = 0;
                    eX = 0;
                })
            $('body').append($boxHtml);
            $('.pic-box img').each(function(i,v){
                $(v).css('margin-top',(height-$(v).height())/2+'px');
            });
            function toPage(page){

                if(page==0) $('.pic-box').remove();
                else{
                    page>0?index--:index++;
                    if(index<1)index=1;
                    if(index>count)index=count;
                    console.log([page,index]);
                    $imgHtml.animate({
                        textIndent:-(index-1)*width+'px'
                    },500);
                    $txtHtml.animate({
                        textIndent:-(index-1)*width+'px'
                    },500);
                    $('.pic-box .num').html(index+'/'+count);
                }
            }
        });

}

function pos(event){
    return [
        event.pageX||
        event.originalEvent.targetTouches[0].pageX,
        event.pageY||
        event.originalEvent.targetTouches[0].pageY
    ];
}

function repeatImg(dom){
    //console.log(dom);
    if(!dom) return '';
    var exp = /<input(.+)src="(.+)">/;
    //console.log(exp.exec(dom));
    dom = dom.replace(exp,'<img src="$2">');
    //console.log(dom);
    return dom;
}

function dataFormat(req){
    req['url'] = params['imgUrl'];
    req['mater'] = materObj;
    req['persion'] = persion;
    req['state'] = staticCode;
    req['schemaStoryShort'] =$(req['schemaStory']).eq(0).html();
    if(params['prodId']&&params['prodId']>0){
        if(req['productInfo']['story']&&req['productInfo']['story'].length>22){
            req['productInfo']['storyShort']=req['productInfo']['story'].substr(0,21);
        }
    }else{
        if(req['hairSteps']){
            for(var i=0;i<req['hairSteps'].length;i++)
                req['hairSteps'][i]['stepContent'] = repeatImg(req['hairSteps'][i]['stepContent']);
        }
    };

    var fields = ['goodsSkuInfos','prodDetails','prodEffects','prodModels','prodScenes','relHairs',
        'hairAmounts','hairDetails','hairEffects','hairFaces','hairLongs','hairScenes','hairSteps','hairTypes','relProducts','relProducts'];
    for(var i=0;i<fields.length;i++)
        if(req[fields[i]]&&req[fields[i]].length==0)req[fields[i]]=null;
    return req;
}