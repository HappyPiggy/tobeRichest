const Item = require('Item');

cc.Class({
    extends: cc.Component,

    properties: {

        objsRoot:{
            default:null,
            type:cc.Node
        },

        inactiveObjsRoot:{
            default:null,
            type:cc.Node
        },

        itemsOrign:{
            default: [],
            type: [cc.Prefab]
        },
    },

    init (game) {
       // console.log("itemMng Init")
        this.game = game
        this.marketItemCount=5 //出售商品列数
        this.curItemList=new Array()
        this.objNameList=new Array()

        this.initItems()


    },

    //初始化所有item到隐藏列表
    initItems(){
        //console.log("res " + res)
        this.objNameList.length=0
        for (let i = 0; i < this.itemsOrign.length; ++i) {
            var node = cc.instantiate(this.itemsOrign[i])
            node.parent = this.inactiveObjsRoot
            this.objNameList.push(node.name)
            var item=node.getComponent('Item')
            item.init(this)
        }
        this.updateItems()
    },



    updateItems(){

        this.curItemList.length=0
        //回收到不可视列表
        if(this.objsRoot.childrenCount>0){
            var children=this.objsRoot.children
            var cnt=this.objsRoot.childrenCount

            for (let i=0;i<cnt;i++) {
              children[0].parent=this.inactiveObjsRoot
            };  
        }


        //放入可视列表
        var res=this.createRandom(this.marketItemCount,0,this.itemsOrign.length)

        for (let i = 0; i < this.marketItemCount; ++i) {
       
        var node=this.inactiveObjsRoot.getChildByName(this.objNameList[res[i]]);
            node.parent = this.objsRoot
            var item=node.getComponent('Item')
            item.price= this.createRandom2(item.minPrice,item.maxPrice) //todo 根据xx修改价格
            item.updateSelf()
            //this.curItemList.push(item)
        } 


        // for(let i=0;i<this.curItemList.length;++i){
        //     this.curItemList[i].updateSelf()
        // }
    },


    //生成随机不重复的数组 不包含max
    createRandom(num ,min ,max){
        let arr=[],res=[],newArr;
        for (let i=min;i<max;i++) {
            arr.push(i);
        }
        newArr=Object.assign([],arr);
        for(let item=0;item<arr.length;item++) {
            var rdm=Math.random() * newArr.length
            var idx=Math.floor(rdm) 
            res.push(newArr.splice(idx, 1)[0]);
        }
        res.length = num;
        return res;
    },

    //随机 包含max
    createRandom2(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    },

    // update (dt) {},
});
