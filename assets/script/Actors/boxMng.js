
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
        this.max=0 //最大可买/卖的数

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

        this.tipsLabel.string="sell"
     },

     hideBox(){
        this.box.active=false
     },


     onBuyButton(){

        this.buyCnt=parseInt(this.cntEditor.string)
        var money=this.game.player.money-this.buyCnt*this.curItem.price
        
        if(money<0 || this.buyCnt>this.game.player.depotLast)
        {
            //作弊
        }else{
            this.game.player.money=money
            this.game.player.depotItems=this.game.player.depotItems+this.buyCnt
        }

        this.hideBox()

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

     onSellButton(){

     },
});

module.exports = boxMng;
