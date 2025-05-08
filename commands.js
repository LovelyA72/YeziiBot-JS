// YeziiBot.js for AMLT
// LovelyA72
//
// Command runner seperated from the old main.js

function runCommand(name) {
    let argv = name.split(" ");
    let cmd = argv[0];
    let cmds = cmd.split(".");
    let argc = argv.length;

    setVar("argc", argc);

    for (let i = 0; i < argc; i++) {
        setVars("argv" + i, argv[i]);
    }

    let cmdPath = "";
    if (cmds.length < 2) {
        cmdPath = "commands/" + cmds[0] + "/" + cmds[0] + ".js";
    } else {
        cmdPath = "commands/" + cmds[0] + "/" + cmds.slice(1).join('/') + ".js";
    }

    if (exists("scripts/" + cmdPath)) {
        evalAnonymous(cmdPath);
    } else {
        addMessage("未知指令");
        addMessage("发送%help来查看帮助");
    }

    // Clear argv storage
    for (let i = 0; i < 255; i++) {
        setVars("argv" + i, "");
    }
}