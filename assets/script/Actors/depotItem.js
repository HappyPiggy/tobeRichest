const Item = require('Item');


//仓库里的物品
const DepotItem =cc.Class({
    extends: Item,

    properties: {

        
        //对应数量label
        countLabel:{
            default: null,
            type : cc.Label
        },


        startMoney:0, //最开始买入的价格


        count:{
            get:function(){
                return this.__count
            },

            set: function (value) {
                this.__count = value;
            },
            
            visible: false
        },
    },

    // onEnable: function () {

    // },
    
    // onDisable: function () {
    // },



    init(itemMng){
        this._super(itemMng)
        this.__count=0
    },

    updateUI(){
        this._super()
        this.countLabel.string=this.count
    },

    // update (dt) {},
});

module.exports = DepotItem;