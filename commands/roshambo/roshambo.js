let userInput = getVars("argv1").trim().toUpperCase();

let instructions = "请发送 'R' 表示石头, 'P' 表示布, 或 'C' 表示剪刀。";

let choices = ['R', 'P', 'C'];
let choiceNames = {
    'R': '石头',
    'P': '布',
    'C': '剪刀'
};

if (!choices.includes(userInput)) {
    addMessage(instructions);
    return;
}

let botChoice = choices[Math.floor(Math.random() * 3)];

let resultMsg = "你选择了" + choiceNames[userInput] + "，我选择了" + choiceNames[botChoice] + "\n";


if (userInput === botChoice) {
    resultMsg += " 平局！";
} else if (
    (userInput === 'R' && botChoice === 'C') || 
    (userInput === 'P' && botChoice === 'R') || 
    (userInput === 'C' && botChoice === 'P')
) {
    resultMsg += " 你赢了！";
} else {
    resultMsg += " 我赢了！";
}
modExp(3);
addMessage(resultMsg);
