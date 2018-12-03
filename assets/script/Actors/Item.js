const ItemType = require('Types').ItemType;
const BoxMng = require('boxMng');

//商品
const Item = cc.Class({
    extends: cc.Component,

    properties: {
        itemType: {
            default: ItemType.Item1,
            type: ItemType
        },

        boxMng:BoxMng,

        //对应价格label
        priceLabel:{
            default: null,
            type : cc.Label
        },

        price:{
            get:function(){
                return this.__price
            },

            set: function (value) {
                if(this.name.indexOf("depot")==-1){
                    value=Math.floor(value)
                    if(value<this.minPrice) value=this.minPrice
                    if(value>this.maxPrice) value=this.maxPrice
                }

                this.__price = value;
            },
            
            visible: false
        },

        minPrice:0,
        maxPrice:0,
    },

    init(itemMng){
        //console.log("init item"+this.itemType)
        this.itemMng=itemMng
        this.__price=0
    },


    onEnable: function () {
       // console.log("xx" +this.name)
        this.node.on('touchend', this.itemMng.onClickItem, this)
    },
    
    onDisable: function () {
        this.node.off('touchend', this.itemMng.onClickItem, this)
    },




    //外部调用统一更新
    updateUI(){
       // console.log("update "+this.__price)
       // console.log("cur content "+this.priceLabel.string)
        this.priceLabel.string=this.__price
    },

});

module.exports = Item;