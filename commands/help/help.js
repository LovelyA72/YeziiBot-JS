function getLastDirectory(path) {
    return path.replace(/\\/g, '/').split('/').filter(Boolean).pop() || '';
}

function formatCommands(commands, maxCommandsPerLine) {
    let result = [];
    for (let i = 0; i < commands.length; i += maxCommandsPerLine) {
        result.push(commands.slice(i, i + maxCommandsPerLine).join(' / '));
    }
    return result.join('\n');
}

let commands = getSubDirs("./scripts/commands");//["help", "8ball", "calc", "checkin", "dice", "draw", "me", "time", "pick", "gana", "kana", "markov", "urban*", "roll", "roshambo", "regex", "get", "draw", "stat", "use", "time ", "version"];
const maxCommandsPerLine = 8; // Number of commands per line

let commands2 = [];
commands.forEach(x => {
    commands2.push(getLastDirectory(x));
});

alert("YeziiBot.js帮助\n要认真读哦！\n\n可用指令:\n" + formatCommands(commands2, maxCommandsPerLine) + "\n\n指令格式：%指令 参数\n查询格式：%help.指令\n\n部分需联网指令可能无法在中国大陆正常使用");