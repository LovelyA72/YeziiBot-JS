let siz = getVar("argc");
let picks = [];
consoleLog("siz: "+siz );  // Debug line to check siz
if (siz <= 1) {
    addMessage("没有提供选项");
    return;
}
for (let i = 0; i < siz-1; i++) {
    let j = i + 1;
    let option = getVars("argv" + j);
    consoleLog("argv" + j + ": "+option);  // Debug line to check each option
    picks.push(option);
}
addMessage(picks[rand(0, picks.length)]);
