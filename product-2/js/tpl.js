/**
 * Created by wangyong on 2015/6/30.
 */
var TPL = {
    error:
        '<div class="error" data-url="{{:url}}">\
            <img src="{{:url}}product-2/images/x.png" alt=""/>\
            <p>非常抱歉，{{:resultMes}}</p>\
        </div>',
    hair:
'<div><section>\
    <div class="banner">\
        <div class="pic-slider">\
            <div class="ctrl">\
            {{for hairEffects}}\
                <a href="javascript:;" data-num="{{:#index}}">{{:#index}}</a>\
            {{/for}}\
            </div>\
            <ul>\
            {{for hairEffects}}\
                <li><span class="img_{{:#index+1}}"><img src="{{:#parent.parent.data.url}}{{:savePath}}" alt="{{:mediaName}}"/></span></li>\
            {{/for}}\
            </ul>\
            <a href="javascript:;" class="btn-prev"><</a>\
            <a href="javascript:;" class="btn-next">></a>\
        </div>\
    </div>\
    <h2 class="red"><em>{{:data.hairdoCode}}</em>{{:data.hairdoName}}</h2>\
    {{if hairTypes}}\
    <ul class="detail">\
        <li class="top-line">\
            <span>类型：</span>\
            <p>\
            {{for hairTypes}}\
            <i class="C001">{{:#parent.parent.data.state[labelCode]}}</i>\
            {{/for}}\
            </p>\
        </li>\
        <li>\
            <span>适用人群：</span>\
            <p>{{if data.suitPeoples==0}}<i class="C000">成人</i>{{else}}<i class="C000">儿童</i>{{/if}}</p>\
        </li>\
        <li>\
            <span>适用场合：</span>\
            <p>\
            {{for hairScenes}}\
            <i class="C{{:labelCode}}">{{:labelName}}</i>\
            {{/for}}\
            </p>\
        </li>\
        <li>\
            <span>适合面型：</span>\
            <p>\
            {{for hairFaces}}\
            <i class="C003">{{:#parent.parent.data.state[labelCode]}}</i>\
            {{/for}}\
            </p>\
        </li>\
        <li class="bt-none">\
            <span>适合发长：</span>\
            <p>\
            {{for hairLongs}}\
                <i class="C004">{{:#parent.parent.data.state[labelCode]}}</i>\
            {{/for}}\
            </p>\
        </li>\
        {{if data.hairdoDesc}}\
        <li class="top-line bt-none">\
            <span>发型描述：</span>\
            <p>{{:data.hairdoDesc}}</p>\
        </li>\
        {{/if}}\
    </ul>\
    {{/if}}\
    <h2>发型效果图</h2>\
    <ul class="pic-2 js-pic">\
    {{for hairEffects}}\
        {{if #index%2==1}}<li class="l"><p>{{:mediaName}}<em>{{:mediaCode}}</em></p></li>{{/if}}\
        <li><img data-src="{{:#parent.parent.data.url}}{{:savePath}}" src="{{:#parent.parent.data.url}}{{:savePath}}" alt="{{:mediaName}}"></li>\
        {{if #index%2==0}}\
        <li class="r"><p>{{:mediaName}}<em>{{:mediaCode}}</em></p></li>\
        {{/if}}\
    {{/for}}\
    </ul>\
    {{if hairDetails}}\
    <h2>细节图</h2>\
    <ul class="pic-list js-pic">\
        {{for hairDetails}}\
        <li>\
        <img data-src="{{:#parent.parent.data.url}}{{:savePath}}" src="{{:#parent.parent.data.url}}{{:savePath}}" alt="{{:mediaName}} {{:mediaDetailDesc}}" />\
        <p>{{:mediaDetailDesc}}</p>\
        </li>\
        {{/for}}\
    </ul>\
    <h2>盘发教学</h2>\
    <ul class="pic-list js-pic">\
        {{for hairSteps}}\
            <li>{{:stepContent}}</li>\
        {{/for}}\
    </ul>\
    {{/if}}\
    {{if data.vedioTeachPath}}\
    <h2>盘发教学视频</h2>\
    <iframe class="flash" src="{{:data.vedioTeachPath}}" frameborder=0 allowfullscreen></iframe>\
    {{/if}}\
    {{if relProducts}}\
    <h2>推荐发饰</h2>\
    <ul class="pic-3 js-pic">\
    {{for relProducts}}\
        <li>\
        <!--<img src="" alt="" class="bd"/>\
        <p>边夹<em>x2</em></p>-->\
            <img data-src="{{:#parent.parent.data.url}}{{:ext1}}" src="{{:#parent.parent.data.url}}{{:ext1}}" alt="{{:productName}}"/>\
            <p>\
            <span>{{:productName}}</span>\
            ￥{{:price}}\
            <!--<a href="#"><i class="red">详细信息</i></a>-->\
            </p>\
        </li>\
    {{/for}}\
    </ul>\
    {{/if}}\
</section></div>',
    prod:
'<div><section>\
    <div class="color-list" id="color-list-1">\
        <div class="full">\
            {{for goodsSkuInfos}}<img src="{{:#parent.parent.data.url}}{{:picPath}}" alt=""/>{{/for}}\
        </div>\
        <ul class="color-ctrl ctrl" data-id="color-list-1">\
        {{for goodsSkuInfos}}<li class="bdc{{:colorType}}{{if #index==0}} cur{{/if}}"><img src="{{:#parent.parent.data.url}}{{:picPath}}" alt=""/></li>{{/for}}\
        </ul>\
    </div>\
    <h2 class="red"><em>{{:productInfo.productOutCode}}</em>{{:productInfo.productName}}</h2>\
    <ul class="detail">\
        <li class="top-line">\
            <span>产品类型：</span>\
            <p><em>{{:cateName}}</em></p>\
        </li>\
        <li>\
            <span>材质：</span>\
            <p><em>{{:mater[productInfo.materialTypeId]}}</em></p>\
        </li>\
        <li>\
            <span>工艺：</span>\
            <p><em>{{:productInfo.technics}}</em></p>\
        </li>\
        <li>\
            <span>可选颜色：</span>\
            <p class="color-ctrl" data-id="color-list-1">\
            {{for goodsSkuInfos}}\
            <q class="bgc{{:colorType}}"><em></em></q>\
            {{/for}}\
            </p>\
        </li>\
        <li>\
            <span>单价：</span>\
            <p>￥{{:productInfo.price}}</p>\
        </li>\
        <li>\
            <span>适用人群：</span>\
            <p>{{if productInfo.ext3=="0"}}<i class="C000">成人</i>{{else}}<i class="C000">儿童</i>{{/if}}</p>\
        </li>\
        <li>\
            <span>适用场合：</span>\
            <p>\
            {{for prodScenes}}\
            <i class="C{{:labelCode}}">{{:labelName}}</i>\
            {{/for}}\
            </p>\
        </li>\
        <li>\
            <span>系列主题：</span>\
            <p>{{:schemaName}}</p>\
        </li>\
        <li>\
            <span>主题故事：</span>\
            <span class="more">+</span>\
            <div class="m">{{:schemaName}}...</div>\
            <div class="m more">{{:schemaName}}<br>{{:schemaStory}}</div>\
        </li>\
        <li>\
            <span>产品描述：</span>\
            {{if productInfo.story}}\
            {{if productInfo.storyShort}}\
            <span class="more">+</span>\
            <div class="m">{{:productInfo.storyShort}}...</div>\
            <div class="m more">{{:productInfo.story}}</div>\
            {{else}}\
                <div class="m">{{:productInfo.story}}</div>\
            {{/if}}\
            {{/if}}\
        </li>\
        <li class="bt-none">\
            <span>上市时间：</span>\
            <p>{{:productInfo.saleDate}}</p>\
        </li>\
    </ul>\
    <h2>发饰图片</h2>\
    <ul class="pic-list js-pic">\
    {{for prodEffects}}\
        <li><img data-src="{{:#parent.parent.data.url}}{{:savePath}}" src="{{:#parent.parent.data.url}}{{:savePath}}" alt="{{:mediaName}}"/></li>\
    {{/for}}\
    </ul>\
    {{if prodDetails}}\
    <h2>细节图片</h2>\
    <ul class="pic-list js-pic">\
    {{for prodDetails}}\
        <li><img data-src="{{:#parent.parent.data.url}}{{:savePath}}" src="{{:#parent.parent.data.url}}{{:savePath}}" alt="{{:mediaName}}"/></li>\
    {{/for}}\
    </ul>\
    {{/if}}\
    <h2>发饰模特图</h2>\
    <ul class="pic-list js-pic">\
    {{for prodModels}}\
        <li><img data-src="{{:#parent.parent.data.url}}{{:savePath}}" src="{{:#parent.parent.data.url}}{{:savePath}}" alt="{{:mediaName}}"/></li>\
    {{/for}}\
    </ul>\
    {{if relHairs}}\
    <h2>建议匹配发型</h2>\
    <ul class="pic-3 js-pic" data="{{:url}}">\
    {{for relHairs}}\
        <li>\
            <img data-src="{{:#parent.parent.data.url}}{{:mainPic}}" src="{{:#parent.parent.data.url}}{{:mainPic}}" alt="{{:hairdoName}} {{:hairdoCode}}"/>\
            <p><span>{{:hairdoName}}<br>{{:hairdoCode}}</span></p>\
        </li>\
    {{/for}}\
    </ul>\
    {{/if}}\
</section></div>'
}