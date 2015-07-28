/**
 * Created by wangyong on 14-10-28.
 */

/**
 * 判断是否为数组
 * @param obj
 * @returns {boolean}
 */
;var isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

if (!Array.prototype.filter) {
    /**
     * 过滤数组中的元素
     *
     * @param fun
     * @returns {Array}
     */
    Array.prototype.filter = function(fun /*, thisp*/){
        var len = this.length;

        if (typeof fun == "function"){
            var res = new Array();
            var thisp = arguments[1];
            for (var i = 0; i < len; i++){
                if (i in this){
                    var val = this[i]; // in case fun mutates this
                    if (fun.call(thisp, val, i, this)) {
                        res.push(val);
                    }
                }
            }
            return res;
        }else{
            /*console.log([this,fun]);
            return null;*/
            //throw new TypeError();
        }

    };
};
/* ie不支持placeholder兼容处理 */
function toPlaceHolder(){
    if (!isPlaceholder()) {//不支持placeholder 用jquery来完成
        $(document).ready(function() {
            if(!isPlaceholder()){
                $("input,textarea").not("input[type='password']").each(//把input绑定事件 排除password框
                    function(){
                        if($(this).val()=="" && $(this).attr("placeholder")!=""){
                            $(this).val($(this).attr("placeholder"));
                            $(this).focus(function(){
                                if($(this).val()==$(this).attr("placeholder")) $(this).val("");
                            });
                            $(this).blur(function(){
                                if($(this).val()=="") $(this).val($(this).attr("placeholder"));
                            });
                        }
                    });
                //对password框的特殊处理1.创建一个text框 2获取焦点和失去焦点的时候切换
                var pwdField = $("input[type=password]");
                var pwdVal = pwdField.attr('placeholder');
                if($('.pwdPlaceholder').length==0){
                    pwdField.after('<input class="pwdPlaceholder" type="text" name="password" data-link="password" value='+pwdVal+' '+'placeholder='+pwdVal+' />');
                }
                var pwdPlaceholder = $('.pwdPlaceholder');
                pwdPlaceholder.show();
                pwdField.hide();

                pwdPlaceholder.focus(function(){
                    pwdPlaceholder.hide();
                    pwdField.show();
                    pwdField.focus();
                });

                pwdField.blur(function(){
                    if(pwdField.val() == '') {
                        pwdPlaceholder.show();
                        pwdField.hide();
                    }
                });

            }
        });

    }
}
function isPlaceholder(){
    var input = document.createElement('input');
    return 'placeholder' in input;
}




if(!Array.prototype.inArray){
    Array.prototype.inArray = function(str){
        for(var i in this)
            if(this[i] === str) return true;
        return false;
    }
}
if(!String.prototype.trim) {
    /**
     * IE不支持trim函数的兼容方法
     * @returns {string}
     */
    String.prototype.trim = function(){
        return this.replace(/^\s|\s$/g,'');
    }
};

/**
 *
 * @param data 对象或对象数组
 * @param config 配置
 * @returns {*}
 */
function dataChange(data,config){

    function changeObj(data,cfg){
        var reData = {};
        for(var item in data){
            var toName = typeof cfg[item]=='string'?cfg[item]:cfg[item].toName;
            var type = typeof cfg[item]=='string'
                ?null
                :cfg[item]['type']
                    ?cfg[item]['type']
                    :null;
            switch (type){
                case 'int':reData[toName] = parseInt(data[item]);break;
                case 'float':reData[toName] = parseFloat(data[item]);break;
                default:reData[toName] = data[item]+'';break;
            }
        }
        return reData;
    }
    if(typeof data=='array'){
        var reData = [];
        for(var i=0;i<data.length;i++)
            reData.push(changeObj(data[i],config));
        return reData;
    }else
        return changeObj(data,config);
}

var s =dataChange({
    name:'王勇',
    tel:'13533334381'
},{
    name:'userName',
    tel:{
        toName:'mobile',
        type:'int'
    }
});
console.log(s);