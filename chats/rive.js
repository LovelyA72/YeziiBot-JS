let processed = splitSentence(getVars("message")).join(" ").replace(/\s+/g,' ');
processed = processed.replace(/[\p{P}\p{S}]+$/u, '');
consoleLog("Querying rive: "+processed);
let reply = queryRive(processed);
if (reply!=""&&reply!="ERR: No Reply Matched"&&reply!="ERR: No Reply Found") {
    setVars("reply",reply);
}