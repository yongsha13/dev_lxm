/**
 * Created by wangyong on 2015/7/9.
 */
$.views.helpers({
    "debug":function(str){
        console.log(str);
    }
});
var TPL = {
    header:'<h1>{{:title}}</h1>',
    li:
        '<li class="s{{:#index+1}}">\
            <a href="{{:url}}">\
                <img src="{{:#parent.parent.data.baseUrl}}{{:src}}" alt="{{:name}}"/>\
                {{if name}}\
                <span>\
                {{:name}}\
                {{if vote}}<i>☆{{:vote}}</i>{{/if}}\
                </span>\
                {{/if}}\
            </a>\
        </li>',
    start:
    '<div class="start">\
        <section>\
        <img src="{{:baseUrl}}images/start-ti.png" alt="我们.show出流行美"/>\
        </section>\
        <ul>\
        {{for list tmpl="li"/}}\
        </ul>\
    </div>',
    game:
        '<div class="game">\
            {{include tmpl="header"/}}\
            <a class="rule" href="#/index/rule">活动规则</a>\
            <div class="box">\
                <ul>\
                {{for list tmpl="li"/}}\
                    <a href="#" class="start">开始翻牌</a>\
                </ul>\
            </div>\
        </div>',
    rule:
        '<div class="rule">\
        {{include tmpl="header"/}}\
            <section>\
                <label>活动名称：</label> Show出流行美\
            </section>\
            <section>\
                <label>活动时间：</label> 7月25日-8月9日\
            </section>\
            <section>\
                <label>活动规则：</label><br>\
                我们&middot;Show出流行美真人秀，礼品免费送。顾客做造型，和店员一起拍照并上传，参与集攒活动。顾客与店员合照的点赞数量符合以下排名，即有机会赢取流行美定制项链。\
                <table>\
                <thead>\
                <tr>\
                <td rowspan="2">地区</td>\
                <td colspan="3">点赞数量排名</td>\
                </tr>\
                <tr>\
                <td>第一波<br>(7月30日)</td>\
                <td>第二波<br>(8月4日)</td>\
                <td>第三波<br>(8月9日)</td>\
                </tr>\
                </thead>\
                <tbody>\
                {{for list}}\
                    <tr><th>{{:area}}</th><td>前{{:fst}}名</td><td>前{{:sec}}名</td><td>前{{:thd}}名</td></tr>\
                {{/for}}\
                </tbody>\
                </table>\
                凡参与者可当场获得<strong>经典面膜一份。</strong>\
            </section>\
            <section>\
            在众多合照中，流行美专家将评比出“风采组合”，参与者与店员将获得终极大奖——<strong>价值3000元iPad Mini3一台。</strong><br>\
            <img src="./images/necklace.png" alt=""/><img src="./images/ipad-mini3.png" alt=""/><br>\
            <strong>2400对流行美专属定制项链，<br>80部iPad Mini3等你拿！</strong><br>\
            你敢秀，我就送！<br>\
            美丽不NG，Show出流行美！\
            </section>\
            <section>\
            <label>PS:</label><br>\
            1.每位参与者只能享受一次获礼机会，如重复出现在中奖排名中，将由下一名未中奖用户获奖。<br>\
            2.每位店员可与多位顾客参与活动，但店员只能享受一次获礼机会。\
            </section>\
        </div>',
    prodCate:
        '<div class="prod-cat">\
            {{include tmpl="header"/}}\
            <ul>\
            {{for list tmpl="li"/}}\
            </ul>\
        </div>',
    prodList:
        '<div class="prod-list">\
        {{include tmpl="header"/}}\
        <ul>\
        {{for list tmpl="li"/}}\
        </ul>\
        </div>',
    'homepage':
    '<div class="homepage">\
    {{include tmpl="header"/}}\
    <section>\
        <div class="info">\
            大区：华东{{:title}}\
            编号：1314\
            <a href="#" class="top">排行榜</a>\
        </div>\
        <img src="./images/photo-1.jpg" alt=""/>\
        <div class="vote">\
            <span class="like">230</span>\
            <span class="star">100</span>\
            <a href="#" class="red">我要参加</a>\
            <a href="#" class="red">返回首页</a>\
        </div>\
    </section>\
    </div>',
    discount:
        '<div class="discount">\
            {{include tmpl="header"/}}\
            <section>\
                <img src="{{:baseUrl}}images/discount-banner.jpg" alt=""/>\
                <p>活动期间，购买流行美产品，<br>消费满一定金额即可获赠精美礼品一份。<br>（消费金额不累计）</p>\
                <ul>\
                {{for list tmpl="li"/}}\
                </ul>\
            </section>\
        </div>'
};
$.templates(TPL);