//游戏核心玩法流程管理器


cc.Class({
    extends: cc.Component,

    properties: {
        itemMng: cc.Node,

    },

   onLoad(){

       this.itemMng = this.itemMng.getComponent('ItemMng');
       this.itemMng.init(this);


       this.registerButton()
   },

   registerButton(){
       this.nextBtn = cc.find("Canvas/ROOT/down/nextBtn")
   },

    onEnable: function () {
    this.nextBtn.on(cc.Node.EventType.MOUSE_UP, this.onNextBtn, this)
    },

    onDisable: function () {
        this.nextBtn.off(cc.Node.EventType.MOUSE_UP, this.onNextBtn, this)
    },


    onNextBtn(){
        this.itemMng.updateItems()
    }


    // update (dt) {},
});
