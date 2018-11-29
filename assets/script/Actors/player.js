

cc.Class({
    extends: cc.Component,

    properties: {
        moneyLabel:{
            default:null,
            type:cc.Label
        },


        depotLabel:{
            default:null,
            type:cc.Label
        },

        money:{
            get:function(){
                return this.__money
            },

            set: function (value) {
                this.__money = value;
            },
            
            visible: false
        },

        //当前持有物品数量
        depotItems:{
            get:function(){
                return this.__depotItems
            },

            set: function (value) {
                this.__depotItems = value;
            },
            
            visible: false
        },

        //仓库容量
        depotCap:{
            get:function(){
                return this.__depotCap
            },

            set: function (value) {
                this.__depotCap = value;
            },
            
            visible: false
        },

          //仓库剩余
        depotLast:{
            get:function(){
                return this.__depotCap-this.__depotItems
            },

            visible: false
        },
    },



   init(game){
      // console.log("init player")
       this.game=game
       this.__money=10000 //todo 服务器获取
       this.__depotCap=100
       this.__depotItems=0
       this.itemMng=game.itemMng

       this.updateUI()
    
   },

   setData(money,cnt){
        this.money=money
        this.depotItems=this.game.player.depotItems+cnt
        this.updateUI()
   },

   updateUI(){
       this.moneyLabel.string="现金："+this.money
       this.depotLabel.string="仓库("+this.depotItems+"/"+this.depotCap+")"

   }
    // update (dt) {},
});
