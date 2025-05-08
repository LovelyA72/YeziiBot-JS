// YeziiBot.js for AMLT
// LovelyA72
//
// Code for processing time elapse events. It checks for time elapse and run
// corresponding amounts of events

function doTimeActivity(cycle) {
    consoleLog("doTimeActivity called with "+cycle+" cycles");
    let modHg = 0;
    let modTh = 0;
    let modSan = 0;
    let modRom = 0;
    let isRestocked = false;
    let restockCounter = getSaveDataNumber("shop_restock");
    for (let i = 0; i < cycle; i++) {
        restockCounter++;
        if(restockCounter>48){
            restockItems();
            isRestocked = true;
            restockCounter = 0;
        }
        modHg-=2;
        modTh-=6;
        if((getHunger()+modHg)<35){
            modSan-=2;
            modRom-=1;
        }
        if((getThirst()+modTh)<35){
            modSan-=2;
            modRom-=1;
        }
    }
    if(isRestocked){
        addMessage(dialogueID("shop_restock","商店进货了呢"));
    }
    //Cap both hunger and thirst deduction to 40%
    modHg = Math.max(modHg,-4000);
    modTh = Math.max(modTh,-4000);

    modHunger(modHg);
    modThirst(modTh);
    modMorale(modSan);
    modRomance(modRom);
    setSaveDataNumber("shop_restock",restockCounter);
    flushSaveData();
}

function checkTimeActivity() {
    const currentTime = unixTime();
    let lastCallTime = getSaveDataNumber("last_time_act");
    if (lastCallTime === 0) {
        setSaveDataNumber("last_time_act", currentTime);
        return;
    }

    const elapsedCycles = Math.floor((currentTime - lastCallTime) / (1000 * 60 * 5));

    if (elapsedCycles > 0) {
        doTimeActivity(elapsedCycles);
        const newLastCallTime = lastCallTime + elapsedCycles * (1000 * 60 * 5);
        setSaveDataNumber("last_time_act", newLastCallTime);
    }
    flushSaveData();
}
