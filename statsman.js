// YeziiBot.js for AMLT
// LovelyA72
//
// API for manipulating different stats of the character

const hungerMax = 10000;
const thirstMax = 10000;
const moraleMax = 10000;

//minimum good sanity is 30%
const sanityMin = 3000;

function isSane(){
    return getMorale()>=sanityMin;
}

function getUserName() {
    return getSetting("name");
}

function setUserName(name) {
    return setSettings("name",name);
}

function modExp(n) {
    if(n>0){
        showFloatingMessageColor("EXP +"+n,5,20,255,20);
    }else if(n<0){
        showFloatingMessageColor("EXP -"+Math.abs(n),5,255,255,255);
    }
    invSetItemQty("101",invGetItemQty("101")+n);
}

function setExp(n) {
    invSetItemQty("101",n);
}

function getExp() {
    return invGetItemQty("101");
}

function modBal(n) {
    if(n>0){
        showFloatingMessageColor("($) +"+n,5,20,255,20);
    }else if(n<0){
        showFloatingMessageColor("($) -"+Math.abs(n),5,255,20,20);
    }
    invSetItemQty("202",invGetItemQty("202")+n);
}

function setBal(n) {
    invSetItemQty("202",n);
}

function getBal() {
    return invGetItemQty("202");
}

function getHunger(){
    return getSaveDataNumber("cs_hunger");
}
function getThirst(){
    return getSaveDataNumber("cs_thirst");
}
function getMorale(){
    return getSaveDataNumber("cs_morale");
}
function getRomance(){
    return getSaveDataNumber("cs_romance");
}

function setHunger(n){
    if(n>hungerMax){
        n = hungerMax;
    }
    if(n<0){
        n = 0;
    }
    return setSaveDataNumber("cs_hunger", n);
}
function setThirst(n){
    if(n>thirstMax){
        n = thirstMax;
    }
    if(n<0){
        n = 0;
    }
    return setSaveDataNumber("cs_thirst", n);
}
function setMorale(n){
    if(n>moraleMax){
        n = moraleMax;
    }
    if(n<0){
        n = 0;
    }
    return setSaveDataNumber("cs_morale", n);
}
function setRomance(n){
    if(n<0){
        n = 0;
    }
    return setSaveDataNumber("cs_romance", n);
}

function modHunger(n,isFromConsumed=false) {
    let currentVal = getSaveDataNumber("cs_hunger");
    if ((currentVal + n) > hungerMax) {
        n = hungerMax - currentVal;
    }
    if ((currentVal + n) < 0) {
        n = -currentVal;
    }
    if(isFromConsumed){
        if(getMorale()==10000){
            modRomance(Math.round(n/3));
        }
        modMorale(n/16);
    }
    let displayVal = (n / 100.00).toFixed(2);
    if (n > 0) {
        showFloatingMessageColor("🍖 +" + displayVal, 5, 20, 255, 20);
    } else if(n<0) {
        showFloatingMessageColor("🍖 -" + Math.abs(displayVal), 5, 255, 255, 255);
    }
    setSaveDataNumber("cs_hunger", currentVal + n);
    flushSaveData();
}

function modThirst(n,isFromConsumed=false) {
    let currentVal = getSaveDataNumber("cs_thirst");
    if ((currentVal + n) > thirstMax) {
        n = thirstMax - currentVal;
    }
    if ((currentVal + n) < 0) {
        n = -currentVal;
    }
    if(isFromConsumed){
        if(getMorale()==10000){
            modRomance(Math.round(n/3.6));
        }
        modMorale(n/24);
    }
    let displayVal = (n / 100.00).toFixed(2);
    if (n > 0) {
        showFloatingMessageColor("💧 +" + displayVal, 5, 20, 255, 20);
    } else if(n<0) {
        showFloatingMessageColor("💧 -" + Math.abs(displayVal), 5, 255, 255, 255);
    }
    setSaveDataNumber("cs_thirst", currentVal + n);
    flushSaveData();
}

function modMorale(n) {
    let currentVal = getSaveDataNumber("cs_morale");
    if ((currentVal + n) > moraleMax) {
        n = moraleMax - currentVal;
    }
    if ((currentVal + n) < 0) {
        n = -currentVal;
    }
    let displayVal = (n / 100.00).toFixed(2);
    if (n > 0) {
        showFloatingMessageColor("SAN +" + displayVal, 5, 20, 255, 20);
    } else if(n<0) {
        showFloatingMessageColor("SAN -" + Math.abs(displayVal), 5, 255, 255, 255);
    }
    setSaveDataNumber("cs_morale", currentVal + n);
    flushSaveData();
}

function modRomance(n){
    let currentVal = getSaveDataNumber("cs_romance");
    if((currentVal+n)<0){
        n = 0-currentVal;
    }
    let displayVal = (n / 100.00).toFixed(2);
    if(n>0){
        showFloatingMessageColor("♥ +"+displayVal,5,20,255,20);
    }else if(n<0){
        showFloatingMessageColor("♥ -"+Math.abs(displayVal),5,255,255,255);
    }
    setSaveDataNumber("cs_romance", getSaveDataNumber("cs_romance")+n);
    flushSaveData();
}

