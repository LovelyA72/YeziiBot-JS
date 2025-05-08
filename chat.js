function chatInit(){
    getFiles("./data/lyrics").forEach(x => {
        consoleLog(x);
        loadTextToList(x);
    });
    loadToml("appraise");
    loadToml("fixedreply");
}

const chatWares = [
    //Files are executed from top to bottom
    "chats/fixed_replies.js",
    "chats/sing_along.js",
    "chats/appraise.js",
    //"chats/svo.js",
    "chats/rive.js"];

function doChat(msg) {
    setVars("reply","");
    setVars("message",msg);

    for (let i = 0; i < chatWares.length; i++) {
        if(getVars("reply")==""){
            evalAnonymous(chatWares[i]);
        }
    }
}
