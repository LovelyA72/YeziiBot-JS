/**********************************************
// YeziiBot.js
// Now you are chatting with JS power!
//
// Copyright 2024 TEAM A72, all rights reserved
// !! Licensed for use in AMLT only !!
//
// Redistribution must be done in human readable
// form. No code obfuscation is permitted.
**********************************************/
include("nerdamer.min.js");

include("config.js")

include("rand.js");
include("box.js");
include("chat.js");
include("statsman.js");
include("hitokoto.js");
include("markovw.js");
include("commands.js");
include("inventory.js");
include("expmanager.js");
include("timedevent.js");
include("amcode.js");

let pChar = "";
let pMusicNote = "";
let pLeftWing = "";
let pRightWing = "";
let wingLoc = 0;

let isClicked = 0;

let brBox;
let tlBox;
let leBox;
let reBox;
let hdBox;

function init() {
    //Called when first starting the software
    consoleLog("=======================================");
    consoleLog(`YeziiBot.js ${YZJS_VERSION} beta`);
    consoleLog("Greetings from NYU ITP!");
    consoleLog("=======================================");
    consoleLog("");
    if (getSetting("stats_dec") == null) {
        setSetting("stats_dec", 1);
        flushSettings();
    }
    if(getUserName()==""){
        let nameResult = textInput("初めまして!ご主人様~ 请告诉我你的名字吧！");
        if(nameResult==""){
            exit();
        }
        setSetting("name",nameResult);
        //attempt to use AMLT2025 skin as default
        setSetting("resourcepack","shimeji");
        setHunger(10000);
        setThirst(10000);
        setMorale(5000);
        restart();
    }

    setSetting("testStr","kawaii!");
    setSetting("testInt",69420);
    setSetting("testFloat",67.67);
    flushSettings();

    brBox = new Box(getArea("breast"));
    tlBox = new Box(getArea("tail"));
    leBox = new Box(getArea("left_ear"));
    reBox = new Box(getArea("right_ear"));
    hdBox = new Box(getArea("head"));

    pChar = loadSprite("bg1.png", "bg1", 20);
    sprSetSize(pChar, 160, 240);
    sprSetLoc(pChar, 32, 62);
    sprSetVis(pChar, true);
    pMusicNote = loadSprite("note.png", "musicNote", 30);
    sprSetSize(pMusicNote, 20, 20);
    sprSetVis(pMusicNote, false);
    initItems();
    chatInit();
    initExp();
    playAudio('assets/audio/amlt.mp3')
    pLeftWing = loadSprite("wing-left.png", "wingLeft", 10);
    pRightWing = loadSprite("wing-right.png", "wingLeft", 11);
    sprSetSize(pLeftWing, 20, 38);
    sprSetSize(pRightWing, 15, 40);
    sprSetVis(pRightWing, true);
    sprSetVis(pLeftWing, true);
    addMessage(dialogueID("greet","おかえり！[MLT:master]♥ 有需要的可以和[MLT:nick]说哦~"));
    checkTimeActivity();
    flushMessage();
    flushSaveData();
}

function update() {
    //Called every tick
    updateExp();
    sprSetLoc(pMusicNote, rand(50, 100), rand(50, 100));
    if (wingLoc) {
        sprSetLoc(pLeftWing, 50, 95);
        sprSetLoc(pRightWing, 160, 120);
        wingLoc = 0;
    } else {
        sprSetLoc(pLeftWing, 50, 85);
        sprSetLoc(pRightWing, 160, 110);
        wingLoc = 1;
    }
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function onMessage(msg) {
    // Called every message
    consoleLog("UI -> JS: " + msg);

    // Process command if starts with %
    if (msg.startsWith('%')) {
        let rcmd = msg.substring(1); // Remove the '%' symbol
        runCommand(rcmd); // Run the command
        flushMessage();
        return;
    }

    //heh
    if (msg.includes("你好香")) {
        playAudio('assets/audio/info.mp3')
        addMessage(hentai[Math.floor(Math.random() * hentai.length)]+"[MLT:expression,type=2,tick=5]");
        flushMessage();
        return;
    }
    //Do chat
    doChat(msg);
    if (getVars("reply") != "") {
        addMessage(getVars("reply"));
    }
    //If no reply, show generic error message
    if(getQueueSize()==0){
        addMessage(dialogueID("unknown_rply","呜，我不知道怎么回答呢... 输入%help查看帮助吧！"));
    }

    flushMessage();
    //addMessage(convertVowelsToA("240927"));
}

function onRenderMessage(msg) {
    return processAMCode(msg);
}

function onClick(x, y) {
    consoleLog("clicked (" + x + "," + y + ")");
    if(getMorale()==0){
        addMessage(dialogueID("low_morale_click","..."));
        flushMessage();
        return;
    }
    if (brBox.isInBox(x,y)) {
        addMessage(dialogueID("poke_br","不允许袭胸！[MLT:expression,type=2,tick=5]"));
        modRomance(-1);
        updateExp();
        flushMessage();
    }else if (hdBox.isInBox(x,y)) {
        addMessage(dialogueID("pat_head","摸头...好幸福...")+"[MLT:modstat,type=romancelim,val=15][MLT:modstat,type=moralelim,val=40]");
        flushMessage();
    }else if (leBox.isInBox(x,y)) {
        addMessage(dialogueID("poke_le",""));
        flushMessage();
    }else if (reBox.isInBox(x,y)) {
        addMessage(dialogueID("poke_re",""));
        flushMessage();
    }else{
        if(isClicked==0){
            isClicked = 1;
            addMessage(dialogueID("click_1","别戳，好痒"));
        }else{
            isClicked = 0;
            addMessage(dialogueID("click_2","别戳，好痒"));
        }
        flushMessage();
    }
}

function onMinute() {
    //Called every minute
    let datetime = new Date();
    consoleLog(datetime.getHours() + ":" + datetime.getMinutes());
    checkTimeActivity();
    flushMessage();
}