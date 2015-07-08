/**
 * Created by wangyong on 14-9-24.
 */
;$(function(){
    window.router = Router(routes).configure({ recurse: 'forward' });
    router.init();
    location.hash.length>0 || (location.hash = '/index/start');

    var data = [
        {ti:'偏爱',cnt1:'对所爱的情有独钟<br>被偏爱的有恃无恐<br>这就是我<br>欣赏最精彩的自己',cnt2:'花心摇曳，姿态万千<br>留白式的设计简洁明了<br>配以施华洛水晶<br>迷离中暗藏一番清新雅趣<br>轻盈令人难忘'},
        {ti:'新愿',cnt1:'像回忆一样美好<br>在梦中醒来<br>心里满满都是期许<br>愿里浓浓全是爱意',cnt2:'采用高品质轴承<br>加入转动元素<br>更显灵动与曼妙<br>镂空与块面的组合叠加<br>带出通透感和轻巧'},
        {ti:'挚念',cnt1:'念你热情如火的玫瑰<br>璀璨芳华<br>挚你清水的纯净<br>清香甘甜',cnt2:'宝石镶嵌手法<br>真金双色电镀<br>匠心独具<br>玫瑰金花简洁细腻<br>更符合现代女性对美的追求'},
        {ti:'幸福',cnt1:'代表幸福的三叶草<br>由夏娃带至人间<br>拥有了她便拥有了幸福<br>女王之花，爱与浪漫<br>',cnt2:'华彩璀璨的宝石<br>闪耀着光与影的魅力<br>施华洛水钻与贵金属结合<br>细锆石与真金相衬托<br>释放着恒久不衰的女王光芒'},
        {ti:'绽放',cnt1:'杏花如雨，梨花似云<br>开放着就美丽着<br>拥有着就珍惜着<br>光芒四射，永不凋零<br>',cnt2:'全铜材质，镂空造型<br>白金双色，轻质环保<br>珠宝中最考究的镀色工艺<br>闪亮、通透<br>无不体现奢华的价值感'},
        {ti:'心语',cnt1:'回首彼岸，光景绵长<br>每一场相遇，都是一场美丽<br>走过你的青春，我的盛放<br>优雅安放岁月静好',cnt2:'亚金喷射新亮片<br>更富层次感<br>每一片花瓣缝制一体<br>花之物语，彰显独有气质<br>细腻 含蓄 低调 奢华'},
        {ti:'芳香',cnt1:'于花丛中翩翩起舞<br>散发出淡淡花香<br>优雅与内涵并存<br>你就是我无可替代的女王',cnt2:'施华洛水晶饰布<br>轻便、闪烁，有质感<br>香花与轻纱结合<br>珠缀作装点，柔软而诗意<br>飘荡着浪漫的情怀'},
        {ti:'亲子',cnt1:'2015春夏亲子套装',cnt2:'牵着女儿的小手，重新回到童年<br>荡漾在粉红色的梦里<br>寻找幻想中的水晶花<br>把单纯与童真<br>重新装进生命中'},
        {ti:'亲子',cnt1:'2015春夏亲子套装',cnt2:'那片晶莹剔透<br>是蓝宝石？<br>还是蓝色的海洋？<br>不，那是属于你我的守护星<br>只有我们才看得见的神秘宇宙'},
        {ti:'亲子',cnt1:'2015春夏亲子套装',cnt2:'蝴蝶把你带来<br>像天边忽然架起了一道彩虹<br>蝶翼般的睫毛轻轻扇动<br>我的世界起了飓风<br>迷乱、喜悦、忐忑，但幸福'},
        {ti:'面膜',cnt1:'生物纤维面膜新品上市',cnt2:'夏天又来了，防晒成为重点，晒后修护更是重中之重！流行美4月份隆重上市的生物纤维面膜系列绝对是晒后修护力将，这一系列新品拥有三无'},
        {ti:'原液',cnt1:'7能量原液系列',cnt2:'初夏来袭，干燥、压力，以及众人惶恐的环境污染，我们的肌肤开始暗沉、缺水和没有活力。而流行美4月份重磅面世的7能量原液新品将一扫'}
    ];

    var detailX = 0;

    $('#mn')
        /*.on('mousedown','#detail .ctrl',function(e){
            detailX = e.pageX;
        })
        .on('mouseup','#detail .ctrl',function(e){
            console.log(e.target);
            var $dir = $('#detail .produce');
            var $ti = $('#detail .title span');
            var $cnt = $('#detail .cnt section');
            var num = $dir.data('num');
            if(detailX - e.pageX>0) num > 0 && num++;
            else if(detailX - e.pageX==0){
                if($(e.target).hasClass('left')&&num>0)num--;
                if($(e.target).hasClass('right')&&num<11)num++;
            }else num < 11 && num--;
            $dir.data('num',num);
            $dir.find('img').animate({marginLeft: -20*num + 'rem'},1000);
            $ti.html(data[num].ti);
            $cnt.find('p:eq(0)').html(data[num].cnt1);
            $cnt.find('p:eq(1)').html(data[num].cnt2);
        })*/
        /*.on('click','#detail .ctrl span',function(){
            var $dir = $('#detail .produce');
            var $ti = $('#detail .title span');
            var $cnt = $('#detail .cnt section');
            var num = $dir.data('num');
            //console.log(num);
            if($(this).hasClass('left')&&num>0)num--;
            if($(this).hasClass('right')&&num<11)num++;
            $dir.data('num',num);
            $dir.find('img').animate({marginLeft: -20*num + 'rem'},1000);
            $ti.html(data[num].ti);
            $cnt.find('p:eq(0)').html(data[num].cnt1);
            $cnt.find('p:eq(1)').html(data[num].cnt2);
        })*/
        .on('mousedown','.js-btn-red',function(){
            ajax({
                opType:'getMyLucky'
            },function(req){
                /*params['redWin'] = true;*/
                if(req['errorCode']==1000) location.hash = '/index/nowin'; /*params['redWin'] = false;*/
                else location.hash = '/index/gift';
                /*if(req['isLucky']) location.hash = '/index/close';
                else location.hash = '/index/nowin';*/
                params['leftLuckyDraw'] = req['leftLuckyDraw'];
                params['award_a'] = req['award_a'];
                params['award_b'] = req['award_b'];
            })
        })
        .on('click','.js-form-submit',function(){
            ajax({
                opType:'commitMyInfo',
                userName:$('.js-form-name').val(),
                userPhone:$('.js-form-mobile').val(),
                userAddress:$('.js-form-address').val()
            },function(req){
                $('#sign .tks').show();
            })
        })
        /*.on('click','.js-luck',function(){
            ajax({
                opType:'getMyLucky'
            },function(req){

            });
        })*/
        $('#game .block').drag({
        before: function(e){puzz.before(e);},
        end: function(e) {puzz.end(e);}
        });
    $('#detail .mask,#detail .ctrl').drag({
        before:function(e){detailX = e.pageX},
        process:function(e){
            var num = parseInt($('#detail .produce').data('num'));
            var fontSize = $('html').css('font-size');
            var offX = -20*num+ (e.pageX-detailX)/parseInt(fontSize.substr(0,2));
            //console.log(offX);
            $('#detail .produce img').css('margin-left',offX + 'rem');
        },
        end:function(e){
            var $dir = $('#detail .produce');
            var $ti = $('#detail .title span');
            var $cnt = $('#detail .cnt section');
            var num = parseInt($('#detail .produce').data('num'));
            if(detailX- e.pageX>0){
                console.log('左')
                num<11 && num++;
            }else if(detailX - e.pageX==0){
                var w = document.body.clientWidth/2;
                e.pageX>w
                    ? num < 11 && num++
                    : num > 0  && num--;
            }else{
                console.log('右');
                num>0 && num--;
            }
            $dir.data('num',num);
            $dir.find('img').animate({marginLeft: -20*num + 'rem'},1000);
            $ti.html(data[num].ti);
            $cnt.find('p:eq(0)').html(data[num].cnt1);
            $cnt.find('p:eq(1)').html(data[num].cnt2);
        }
    })
});
//alert(document.body.clientWidth+':'+document.body.clientHeight);
var puzz = {
    index:10,
    puzzData:[],
    outData:[],
    count:0,
    playing:false,
    status:[0,0,0,0,0,0,0,0,0],
    mouseDownPosition:[],
    panel:$('.puzz'),
    ok:[0,0,0,0,0,0,0,0,0],
    init:function(){
        var picNum = Math.ceil(Math.random()*12);
        this.panel.find('.bg').css('backgroundImage','url(./images/pu0'+picNum+'.jpg)');
        $('#game .block').css('backgroundImage','url(./images/pu0'+picNum+'.jpg)');
        this.puzzData = [];
        this.count = 0;
        this.status = [0,0,0,0,0,0,0,0,0];
        this.outData = [];

        var puzz =$('#game .puzz').height(function(){return $(this).width();});
        var w = $('#game .puzz').height()/3;

        $('#game .block').width(w).height(w);
        var offset = puzz.offset();
        for(var i=0;i<9;i++){
            var t = {};
            if(i<3)t['top']=0;
            else if(i<6)t['top']=w;
            else t['top']=2*w;
            if(i%3==0)t['left']=0;
            else if(i%3==1)t['left']=w;
            else t['left']=2*w;
            t['top'] += offset.top;
            t['left']+= offset.left;
            /*$('#game .block.bk'+(i+1)).css(t);*/
            this.puzzData.push(t);
        }
        for(var i=0;i<9;i++){
            var t={};
            t['top'] = Math.ceil(Math.random()*w*2)+offset.top+w*3;
            t['left']= Math.ceil(Math.random()*w*3);
            t['rotate'] = Math.ceil(Math.random()*30);
            $('#game .block.bk'+(i+1)).css(t).css({'-webkit-transform':'rotate('+t['rotate']+'deg)'}).data('index',i);

            this.outData.push(t);
        }
    },
    findBlockPos:function(e){
        var w = this.panel.width()/3;
        var offset = $(e.target).offset();
        var pos = [];
        pos[0] = Math.ceil((e.pageY - this.panel.offset().top)/w);
        pos[1] = Math.ceil((e.pageX - this.panel.offset().left)/w);
        if(pos[0]>0&&pos[0]<4&&pos[1]>0&&pos[1]<4){
            //console.log([pos,pos[0]*3+pos[1]]);
            return pos[0]*3+pos[1]-3;
        }
        return false;
    },
    getSpace:function(ar){
        for(var i=0;i<9;i++)if(ar[i]==0) return i;
    },
    before:function(e){
        var _self = this;
        var target = e.target;
        if($(target).data('in')){
            _self.count--;
            _self.status[parseInt($(target).data('puzz-index'))]=0;
        }
        this.mouseDownPosition = [e.pageX, e.pageY];
        $(e.target).css('z-index',this.index++);
    },
    end:function(e){
        var dataPos = puzz.findBlockPos(e);
        //console.log(['dataPos',dataPos]);
        if(e.pageX==this.mouseDownPosition[0]&& e.pageY==this.mouseDownPosition[1]){
            if($(e.target).data('in')){
                this.blockOut(e.target);
            }else{
                this.blockIn(e.target,this.getSpace(puzz.status));
            }

        }else if(dataPos===false||this.getSpace(puzz.status)==dataPos){//out
            this.blockOut(e.target);
        }else{//in
            //this.blockIn(e.target,this.getSpace(this.status));
            var pos = this.findBlockPos(e)-1;
            if(this.status[pos]){
                this.blockOut(e.target);
            }else{
                this.blockIn(e.target,pos);
            }
        }
    },
    isOK:function(){
        for(var i=0;i<this.ok.length;i++) if(this.ok[i]==0) return false;
        return true;
    },
    blockIn:function(target,pos){
        if(this.playing) return false;
        this.playing = true;
        var _self = this;
        _self.count++;
        _self.status[pos]=1;
        if($(target).hasClass('bk'+(pos+1))) this.ok[pos] = 1;
        else this.ok[pos] = 0;
        //console.log(target,pos);

        $(target).css({'-webkit-transform':'rotate(0deg)'}).data('in',true);
        $(target).animate(this.puzzData[pos],100,function(){

            _self.playing = false;
            console.log(_self.count+':'+_self.isOK())
            if(_self.count>=9 && _self.isOK()){
                $('#game .win').show();
                ajax({opType:'initLuckyDraw'},function(req){
                    params['award_a'] = req['award_a'];
                    params['award_b'] = req['award_b'];
                    params['leftLuckyDraw'] = req['leftLuckyDraw'];
                });
            }
        }).data('puzz-index',pos);

    },
    blockOut:function(target){
        if(!$(target).hasClass('block')) return false;
        if(this.playing) return false;
        this.playing = true
        var _self = this;

        $(target).data('in',false);
        var pos = parseInt($(target).data('index'));
        console.log([target,pos]);
        $(target).animate(this.outData[pos],100,function(){
            $(target).css({'-webkit-transform':'rotate('+puzz.outData[pos]['rotate']+'deg)'})
            _self.playing = false;
        });

    },

}


function ajax(data,fun){
    data['fromOpenid'] = params['fromOpenid'];
    /*alert(JSON.stringify(params));*/
    $.ajax({
        type:'POST',
        url:'/luckyDraw/drawLucky.do',
        data:data,
        dataType:'JSON',
        success:function(req){
            //alert('success:'+JSON.stringify(req));
            if(req['errorCode']==0 || req['errorCode']==1000){
                fun(req);
            }else{
                $('.js-error-msg-cnt').html(req['errorMsg']);
                location.hash = '/index/error';
            }
        },
        error:function(msg){
            //alert('error:'+JSON.stringify(msg));
            $('.js-error-msg-cnt').html('网络故障，请检查手机网络是否正常');
            location.hash = '/index/error';
        }
    });
}

