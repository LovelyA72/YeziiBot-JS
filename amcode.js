// YeziiBot.js for AMLT
// LovelyA72
//
// MLT Code processor

function addMessage(msg) {
    addMessageNative(msg,  3000 + (msg.length) * 50);
}
function addMessageMS(msg, ms) {
    addMessageNative(msg,  ms);
}


function say(msg){
    addMessageNative(msg, 3000 + (msg.length) * 50);
    flushMessage();
}

function dialogueID(id,fallback){
    let result = getDialogue(id);
    if(result==""){
        return fallback;
    }
    return result;
}

function processMLTCode(code) {
    //parse MLTCode with the old fashioned switch statement
    let param = parseStringToJson(code);
    switch (param.opcode) {
        case "name":
            return getCharName();
        case "nick":
            return getCharNick();
        case "master":
            return getUserName();
        case "command":
            runCommand(param.cmd);
            break;
        case "text":
            showTextDialog(param.text);
            break;
        case "sound":
            playAudio(param.src);
            break;
        case "xpmod":
            modExp(Number(param.n))
            break;
        case "gpmod":
            modBal(Number(param.n))
            break;
        case "hitokoto":
            return randHitokoto();
            
        case "expression":
            overrideExp(param.type,Number(param.tick));
            break;

        case "stat":
            switch(param.type){
                case "hunger":
                    return getHunger();
                case "thirst":
                    return getThirst();
                case "morale":
                    return getMorale();
                case "romance":
                    return getRomance();
                default:
                    return "";
            };
        case "modstat":
            switch(param.type){
                case "hunger":
                    modHunger(Number(param.val));
                    break;
                case "thirst":
                    modThirst(Number(param.val));
                    break;
                case "morale":
                    modMorale(Number(param.val));
                    break;
                case "romance":
                    modRomance(Number(param.val));
                    break;
                default:
                    return "";
            };
        case "eat":
            modHunger(Number(param.val),true);
            break;
        case "drink":
            modThirst(Number(param.val),true);
            break;
        default:
            break;
    }
    return "";
}

function parseStringToJson(input) {
    let result = {};

    // Remove leading and trailing brackets
    input = input.replace(/^\[|\]$/g, '');

    let [opcode, ...rest] = input.split(',');

    // Remove "MLT:" prefix from opcode if present
    opcode = opcode.replace(/^MLT:/, '');

    result['opcode'] = opcode;

    // Join the rest and process key-value pairs
    if (rest.length) {
        rest.join(',').split(',').forEach(pair => {
            let [key, value] = pair.split('=');
            result[key] = value;
        });
    }

    return result;
}

function replaceMLTCodes(input) {
    // AMLT码，一种类酷Q码的控制码 [MLT:类型,参数=值,参数=值]
    const regex = /\[MLT:([^\]]+)\]/g;

    return input.replace(regex, (match, code) => processMLTCode(code));
}

function processAMCode(str) {
    str = replaceMLTCodes(str);
    return str;
}