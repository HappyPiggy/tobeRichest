//游戏核心玩法流程管理器
cc.Class({
    extends: cc.Component,

    properties: {
        itemMng: cc.Node,
        boxMng: cc.Node,
        player: cc.Node,
        news: cc.Node,
        itemsPriceMng: cc.Node,
        dayLabel: cc.Label,
        fjLabel:cc.Label,

    },

   onLoad(){

       
       this.itemMng = this.itemMng.getComponent('ItemMng');
       this.itemMng.init(this);

       this.boxMng = this.boxMng.getComponent('boxMng');
       this.boxMng.init(this);

       this.player = this.player.getComponent('player');
       this.player.init(this);

       this.news=this.news.getComponent('newspaper');

       this.itemsPriceMng=this.itemsPriceMng.getComponent('ItemsPriceMng');
       this.itemsPriceMng.init()

       this.maxDay=10
       this.curDay=0
       this.startFj=400000
       this.curFj=this.startFj

       this.registerButton()
       this.updateUI()
   },

   registerButton(){
       this.nextBtn = cc.find("Canvas/GameROOT/down/nextBtn")
   },

    onEnable: function () {
    this.nextBtn.on('touchend', this.onNextBtn, this)
    },

    onDisable: function () {
        this.nextBtn.off('touchend', this.onNextBtn, this)
    },

    updateUI(){
        //console.log("xx"+this.name)
        this.dayLabel.string=this.curDay+"/"+this.maxDay+"周"
        this.fjLabel.string = this.curFj
    },


    onNextBtn(){
        this.curDay+=1

        //游戏结束
        if(this.curDay>this.maxDay){
            cc.director.loadScene("start")
            return
        }
        
        this.itemMng.nextDayUpdate()
        this.fjEvent()
        this.newsPaperEvent()

        this.updateUI()

    },

    //报纸事件造成价格浮动
    newsPaperEvent(){
        var insaleItem=this.itemMng.getInSaleItemRandom()
        var event=this.itemsPriceMng.newsPapaerEvent(insaleItem)
        var news=event["des"]
        var range=parseFloat(event["range"]) 
        var type=parseInt(event["type"])
        insaleItem.price += type*range*(insaleItem.maxPrice-insaleItem.minPrice)

        this.news.show(news,insaleItem)
    },


    //房价上涨和下跌事件
    fjEvent(){
        var rd=this.createRandom(0,1000)
        var delta=0
        if(rd<1){
            delta=-this.createRandom(10000,20000)
        }else{
            delta=this.createRandom(3000,6000)
        }
        this.curFj+=delta
    },

    createRandom(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    },


    // update (dt) {},
});
