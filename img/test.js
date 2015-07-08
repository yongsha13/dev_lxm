/**
 * Created by wangyong on 2015/6/26.
 */



var obj_1 = {
    'name':'obj-1',
    'fun':function(){alert(1)}
};

function Class_2(name){
    this.name = name;
}
Class_2.prototype.fun = function(){alert(2)}
var obj_2 = new Class_2('obj-2');

function Class_3(name){
    var reObj = new Object();
    reObj.name = name;
    reObj.fun = function(){alert(3)};
    return reObj;
}
var obj_3 = new Class_3('obj-3');

function Class_3_1(name){
    var reObj = new Class_3(name);
    reObj.fun_1 = function(){alert(31)}
}
var obj_3_1 = new Class_3_1('obj-3-1');

var Class_4 = new Function('this.name = "obj-4";this.fun = function(r){alert(4)}');
var obj_4 = new Class_4();
/**
 * 第一种方法常用于独立性的活动开发，临时性的功能开发等，运用起来相对灵活，结构简易，格式清晰，
 * 但不太适合大型项目的开发，其利用性差，容易出现隐藏性的指针指向混乱等问题
 * 第二种方法结构严谨，扩展起来也非常灵活，是大型项目开发的首推方案
 * 第三种方法是一种工厂模型的设计思路，结构更为严格，定义了一个类之后，轻易不能进行修改，但可以
 * 通过继承类的形式进行逐级扩展,比如obj_3_1这样的扩展方法。主要用于超大型的项目
 * 第四种方法是一种需要非常灵活的应用，其对象需要用数据库进行存储时，使用该方案最为合适。
 * */

/**
 * 前端使用本地存储购物车的数据，如果用户为登录状态，则在登录和添加购物车时，把本地数据与服务器
 * 端mongodb数据进行同步。未登录时，添加或者删除商品时，把订单数据发到服务器，服务器返回计算结果，
 * 服务器端不进行数据存储。
 * 可以用angular的指令来实现库存是否够用的状态，对订单数量进行双向绑定
 * */

    /*order:订单处理的angular服务*/
var ShoppingCart = ['$scope','$http','order',function($scope,$http,order){
    $scope.cart = {
        orderList:order.list,
        up:function(orderId){},
        down:function(orderId){},
        to:function(orderId){}
    }
    $http({
        method:'POST',
        url:'order.jsp',
        data:{orderList:order.list}//提交本地订单信息
    }).success(function(req){
        order.update(req.list);//更新本地订单信息
    });
}];
/**具体的文件结构和流程需要根据项目需要，配合后端开发再考虑*/

/**
 * 团队一直都使用的SVN，因为公司业务的需要，使用的流程是：开发环境->QA测试->+1测试（跟现网共数据库）->现网
 * 我们这边有一个上线系统在跑，上线系统我们开发人员是负责更新代码，代码上线由测试人员操作上线.
 * 总体上来说，这一套流程的规范还算可以。目前正在考虑使用git，需要上线系统进行升级
 * */

/**
 * 盒子模型是使用DIV+CSS排版引入的一个概念，主要是让具有独立性的展示信息，用盒子进行封装，可以在多个地方使用
 * 提高代码的复用性及后续维护的简易性，盒子之间具有较强的独立性，适合团队共同开发维护。
 * 块级元素主要用于总体布局和建立盒子模型。行内元素主要用于盒子内的元素展示。
 * */

/**
 * 需要考虑到cdn服务器的配置状态，如果cdn服务器跟后端开发有配合做打包压缩，可以减免前端开发后做打包压缩的处理
 * 过程，这是最优的解决方案。如果没有，前端需要对css和js代码进行打包压缩，再上线发布。编码的时候，最好注意js
 * 部分文件内容前后的分号，以免打包工具没有自动加分号而出错等。目前我们使用的上线系统+combo打包压缩，上线系统
 * 会自动同步所有的cdn服务器前端代码
 * */

/**
 * 渐进增强为，先进行最基本的排版开发，满足不同设备最大的兼容性，然后对高版本的设备进行用户体验优化操作。
 * 优雅降级为，先做到高版本设备的最优用户体验，再去做低版本设备的兼容性，让低版本设备可以完成最基本的使用功能。
 * */

/**
 * 有使用过grunt进行前端资源的打包压缩，gulp和protractor没有使用过，不熟悉。
 * */