//游戏核心玩法流程管理器


cc.Class({
    extends: cc.Component,

    properties: {
        itemMng: cc.Node,
        boxMng: cc.Node,
        player: cc.Node,

    },

   onLoad(){

       this.itemMng = this.itemMng.getComponent('ItemMng');
       this.itemMng.init(this);

       this.boxMng = this.boxMng.getComponent('boxMng');
       this.boxMng.init(this);

       this.player = this.player.getComponent('player');
       this.player.init(this);

       this.registerButton()
   },

   registerButton(){
       this.nextBtn = cc.find("Canvas/ROOT/down/nextBtn")
   },

    onEnable: function () {
    this.nextBtn.on('touchend', this.onNextBtn, this)
    },

    onDisable: function () {
        this.nextBtn.off('touchend', this.onNextBtn, this)
    },


    onNextBtn(){
        this.itemMng.updateItems()
    }


    // update (dt) {},
});
