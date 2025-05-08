let hunger = (getHunger() / 100.0).toFixed(2);
let thirst = (getThirst() / 100.0).toFixed(2);
let morale = (getMorale() / 100.0).toFixed(2);
let romance = (getRomance() / 100.0).toFixed(2);
addMessage("[MLT:name]\n饱食: "+hunger+"%\n饮水: "+thirst+"%\n精神: "+morale+"%\n好感："+romance);
