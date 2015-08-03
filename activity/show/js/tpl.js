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
    topLi:
        '<li>\
            <a href="userInfo.jsp?id={{:openId}}">\
                <img src="{{:src}}" alt="{{:name}}"/>\
                <span class="praise">{{:praise}}</span><span class="sort">{{:sort}}</span>\
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
    show:
        '<div class="show">\
            <section>\
                <img src="{{:baseUrl}}images/start-ti.png" alt="我们.show出流行美"/>\
            </section>\
            <ul>\
                {{for list tmpl="li"/}}\
            </ul>\
            <a href="userInfoList.html" class="btn violet">参赛图片</a>\
            <a href="#/index/rule" class="btn red">活动规则</a>\
        </div>',
    preview:
        '<div class="preview">\
            {{include tmpl="header"/}}\
            <section>\
                <img src="{{:localId}}" alt=""/>\
                <div class="btn red">上传</div>\
            </section>\
        </div>',
    showAddress:
        '<div class="game-address show-address">\
            {{include tmpl="header"/}}\
            <form>\
                <ul>\
                    <li>\
                    <p><label for="name">所属大区:</label>\
                    <select id="areaId">\
                        {{for opList tmpl="topListOp"/}}\
                    </select>\
                    </li>\
                    <li>\
                    <p><label for="name">用户姓名:</label>\
                    <input type="text" id="name"/></p>\
                    </li>\
                    <li>\
                    <p><label for="phone">用户手机:</label>\
                    <input type="text" id="phone"/></p>\
                    </li>\
                    <li>\
                    <p><label for="address">联系地址:</label>\
                    <textarea id="address"></textarea></p>\
                    </li>\
                    <li>\
                    <p><label for="shopName">店员姓名:</label>\
                    <input type="text" id="shopName"/></p>\
                    </li>\
                    <li>\
                    <p><label for="shopPhone">店员手机:</label>\
                    <input type="text" id="shopPhone"/></p>\
                    </li>\
                    <a href="#" class="btn red js-show-address-btn" style="margin-top: 20px;">保存</a>\
                </ul>\
            </form>\
        </div>',
    game:
        '<div class="game">\
            {{include tmpl="header"/}}\
            <div class="box">\
                <p class="ready">正在准备游戏，请稍后...</p>\
            </div>\
            <div class="tips" style="display: none;">\
                <img src="{{:baseUrl}}images/game-tips.png" alt=""/>\
            </div>\
        </div>',
    gamePoke:
        '<ul style="display: none;">\
            {{for list tmpl="li"/}}\
            <a href="#/index/rule" class="start">活动规则</a>\
        </ul>',
    gamePrize:
        '<div class="game-prize">\
            {{include tmpl="header"/}}\
            <section>\
            <p>\
            恭喜您中奖了！<br>\
            <span class="ti">您获得{{:title}}{{:prizeName}}</span><br>\
            <img src="{{:baseUrl}}{{:src}}" alt=""/><br>\
            您还获得：<br>\
            <span class="txt">盘发券或妆容卷及经典面膜一张</span>\
            <a href="#/index/menu" class="btn violet">我的卡包</a>\
            <a href="#/index/address" class="btn red">填写收件地址</a>\
            </p>\
            </section>\
        </div>',
    gamePrizeNone:
        '<div class="game-prize">\
            {{include tmpl="header"/}}\
            <section>\
            <p>\
            恭喜您获得参与奖<br>\
            <span class="ti">免费盘发/妆容券一张和经典面膜一份</span><br>\
            <span class="explain">（请在店员指引下点击“我要兑换”）</span><br>\
            <img src="{{:baseUrl}}/images/spoil-0.jpg" alt=""/><br>\
            您还剩下<strong>{{:times}}次</strong>机会<br>\
            <span class="explain">每拉动一位好友参加游戏，即可增加一次翻牌机会。</span>\
            <ul>\
                {{for list tmpl="li"/}}\
            </ul>\
            {{if prizeTimes>0}}<a href="#/index/game" class="btn red">继续翻牌</a>{{/if}}\
            </p>\
            </section>\
        </div>',
    gameAddress:
        '<div class="game-address">\
            {{include tmpl="header"/}}\
            <form>\
                <ul>\
                    <li>\
                    <p><label for="name">收货人:</label>\
                    <input type="text" id="name"/></p>\
                    </li>\
                    <li>\
                    <p><label for="phone">手机号码:</label>\
                    <input type="text" id="phone"/></p>\
                    </li>\
                    <li>\
                    <p><label for="address">收货地址:</label>\
                    <textarea id="address"></textarea></p>\
                    </li>\
                    <a href="#" class="btn red js-game-address-btn" style="margin-top: 20px;">保存</a>\
                </ul>\
            </form>\
        </div>',
    gameAddressSuccess:
        '<div class="game-address">\
            {{include tmpl="header"/}}\
            <section>\
            <p><strong>亲，您的收货地址提交成功。</strong></p>\
            <p>中奖名单将于8月14日公布在流行美玫瑰会所官方微信公众号以及@流行美官方微博平台，并且同时送出中奖礼品。</p>\
            <p>敬请留意。</p>\
            <p class="box">\
            <strong>温馨提示：</strong><br>\
            马上拉动好友参与活动。每拉动一位好友即增加一次翻牌机会。\
            </p>\
            <a href="#/index/start" class="btn red">返回首页</a>\
            </section>\
        </div>',
    rule:
        '<div class="rule">\
        {{include tmpl="header"/}}\
            <section>\
                <label>活动名称 :</label> Show出流行美\
            </section>\
            <section>\
                <label>活动时间 :</label> 7月29日9:00-8月10日24:00\
            </section>\
            <section>\
                <label>活动规则 :</label>\
                我们&middot;Show出流行美真人秀，礼品免费送。顾客做造型，和店员一起拍照并上传，参与集赞活动。顾客与店员合照的点赞数量符合以下排名，即有机会赢取流行美定制项链。\
                <table>\
                <thead>\
                <tr>\
                <td rowspan="2">地区</td>\
                <td colspan="3" style="padding: 10px 0; font-size: 16px;">点赞数量排名</td>\
                </tr>\
                <tr>\
                <td>第一波<br><span style="font-size: 12px;">(8月2日)</span></td>\
                <td>第二波<br><span style="font-size: 12px;">(8月6日)</span></td>\
                <td>第三波<br><span style="font-size: 12px;">(8月11日)</span></td>\
                </tr>\
                </thead>\
                <tbody>\
                {{for list}}\
                    <tr><th>{{:area}}</th><td style="text-align: left; text-indent: 1em;">{{:fst}}名</td><td style="text-align: left; text-indent: 1em;">{{:sec}}名</td><td style="text-align: left; text-indent: 1em;">{{:thd}}名</td></tr>\
                {{/for}}\
                </tbody>\
                </table>\
                凡参与者可当场获得<strong style="padding: 0 5px; font-size: 16px;">经典面膜一份。</strong>\
            </section>\
            <section>\
            <p style="font-size: 14px; line-height: 1.2;">在众多合照中，流行美专家将评比出"风采组合",参与者与店员将获得终极大奖——<strong style="padding: 0 5px; font-size: 16px;">价值3000元iPad Mini3一台。</strong></p>\
            <p style="padding: 15px 0;"><img src="./images/necklace.png" alt=""/><img src="./images/ipad-mini3.png" alt=""/></p>\
            <p style="font-size: 14px; line-height: 1.2;"><strong>2400对流行美专属定制项链,<br>80部iPad Mini3等你拿！</strong></p>\
            <p style="padding-top: 10px;font-size: 14px; line-height: 1.2;">你敢秀，我就送！</p>\
            <p style="font-size: 14px; line-height: 1.2;"> 美丽不NG，Show出流行美！</p>\
            </section>\
            <section style="padding-top: 30px;padding-bottom: 30px;">\
            <label style="color: red;">注意事项:</label>\
            <p style="padding-top: 5px;font-size: 14px; line-height: 1.2;">1.每位参与者只能享受一次获礼机会，如重复出现在中奖排名中，将由下一名未中奖用户获奖。</p>\
            <p style="padding-top: 10px;font-size: 14px; line-height: 1.2;">2.每位店员可与多位顾客参与活动，但店员只能享受一次获礼机会。</p>\
            </section>\
        </div>',
    menu:
        '<div class="menu">\
            <section>\
                <a href="javascript:;" class="btn violet">我的优惠券</a>\
                {{if ticketNum==0}}\
                <p class="violet"><span>你有<em>0</em>张优惠券</span></p>\
                {{else}}\
                <p class="img"><img src="{{:baseUrl}}images/spoil-0.jpg" alt=""/></p>\
                {{/if}}\
                <a href="javascript:;" class="btn red">我的抽奖机会</a>\
                <p class="red"><span>你有<em>0</em>次抽奖机会</span><br>点击右上角分享给好友，赢取更多抽奖机会吧！</p>\
                <!--<a href="javascript:;" class="btn violet js-share">分享到朋友圈</a>-->\
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
    'topList':
        '<div class="top-list">\
            {{include tmpl="header"/}}\
            <div class="top">\
            大区：\
            <select name="area" id="area">\
                {{for opList tmpl="topListOp"/}}\
            </select>\
            <a href="index.jsp#/index/show" class="btn red">我要参加</a>\
            </div>\
            <ul>\
                {{if isLoading}}\
                <p>正在加载数据，请稍候...</p>\
                {{else}}\
                {{include tmpl="topListUl"/}}\
                {{/if}}\
            </ul>\
        </div>',
    'topListOp':
        '<option value="{{:#index}}" {{if #parent.parent.data.areaId==#index}} selected ="true"{{/if}}>{{:#data}}</option>',
    'topListUl':
        '{{for list tmpl="topLi"/}}\
        {{if isListEnd}}\
        <li class="none">没有更多数据啦！</li>\
        {{else}}\
        <li class="more">查看更多</li>\
        {{/if}}',
    'homepage':
    '<div class="homepage">\
    {{include tmpl="header"/}}\
    <section>\
        <div class="info">\
            大区：{{:area}}\
            编号：{{:photoId}}\
            <a href="#/index/top-list" class="btn violet">排行榜</a>\
        </div>\
        <img src="{{:src}}" alt=""/>\
        <div class="vote">\
            <span class="praise">{{:praise}}</span>\
            <span class="sort">{{:sort}}</span>\
            <a href="#/index/show" class="btn red">我要参加</a>\
            <a href="javascript:;" class="btn red js-vote">投票</a>\
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
                <p class="tips">\
                数量有限，先到先得，送完即止，马上行动！欲拿更多好礼，赶紧参加“翻牌有奖”、“SHOW出流行美”有奖活动！\
                </p>\
                <p class="explain">活动最终解释权归流行美所有</p>\
            </section>\
        </div>'
};
$.templates(TPL);