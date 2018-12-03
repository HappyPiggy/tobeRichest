//每日新闻
cc.Class({
    extends: cc.Component,

    properties: {
        mask:{
            default:null,
            type:cc.Node
        },

        content:{
            default:null,
            type:cc.Label
        },
    },

    onEnable: function () {
        this.mask.on('touchend', this.hideBox, this)
    },

    onDisable: function () {
        this.mask.off('touchend', this.hideBox, this)

    },

    show(content,item){
        this.content.string="    "+content
        this.node.active=true
        this.curItem=item
        //this.callback=callback
    },

    hideBox(){
        this.node.active=false
        if (typeof(this.curItem) != "undefined")
        {
            this.curItem.updateUI()
        }
     },
});
