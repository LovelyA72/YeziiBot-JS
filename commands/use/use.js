if(getVar("argc")>1){
    let itemId = getVars("argv1");
    if(itemId>=100000 && itemId <200000){
        //This is a consumable
        if(invGetItemQty(itemId)>0){
            invSetItemQty(itemId,invGetItemQty(itemId)-1);
            processAMCode(invGetItemMLTCode(itemId));
        }else{
            addMessage("物品不足");
        }
    }else{
        addMessage("物品不是消耗品");
    }
}else{
    //show item list
    let result = "物品使用方法: %use 物品ID\n\n拥有的食物: \n";
    itemTable.forEach(x => {
        let iid = Number(x[0]);
        if(iid>=100000 && iid < 200000){
            if(invGetItemQty(x[0])>0){
                result+=x[0]+" - "+x[1]+" x"+invGetItemQty(x[0])+"\n";
            }
        }
    });
    showTextDialog(result);
}
