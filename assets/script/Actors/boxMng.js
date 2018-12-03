
//交易对话框管理器
const boxMng=cc.Class({
    extends: cc.Component,

    properties: {

        box:{
            default:null,
            type:cc.Node
        },

        mask:{
            default:null,
            type:cc.Node
        },

        //输入数量
        cntEditor:{
            default:null,
            type:cc.EditBox
        },

        

        cutItemSprite:{
            default:null,
            type:cc.Sprite
        },

        buyBtnObj:{
            default:null,
            type:cc.Node
        },

        sellBtnObj:{
            default:null,
            type:cc.Node
        },

        tipsLabel:{
            default:null,
            type:cc.Label
        },


    },

    init (game) {
        // console.log("boxMng Init")
         this.game = game
         this.buyCnt=0
         this.sellCnt=0
         this.max=0 //最大可买/卖的数
         this.initButton()
     },

     initButton(){
        this.buyBtnObj.active=false
        this.sellBtnObj.active=false
     },
     
    onEnable: function () {
        this.buyBtnObj.on('touchend', this.onBuyButton, this)
        this.sellBtnObj.on('touchend', this.onSellButton, this)
        this.mask.on('touchend', this.hideBox, this)
    },

    onDisable: function () {
        this.buyBtnObj.off('touchend', this.onBuyButton, this)
        this.sellBtnObj.off('touchend', this.onSellButton, this)
        this.mask.off('touchend', this.hideBox, this)

    },



     showBuyBox(item){
        this.curItem=item
        this.box.active=true
        this.buyBtnObj.active=true
        this.sellBtnObj.active=false

       // console.log("res" +this.cutItemSprite.spriteFrame.name)
        this.cutItemSprite.spriteFrame=item.getComponent(cc.Sprite).spriteFrame
        this.CalcMaxBuyCount()
     },

     showSellBox(item){
        this.curItem=item
        this.box.active=true
        this.buyBtnObj.active=false
        this.sellBtnObj.active=true
        this.cutItemSprite.spriteFrame=item.getComponent(cc.Sprite).spriteFrame

        this.CalcMaxSellCount()
     },

     hideBox(){
        this.box.active=false
     },


     onBuyButton(){

        this.buyCnt=parseInt(this.cntEditor.string)
        var money=this.game.player.money-this.buyCnt*this.curItem.price
        
        if(money<0 || this.buyCnt>this.game.player.depotLast)
        {
           //console.log("xx")
            
        }else if(this.buyCnt>0){
            var res=this.game.itemMng.onClickBuy(this.curItem,this.buyCnt)
        }else{
            return 
        }


        if(res){
            this.game.player.setData(money,this.buyCnt)
            this.hideBox()
        }else{
          //  var xx=this.game.player.money-this.buyCnt*this.curItem.price
          // console.log("xx "+xx)

            if(this.game.player.depotLast<=0){
                this.cntEditor.string="0"
                this.tipsLabel.string="仓库已满"
            }else{
                this.cntEditor.string="0"
                this.tipsLabel.string="仓库最多容纳5个种类商品"
            }

        }

     },


     onSellButton(){

         if(this.game.itemMng.checkIsInSale(this.curItem)){
             this.sellCnt=parseInt(this.cntEditor.string)
             var sellItem=this.game.itemMng.GetInSaleItem(this.curItem)
             var money=this.game.player.money+this.sellCnt*sellItem.price

             if(this.sellCnt>this.game.player.depotCap)
                {
                    //作弊
                }else if(this.sellCnt>0){
                    var res=this.game.itemMng.onClickSell(this.curItem,this.sellCnt)
                }

                if(res){
                    this.game.player.setData(money,-this.sellCnt)
                    this.hideBox()
                }

         }else{
            this.cntEditor.string="0"
            this.tipsLabel.string="当前市场中不流通该商品"
         }

    },

     //检测输入是否合法
     checkIsValid(){
        var userInput=parseInt(this.cntEditor.string)
        if(isNaN(userInput))
           this.cntEditor.string=this.max.toString()
        else{
            if(userInput>this.max)
               this.cntEditor.string=this.max.toString()
        }
     },



     // 计算当前玩家现金最多可以买多少个当前商品
     CalcMaxBuyCount(){
        var cnt=Math.floor(this.game.player.money/this.curItem.price) //价格上最多买的数量
        var cnt2=this.game.player.depotLast//仓库剩余
        this.max=Math.min(cnt,cnt2)
        this.tipsLabel.string="最多可购买"+this.max+"个"
        this.cntEditor.string=this.max.toString()
     },

     CalcMaxSellCount(){
        this.max=this.curItem.count
        this.tipsLabel.string="最多可卖出"+this.max+"个"
        this.cntEditor.string=this.max.toString()
     },


});

module.exports = boxMng;
