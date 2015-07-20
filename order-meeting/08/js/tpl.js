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
        '<li>\
            <img src="{{:#parent.parent.data.baseUrl}}/images/icon-ava.png" alt=""/>\
            {{:name}}-{{:area}}\
            {{if #parent.parent.data.hasVoteNum>0}}\
            <span>\
                投票\
                <img src="{{:#parent.parent.data.baseUrl}}images/icon-vot.png" alt=""/>\
            </span>\
            {{else}}\
            <span>\
                {{:vote}}票\
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
                <h2>您已签到，但填写的资料匹配有误，请寻找现场工作人员办理相关手续。</h2>\
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
    homePage:
        '<div class="homepage">\
            <a href="javascript:;" class="back">《</a>\
            <img src="{{:baseUrl}}{{:src}}" alt=""/>\
            <span class="vote"><img src="{{:baseUrl}}images/icon-vote.png" alt=""/>{{:vote}}</span>\
            <span class="name"><img src="{{:baseUrl}}images/icon-ava.png" alt=""/>{{:name}}</span>\
        </div>'
};
$.templates(TPL);