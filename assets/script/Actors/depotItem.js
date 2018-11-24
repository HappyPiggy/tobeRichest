const Item = require('Item');


//仓库里的物品
const DepotItem =cc.Class({
    extends: Item,

    properties: {

        
        //对应价格label
        countLabel:{
            default: null,
            type : cc.Label
        },


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



    init(itemMng){
        this._super(itemMng)
        this.__count=0
    },

    updateSelf(){
        this._super()
        this.countLabel.string=this.count
    },

    // update (dt) {},
});

module.exports = DepotItem;