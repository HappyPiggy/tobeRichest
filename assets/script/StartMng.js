

cc.Class({
    extends: cc.Component,

    properties: {


    },

    onLoad: function () {
        this.startBtn = cc.find("Canvas/startBtn")
        
    },

    onEnable: function () {
        this.startBtn.on(cc.Node.EventType.MOUSE_UP, this.onStartGameBtn, this)
    },

    onDisable: function () {
        this.startBtn.off(cc.Node.EventType.MOUSE_UP, this.onStartGameBtn, this)
    },




    onStartGameBtn: function () {
       cc.director.loadScene("main")
    },


    onShareBtn: function(){ //分享按钮
	    cc.log("是否wechat平台 "+CC_WECHATGAME);
	    if(CC_WECHATGAME){

	    //this.playBtnSound();
	    //主动拉起分享接口
	    cc.loader.loadRes("texture/share",function(err,data){
		    wx.shareAppMessage({
			    title: "不怕，就来PK！",
			    imageUrl: data.url,
			    success(res){
				    console.log("转发成功!!!")
				    common.diamond += 20;
			    },
			    fail(res){
				    console.log("转发失败!!!")
			    } 
		    })
	    });
	    }

    },




});
