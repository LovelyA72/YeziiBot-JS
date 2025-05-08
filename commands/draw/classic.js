let urCount = 0;
let ssrCount = 0;
let srCount = 0;
let rCount = 0;
function drawCards(n) {
    const deck = [
        ...Array(6).fill('5'),
        ...Array(51).fill('4'),
        ...Array(200).fill('3'),
        ...Array(734).fill('2')
    ];

    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    for (let i = 0; i < n; i++) {
        const card = deck[i];
        if (card === '5') urCount++;
        else if (card === '4') ssrCount++;
        else if (card === '3') srCount++;
        else if (card === '2') rCount++;
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
drawCards(drawCount)
if ((urCount > 0) || (ssrCount > 0)) {
    playAudio('assets/audio/notify.mp3')
} else {
    playAudio('assets/audio/poke.mp3')
}
for (let i = 0; i < urCount; i++) {
    resultStr += "UR "
}
for (let i = 0; i < ssrCount; i++) {
    resultStr += "SSR "
}
for (let i = 0; i < srCount; i++) {
    resultStr += "SR "
}
for (let i = 0; i < rCount; i++) {
    resultStr += "R "
}
if (drawCount == 1) {
    addMessage("抽卡单抽模拟结果：" + resultStr);
} else {
    addMessage(drawCount + "连抽模拟结果：\n" + resultStr);
}