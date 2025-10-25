// YeziiBot.js for AMLT
// LovelyA72
//
// Code for processing time elapse events. It checks for time elapse and runs
// corresponding amounts of events

function doTimeActivity(cycle) {
    consoleLog("doTimeActivity called with " + cycle + " cycles");
    let modHg = 0;
    let modTh = 0;
    let modSan = 0;
    let modRom = 0;
    let isRestocked = false;

    let restockCounter = getSaveDataNumber("shop_restock");
    let sanityLimit = getSaveDataNumber("sanity_gain_limit");
    let affectionLimit = getSaveDataNumber("affection_gain_limit");

    // default initialize if not found
    if (isNaN(sanityLimit)) sanityLimit = SAN_LIM;
    if (isNaN(affectionLimit)) affectionLimit = ROM_LIM;

    for (let i = 0; i < cycle; i++) {
        restockCounter++;
        if (restockCounter > 48) {
            restockItems();
            isRestocked = true;
            restockCounter = 0;
        }

        // Hunger/Thirst decay
        modHg -= 1;
        modTh -= 3;

        // Mood impact when too low
        if ((getHunger() + modHg) < 35) {
            modSan -= 2;
            modRom -= 1;
        }
        if ((getThirst() + modTh) < 35) {
            modSan -= 2;
            modRom -= 1;
        }

        //slowly replenish sanity and affection gain limit over time
        if (sanityLimit < SAN_LIM) sanityLimit += SAN_GAIN;
        if (affectionLimit < ROM_LIM) affectionLimit += ROM_GAIN;
        if (sanityLimit > SAN_LIM) sanityLimit = SAN_LIM;
        if (affectionLimit > ROM_LIM) affectionLimit = ROM_LIM;
        consoleLog("San lim:"+sanityLimit);
        consoleLog("Rom lim:"+affectionLimit);
    }

    if (isRestocked) {
        addMessage(dialogueID("shop_restock", "商店进货了呢"));
    }

    // Cap hunger/thirst deduction to 40%
    modHg = Math.max(modHg, -4000);
    modTh = Math.max(modTh, -4000);

    modHunger(modHg);
    modThirst(modTh);
    modMorale(modSan);
    modRomance(modRom);

    // Save new values
    setSaveDataNumber("shop_restock", restockCounter);
    setSaveDataNumber("sanity_gain_limit", Math.min(sanityLimit, SAN_LIM));
    setSaveDataNumber("affection_gain_limit", Math.min(affectionLimit, ROM_LIM));
    flushSaveData();
}

function checkTimeActivity() {
    const currentTime = unixTime();
    let lastCallTime = getSaveDataNumber("last_time_act");
    if (lastCallTime === 0) {
        setSaveDataNumber("last_time_act", currentTime);
        return;
    }

    // Each cycle = 5 minutes
    const elapsedCycles = Math.floor((currentTime - lastCallTime) / (1000 * 60 * 5));

    if (elapsedCycles > 0) {
        doTimeActivity(elapsedCycles);
        const newLastCallTime = lastCallTime + elapsedCycles * (1000 * 60 * 5);
        setSaveDataNumber("last_time_act", newLastCallTime);
    }
    flushSaveData();
}
