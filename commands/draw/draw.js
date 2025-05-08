let urCount = 0; // 5-star count
let ssrCount = 0; // 4-star count
let srCount = 0; // 3-star count

function drawCards(n) {
    consoleLog("DrawCard current pity:\n4 stars:"+getSaveDataNumber("drawPityA")+"\n5 stars:"+getSaveDataNumber("drawPityB"));
    for (let i = 0; i < n; i++) {
        setSaveDataNumber("drawCount",getSaveDataNumber("drawCount")+1);
        setSaveDataNumber("drawPityA",getSaveDataNumber("drawPityA")+1);
        setSaveDataNumber("drawPityB",getSaveDataNumber("drawPityB")+1);

        let isFiveStar = false;
        let isFourStar = false;

        let drawResult = Math.random();

        // Implement soft pity logic for 5-stars
        if (getSaveDataNumber("drawPityB") >= 73) {
            let pityRate = (getSaveDataNumber("drawPityB") - 72) * (1 / 16); // Increases linearly from 73th pull
            if (drawResult < pityRate || getSaveDataNumber("drawPityB") >= 90) {
                isFiveStar = true;
                urCount++;
                setSaveDataNumber("drawPityB",0); // Reset 5-star pity counter
            }
        }

        // Check if a 5-star was drawn by luck or pity
        if (!isFiveStar && drawResult < 0.006) {
            isFiveStar = true;
            urCount++;
            setSaveDataNumber("drawPityB",0); // Reset 5-star pity counter
        }

        // Implement 4-star pity
        if (!isFiveStar && (getSaveDataNumber("drawPityA") >= 10 || drawResult < 0.051)) {
            isFourStar = true;
            ssrCount++;
            setSaveDataNumber("drawPityA",0); // Reset 4-star pity counter
        }

        // If neither 5-star nor 4-star, count as a 3-star
        if (!isFiveStar && !isFourStar) {
            srCount++;
        }
    }
}

let drawCount = 1;
let resultStr = "";
if (getVar("argc") > 1) {
    let dcp = Number(getVars("argv1"));
    if ((dcp < 1) || (dcp > 20)) {
        drawCount = 1;
    } else {
        drawCount = dcp;
    }
}
drawCards(drawCount);
for (let i = 0; i < urCount; i++) {
    resultStr += "5 ";
}
for (let i = 0; i < ssrCount; i++) {
    resultStr += "4 ";
}
for (let i = 0; i < srCount; i++) {
    resultStr += "3 ";
}
if (drawCount == 1) {
    addMessage("抽卡单抽模拟结果：" + resultStr+"\n你一共花费了"+(getSaveDataNumber("drawCount")*160)+"原石（"+(getSaveDataNumber("drawCount")*1.98)+" USD）");
} else {
    addMessage(drawCount + "连抽模拟结果：\n" + resultStr+"\n你一共花费了"+(getSaveDataNumber("drawCount")*160)+"原石（"+(getSaveDataNumber("drawCount")*1.98)+" USD）");
}
if (urCount > 0) {
    playAudio('assets/audio/notify.mp3');
} else {
    playAudio('assets/audio/poke.mp3');
}
consoleLog("DrawCard after draw pity:\n4 stars:"+getSaveDataNumber("drawPityA")+"\n5 stars:"+getSaveDataNumber("drawPityB"));
flushSaveData();