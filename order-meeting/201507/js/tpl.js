/**
 * Created by wangyong on 2015/7/9.
 */
$.views.helpers({
    "debug":function(str){
        console.log(str);
    }
});
var TPL = {
    li:
        '<li><a href="{{:link}}">{{:name}}</a></li>',
    liImg:
        '<li><a href="{{:link}}"><img src="{{:src}}" alt=""/><span>{{:name}}</span></a></li>',
    liTop:
        '<li data-id="{{:activityUserId}}">\
            <img src="{{:#parent.parent.data.baseUrl}}/images/icon-ava.png" alt=""/>\
            {{if userName}}{{:userName}}-{{:areaName}}{{else}}{{:areaName}}{{/if}}\
            {{if canVote=="1"&&#parent.parent.data.hasVoteNum>0}}\
            <span class="js-vote">\
                投票\
                <img src="{{:#parent.parent.data.baseUrl}}images/icon-vot.png" alt=""/>\
            </span>\
            {{else}}\
            <span>\
                {{:counter}}票\
                <img src="{{:#parent.parent.data.baseUrl}}images/icon-vote.png" alt=""/>\
            </span>\
            {{/if}}\
        </li>',
    liTopList:
        '{{for list tmpl="liTop"/}}',
    start:
        '<div class="start">\
            <section>\
            <img src="{{:baseUrl}}images/start-banner.png" alt="玫瑰时光"/>\
            <ul>\
                {{for list tmpl="li"/}}\
            </ul>\
            </section>\
        </div>',
    show:
        '<div class="show">\
            <a href="javascript:;" class="back">《</a>\
            <section>\
            <ul>\
                {{for list tmpl="liImg"/}}\
            </ul>\
            </section>\
        </div>',
    preview:
        '<div class="preview">\
            <a href="javascript:;" class="back">《</a>\
            <img src="{{:img}}" alt=""/>\
            <a href="javascript:;" class="btn red">确定上传</a>\
        </div>',
    showSuccess:
        '<div class="show success">\
            <section>\
                <img src="{{:baseUrl}}images/success.png" alt=""/>\
                <p>您的图片已经上传成功，<br>可以参与我们的抽奖活动！</p>\
            </section>\
        </div>',
    sign:
        '<div class="sign">\
            <section>\
            <img src="{{:baseUrl}}images/start-banner.png" alt=""/>\
            <h2>请仔细填写以下内容</h2>\
            <div class="item">\
                <img src="{{:baseUrl}}images/icon-ava.png" alt=""/>\
                <label for="name">姓名</label>\
                <input type="text" id="name"/>\
            </div>\
            <div class="item">\
                <img src="{{:baseUrl}}images/icon-tel.png" alt=""/>\
                <label for="phone">手机</label>\
                <input type="text" id="phone"/>\
            </div>\
            <div class="item w">\
                <img src="{{:baseUrl}}images/icon-pos.png" alt=""/>\
                <label>区域</label>\
                <div class="box">\
                    <span>华东</span>\
                    <span>华中</span>\
                    <span class="cur">华南</span>\
                    <span>华北</span>\
                    <span>西北</span>\
                    <span>西南</span>\
                    <span>川渝</span>\
                </div>\
            </div>\
            <div class="item error"></div>\
            <a href="javascript:;" class="btn"><img src="{{:baseUrl}}/images/success.png" alt=""/>确认签到</a>\
            </section>\
        </div>',
    signSuccess:
        '<div class="sign success">\
            <section>\
                <img src="{{:baseUrl}}images/success.png" alt=""/>\
                <h2>尊敬的加盟商，您已经签到成功。</h2>\
                {{if num}}房间号：{{:num}}{{/if}}\
                <img src="{{:baseUrl}}images/back-ava.png" alt="" class="icon"/>\
                <p>{{:name}}</p>\
                <img src="{{:backUrl}}images/back-tel.png" alt="" class="icon"/>\
                <p>{{:phone}}</p>\
                <img src="{{:backUrl}}images/back-pos.png" alt="" class="icon"/>\
                <p>{{:area}}</p>\
            </section>\
        </div>',
    signError:
        '<div class="sign success">\
            <section>\
                <img src="{{:baseUrl}}images/sign-error.png" alt=""/>\
                <h2>尊敬的加盟商，您已签到成功，请找工作人员为您办理相关手续。</h2>\
                {{if num}}房间号：{{:num}}{{/if}}\
                <img src="{{:baseUrl}}images/back-ava.png" alt="" class="icon"/>\
                <p>{{:name}}</p>\
                <img src="{{:backUrl}}images/back-tel.png" alt="" class="icon"/>\
                <p>{{:phone}}</p>\
                <img src="{{:backUrl}}images/back-pos.png" alt="" class="icon"/>\
                <p>{{:area}}</p>\
            </section>\
        </div>',
    topList:
        '<div class="top-list">\
            <section>\
                <h2>{{:title}}</h2>\
                <ul>{{include tmpl="liTopList"/}}</ul>\
            </section>\
        </div>',
    homepage:
        '<div class="homepage">\
            <a href="javascript:;" class="back">《</a>\
            <img src="{{:baseUrl}}{{:src}}" alt=""/>\
            <span class="vote"><img src="{{:baseUrl}}images/icon-vote.png" alt=""/> {{:vote}}</span>\
            <span class="name"><img src="{{:baseUrl}}images/icon-ava.png" alt=""/> {{:name}}</span>\
            <a href="javascript:;" class="btn red">投票</a>\
        </div>',
    voteError:
        '<div class="sign success">\
        <section>\
                <img src="{{:baseUrl}}images/vote-error.png" alt=""/>\
                <h2>优胜团队正在评选中，<br>请耐心等候！</h2>\
                <br><br><br><br><br><br><br>\
                <a href="#">\
                <img src="{{:backUrl}}images/back-bak.png" alt="" class="icon"/>\
                <p>返回</p>\
                </a>\
            </section>\
        </div>',
    shake:
        '<div class="shake">\
            <section>\
                <h2><em>摇一摇</em></h2>\
                <p>用力摇一摇，赢取机会上台参与互动游戏！<br>开始时间请关注大屏幕！</p>\
                <a href="#/index/shake-game" class="btn red">开始游戏</a>\
                <h2><em>游戏规则</em></h2>\
                <p>游戏时间：<br>2015年7月28日晚上</p>\
                <p>参与方式：<br>主持人宣布游戏开始后，按下“开始游戏”按键，用力摇晃您的手机，系统将自动抽取幸运观众上台互动！</p>\
            </section>\
        </div>',
    shakeGame:
        '<div class="shake">\
            <section>\
                <audio id="audioShake"><source src="{{:baseUrl}}images/551.mp3" type="audio/mp3"/></audio>\
                <img src="{{:baseUrl}}images/shake.jpg" alt=""/>\
                <div class="banner">\
                    <div class="em"></div>\
                </div>\
            </section>\
        </div>',
    shakeSuccess:
        '<div class="shake">\
            <section>\
                \
                <p><img style="width: 6rem;" src="{{:baseUrl}}images/vote-error.png" alt=""/><br>游戏已经结束，<br>游戏结果将在大屏显示。</p>\
            </section>\
        </div>'
};
$.templates(TPL);