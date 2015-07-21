/**
 * Created by wangyong on 2015/7/9.
 */
var baseUrl='./';
var tplData = {
    start:{
        baseUrl:baseUrl,
        list:[
            {
                name:'1&middot;吸引人的豆蔻岁月',
                link:'#'
            },{
                name:'2&middot;甜蜜的风信年华',
                link:'#'
            },{
                name:'1&middot;玫瑰成就永恒',
                link:'#'
            },{
                name:'蒙眼化妆比赛',
                link:'#'
            },{
                name:'团队得分',
                link:'#'
            }
        ]
    },
    show:{
        baseUrl:baseUrl,
        list:[
            {
                link:'javascript:;',
                src:'images/show-pai.jpg',
                name:'拍摄照片'
            },{
                link:'javascript:;',
                src:'images/show-add.jpg',
                name:'本地上传'
            }
        ]
    },
    sign:{
        baseUrl:baseUrl,
        areaId:0,
        areaName:''
    },
    signSuccess:{
        baseUrl:baseUrl,
        name:'丛军华',
        phone:'020-12341234',
        area:'华中'
    },
    signError:{
        baseUrl:baseUrl,
        name:'丛军华',
        phone:'020-12341234',
        area:'华中'
    },
    topList: {
        baseUrl: baseUrl,
        title:'最具人气模特奖',
        hasVoteNum:1,
        list: [
            {
                name: '丛军华',
                area: '华东',
                vote: '1500'
            },{
                name: '丛军华',
                area: '华东',
                vote: '15'
            },{
                name: '丛军华',
                area: '华东',
                vote: '1500'
            },{
                name: '丛军华',
                area: '华东',
                vote: '1500'
            }
        ]
    },
    homepage:{
        baseUrl:baseUrl,
        src:'images/photo-1.jpg',
        vote:200,
        name:'丛军华-华中'
    },
    voteError:{
        baseUrl:baseUrl
    }
}