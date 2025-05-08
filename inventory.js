// AMLT Inventory Manager 1.0
// LovelyA72
//
// Make sure you have AMLT.InventoryLib (aminvlib.dll)
// plugin installed!


// Register items here
// They will be automatically created if not present
// in the inventory

// ID convention:
// -- System and Management --
// DO NOT TOUCH ITEMS IN THIS SECTION!!!
// 0-999: System reserved for currency and data
// 1000-9999: Key items
// 10000-99999: Flags
// -- Consumables --
// 100000-109999: AMLT consumables
// 110000-199999: Mod consumables
// -- Bundles --
// 200000-209999: AMLT item bundles
// 210000-299999: Mod item bundles
// -- Misc --
// 300000-309999: AMLT misc items
// 310000-399999: Mod misc items
const itemTable = [
    ["","","",0,""],
    //ID, name, description
    ["101","经验值","经验值，积累经验可以升级",0,""], 

    //currencies
    ["201","字节太晶","未损坏的字节晶体，高度珍贵",0,""], 
    ["202","比特碎晶","AMLT世界流通的的货币，所有人都知道其价值",0,""], 
    ["203","极能纯晶","AMLT世界最初的纯净能量，拥有无限的可能",0,""], 

    //food stuff
    ["100050","水","一瓶水 T50",10,"[MLT:drink,val=5000]"],
    ["100051","牛奶","一瓶牛奶，蓝色瓶盖，白色瓶身上印有Gyunyu和一头牛的图案 H15 T35",10,"[MLT:drink,val=3500][MLT:eat,val=1500]"],
    ["100052","草莓牛奶","草莓味的牛奶，女孩子们的最爱 H20 T35",8,"[MLT:drink,val=3500][MLT:eat,val=2000]"],
    ["100053","鲜榨橙汁","橙子但是缺少了最重要的纤维 H10 T40",5,"[MLT:drink,val=4000][MLT:eat,val=1000]"],
    ["100054","苹果汁","放久了会氧化 H10 T40",5,"[MLT:drink,val=4000][MLT:eat,val=1000]"],
    ["100055","酸奶","调味乳饮品，没有益生菌 H10 T40",5,"[MLT:drink,val=4000][MLT:eat,val=1000]"],
    
    ["100031","生菜沙拉","有生菜和胡萝卜的沙拉  H40 T5",5,"[MLT:drink,val=500][MLT:eat,val=4000]"],
    ["100032","羽衣甘蓝沙拉","有羽衣甘蓝的沙拉 H40 T5",5,"[MLT:drink,val=500][MLT:eat,val=4000]"],
    ["100033","水果沙拉","用水果做的沙拉 H45 T15",5,"[MLT:drink,val=1500][MLT:eat,val=4500]"],
    ["100034","土豆沙拉","用土豆做的沙拉 H40",5,"[MLT:eat,val=4000]"],
    ["100035","鸡蛋沙拉","用鸡蛋和蛋黄酱做的沙拉 H40",5,"[MLT:eat,val=4000]"],
    ["100036","鸡蛋沙拉面包","白面包夹了鸡蛋沙拉 H80",5,"[MLT:eat,val=8000]"],
    ["100037","土豆沙拉面包","白面包夹了土豆沙拉 H80",5,"[MLT:eat,val=8000]"],
    ["100040","白面包","经典的wonder bread风格白面包 H10",10,"[MLT:eat,val=1000]"],

    //item bundles
    ["200011","午餐盒","便利店买的午餐盒，打开才知道里面有什么",3,""],
];

function initItems() {
    itemTable.forEach(x => {
        if(x[0]!=""){
            if(invHasItem(x[0])){
                if(invGetItemName(x[0])!=x[1]){
                    invSetItemName(x[0],x[1]);
                }
                if(invGetItemDsc(x[0])!=x[2]){
                    invSetItemDsc(x[0],x[2]);
                }
                if(invGetItemMLTCode(x[0])!=x[4]){
                    invSetItemMLTCode(x[0],x[4]);
                }
            }else{
                invCreateItem(x[0],x[1],x[2],x[3],x[4]);
            }
        }
    });
}


function restockItems() {
    itemTable.forEach(x => {
        invSetItemStock(x[0],invGetItemStockMax(x[0]));
    });
}