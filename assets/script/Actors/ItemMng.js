

cc.Class({
    extends: cc.Component,

    properties: {

        objsRoot:{
            default:null,
            type:cc.Node
        },

        depotObjsRoot:{
            default:null,
            type:cc.Node
        },

        inactiveObjsRoot:{
            default:null,
            type:cc.Node
        },

        inactiveDepotRoot:{
            default:null,
            type:cc.Node
        },

        itemsOrign:{
            default: [],
            type: [cc.Prefab]
        },

        depotItemsOrign:{
            default: [],
            type: [cc.Prefab]
        },

    },

    init (game) {
       // console.log("itemMng Init")

        this.game = game

        this.marketItemCount=5 //出售商品列数
        this.curDepotItemList=new Array() //当前仓库中有的商品
        this.curItemList=new Array() //当前商店出售中中有的商品
        this.objNameList=new Array()

        this.initItems()


    },

    //初始化所有item到隐藏列表
    initItems(){
        //console.log("res " + res)
        this.objNameList.length=0
        this.curItemList.length=0
        this.curDepotItemList.length=0

        for (let i = 0; i < this.itemsOrign.length; ++i) {
            var node = cc.instantiate(this.itemsOrign[i])
            node.parent = this.inactiveObjsRoot
            this.objNameList.push(node.name)
            var item=node.getComponent('Item')
            item.init(this)
        }
        this.nextDayUpdate()


    //初始化仓库物品到隐藏列表
        for (let i = 0; i < this.depotItemsOrign.length; ++i) {
            var node = cc.instantiate(this.depotItemsOrign[i])
            node.parent = this.inactiveDepotRoot
            var item=node.getComponent('Item')
            item.init(this)
        }
    },



    //更新商品
    nextDayUpdate(){

        //回收到不可视列表
        if(this.objsRoot.childrenCount>0){
            var children=this.objsRoot.children
            var cnt=this.objsRoot.childrenCount

            for (let i=0;i<cnt;i++) {
              children[0].parent=this.inactiveObjsRoot
            };  
        }


        this.curItemList.length=0
        //放入可视列表
        var res=this.createRandom(this.marketItemCount,0,this.itemsOrign.length)

        for (let i = 0; i < this.marketItemCount; ++i) {
       
        var node=this.inactiveObjsRoot.getChildByName(this.objNameList[res[i]]);
            node.parent = this.objsRoot
            var item=node.getComponent('Item')
            item.price= this.randomPrice(item.minPrice,item.maxPrice)
            item.updateUI()
            this.curItemList.push(item)
        } 

    },

    //点击了商品
    //item调用 所以this是对应的item
    onClickItem(){
      // console.log("res " + curSpriteFrame.name)
        if(this.name.indexOf("depot")!=-1){
            this.itemMng.game.boxMng.showSellBox(this)
        }else{
            this.itemMng.game.boxMng.showBuyBox(this)
        }
    },



    //boxmanager中买入
    //item为商品 cnt为数量
    onClickBuy(item,cnt){

        //console.log("xxx "+item.itemType)
       // console.log("xxx "+this.curItemList.length)
       if(this.curDepotItemList.length>=5)
       {
        var isNew=true
        for(let i=0;i<this.curDepotItemList.length;++i){
            var depotItem=this.curDepotItemList[i]
            if(depotItem.itemType==item.itemType)
                isNew=false
        }

        if(isNew)     
            return false
       }

       //已经在仓库中
       for(let i=0;i<this.curDepotItemList.length;++i){
        var depotItem=this.curDepotItemList[i]

        if(depotItem.itemType==item.itemType){
            var newPrice=(depotItem.price*depotItem.count+item.price*cnt)/(depotItem.count+cnt)
            depotItem.price=Math.floor(newPrice)
            depotItem.count=depotItem.count+cnt
            depotItem.updateUI()
            return true
           }
       }
        


        for(let i=0;i<this.inactiveDepotRoot.childrenCount;++i){
            var obj=this.inactiveDepotRoot.children[i].getComponent("Item")
            if(obj.itemType==item.itemType){
                obj.startMoney=item.price
                obj.price=item.price
                obj.count=cnt
                obj.node.parent=this.depotObjsRoot
                obj.updateUI()
                this.curDepotItemList.push(obj)
                return true
            }

        }
    },

    onClickSell(item,cnt){
        var idx=-1
        for(let i=0;i<this.curDepotItemList.length;++i){
            var depotItem=this.curDepotItemList[i]
            if(depotItem.itemType==item.itemType){
                idx=i
                break
            }
        }
        

        if(idx!=-1){
            var depotItem=this.curDepotItemList[idx]
            depotItem.count=depotItem.count-cnt
            depotItem.updateUI()

            if(depotItem.count<=0){
                depotItem.node.parent=this.inactiveDepotRoot
                this.curDepotItemList.splice(idx,1)
            }
            return true
        }
        return false

        //this.curDepotItemList.length=this.curDepotItemList.length-1
    },


    //查看当前仓库中的物品是否在市场中有销售
    checkIsInSale(item){
        for(let i=0;i<this.curItemList.length;++i){
            if(this.curItemList[i].itemType==item.itemType){
                return true
            }
        }
        return false;
    },

    GetInSaleItem(item){
        if(this.checkIsInSale(item)){
            for(let i=0;i<this.curItemList.length;++i){
                if(this.curItemList[i].itemType==item.itemType)
                return this.curItemList[i]
            }
        }
        return null
    },


    //随机抽取在售商品
    getInSaleItemRandom(){
        var idx=this.createRandom2(0,this.curItemList.length-1)
        return this.curItemList[idx]
    },


    //正常的价格浮动 在平均值上下0.1浮动
    randomPrice(min,max){
        var price=Math.floor((min+max)/2)
        var sign=this.createRandom2(0,1)
        var range=this.createRandom2(50,100)/1000
        var delta=price*range
        if(sign==0){
            price+=delta

        }else{
            price-=delta
        }
        return price

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
