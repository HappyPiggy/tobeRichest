const news = require('Config').newsEvent;
//所有商品价格动态管理
const itemsPriceMng=cc.Class({
    extends: cc.Component,

    properties: {

        testJsonData:{
            default:null,
            type:Array
            }
    },

    init(game){
        this.game=game

    },


    //报纸事件引发价格变动
    newsPapaerEvent(item){
        var event=this.getNews(item.itemType)
        //console.log("type "+item.itemType +" des:"+event["des"])
        return event
    },


    //根据商品id得到id对应的news列表
    //eventId得到对应商品的事件
    getNews(typeId){
        var eventId= this.Random(0,this.count(news[typeId])-1)
        return news[typeId][eventId]
    },



    count(o){
        var t = typeof o;
        
        if(t == 'string'){
        return o.length;
        
        }else if(t == 'object'){
        
        var n = 0;
        
        for(var i in o){
        
        n++;
        
        }
        return n;
        }
        return false;
        
    },

    Random(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    },

});

module.exports = itemsPriceMng;