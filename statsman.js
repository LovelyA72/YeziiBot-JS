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
    return setSetting("name",name);
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
    return Number(getSaveData("cs_hunger"));
}
function getThirst(){
    return Number(getSaveData("cs_thirst"));
}
function getMorale(){
    return Number(getSaveData("cs_morale"));
}
function getRomance(){
    return Number(getSaveData("cs_romance"));
}

function setHunger(n){
    if(n>hungerMax){
        n = hungerMax;
    }
    if(n<0){
        n = 0;
    }
    return setSaveData("cs_hunger", n);
}
function setThirst(n){
    if(n>thirstMax){
        n = thirstMax;
    }
    if(n<0){
        n = 0;
    }
    return setSaveData("cs_thirst", n);
}
function setMorale(n){
    if(n>moraleMax){
        n = moraleMax;
    }
    if(n<0){
        n = 0;
    }
    return setSaveData("cs_morale", n);
}
function setRomance(n){
    if(n<0){
        n = 0;
    }
    return setSaveData("cs_romance", n);
}

function modHunger(n,isFromConsumed=false) {
    let currentVal = Number(getSaveData("cs_hunger"));
    if ((currentVal + n) > hungerMax) {
        n = hungerMax - currentVal;
    }
    if ((currentVal + n) < 0) {
        n = -currentVal;
    }
    if(isFromConsumed){
        if(getMorale()==9000){
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
    setSaveData("cs_hunger", currentVal + n);
    flushSaveData();
}

function modThirst(n,isFromConsumed=false) {
    let currentVal = Number(getSaveData("cs_thirst"));
    if ((currentVal + n) > thirstMax) {
        n = thirstMax - currentVal;
    }
    if ((currentVal + n) < 0) {
        n = -currentVal;
    }
    if(isFromConsumed){
        if(getMorale()==9000){
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
    setSaveData("cs_thirst", currentVal + n);
    flushSaveData();
}

function modMorale(n) {
    let currentVal = Number(getSaveData("cs_morale"));
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
    setSaveData("cs_morale", currentVal + n);
    flushSaveData();
}

function modRomance(n){
    let currentVal = Number(getSaveData("cs_romance"));
    if((currentVal+n)<0){
        n = 0-currentVal;
    }
    let displayVal = (n / 100.00).toFixed(2);
    if(n>0){
        showFloatingMessageColor("♥ +"+displayVal,5,20,255,20);
    }else if(n<0){
        showFloatingMessageColor("♥ -"+Math.abs(displayVal),5,255,255,255);
    }
    setSaveData("cs_romance", Number(getSaveData("cs_romance"))+n);
    flushSaveData();
}

function modMoraleLimited(n) {
    if (n <= 0) return; // only positive gain is affected by the limit

    let sanityLimit = getSaveData("sanity_gain_limit");
    if (isNaN(sanityLimit)) sanityLimit = SAN_LIM;

    // If limit is zero, no gain possible
    if (sanityLimit <= 0) {
        return;
    }

    // Limit the gain by available sanity limit
    let allowedGain = Math.min(n, sanityLimit);

    // Apply morale gain within normal system bounds
    let currentVal = Number(getSaveData("cs_morale"));
    if ((currentVal + allowedGain) > moraleMax) {
        allowedGain = moraleMax - currentVal;
    }

    let displayVal = (allowedGain / 100.0).toFixed(2);
    if (allowedGain > 0) {
        showFloatingMessageColor("SAN +" + displayVal, 5, 20, 255, 20);
    }

    setSaveData("cs_morale", currentVal + allowedGain);
    setSaveData("sanity_gain_limit", Math.max(0, sanityLimit - allowedGain));
    consoleLog("Modded sanity to "+(currentVal + allowedGain)+" with remains "+sanityLimit);
    flushSaveData();
}

function modRomanceLimited(n) {
    if (n <= 0) return;

    let affectionLimit = getSaveData("affection_gain_limit");
    if (isNaN(affectionLimit)) affectionLimit = ROM_LIM;

    if (affectionLimit <= 0) {
        return;
    }

    let allowedGain = Math.min(n, affectionLimit);

    let currentVal = Number(getSaveData("cs_romance"));
    let newVal = currentVal + allowedGain;
    let displayVal = (allowedGain / 100.0).toFixed(2);

    showFloatingMessageColor("♥ +" + displayVal, 5, 20, 255, 20);
    setSaveData("cs_romance", newVal);
    setSaveData("affection_gain_limit", Math.max(0, affectionLimit - allowedGain));
    consoleLog("Modded romance to "+(currentVal + allowedGain)+" with remains "+affectionLimit);
    flushSaveData();
}
