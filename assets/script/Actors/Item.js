const ItemType = require('Types').ItemType;

//商品
const Item = cc.Class({
    extends: cc.Component,

    properties: {

        itemType: {
            default: ItemType.Item1,
            type: ItemType
        },

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
                this.__price = value;
            },
            
            visible: false
        },

        minPrice:0,
        maxPrice:0,
    },

    init(itemMng){
       // console.log("init item"+this.itemType)
        this.itemMng=itemMng
        this.__price=0
    },

    //外部调用统一更新
    updateSelf(){
      //  console.log("update "+this.itemType)
       // console.log("cur content "+this.priceLabel.string)
        this.priceLabel.string=this.__price
    },

});

module.exports = Item;